import {
	pgTable,
	text,
	timestamp,
	boolean,
	integer,
	uuid,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: uuid("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	twoFactorEnabled: boolean("two_factor_enabled").default(false),
	username: text("username").unique(),
	displayUsername: text("display_username"),
});

export const account = pgTable("account", {
	id: uuid("id").primaryKey(),
	accountId: uuid("account_id").notNull(),
	providerId: uuid("provider_id").notNull(),
	userId: uuid("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const verification = pgTable("verification", {
	id: uuid("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const team = pgTable("team", {
	id: uuid("id").primaryKey(),
	name: text("name").notNull(),
	organizationId: uuid("organization_id")
		.notNull()
		.references(() => club.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").$onUpdate(
		() => /* @__PURE__ */ new Date(),
	),
});

export const teamMember = pgTable("team_member", {
	id: uuid("id").primaryKey(),
	teamId: uuid("team_id")
		.notNull()
		.references(() => team.id, { onDelete: "cascade" }),
	userId: uuid("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at"),
});

export const club = pgTable("club", {
	id: uuid("id").primaryKey(),
	name: text("name").notNull(),
	slug: text("slug").unique(),
	logo: text("logo"),
	createdAt: timestamp("created_at").notNull(),
	metadata: text("metadata"),
});

export const member = pgTable("member", {
	id: uuid("id").primaryKey(),
	organizationId: uuid("organization_id")
		.notNull()
		.references(() => club.id, { onDelete: "cascade" }),
	userId: uuid("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	role: text("role").default("member").notNull(),
	createdAt: timestamp("created_at").notNull(),
});

export const invitation = pgTable("invitation", {
	id: uuid("id").primaryKey(),
	organizationId: uuid("organization_id")
		.notNull()
		.references(() => club.id, { onDelete: "cascade" }),
	email: text("email").notNull(),
	role: text("role"),
	teamId: uuid("team_id"),
	status: text("status").default("pending").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	inviterId: uuid("inviter_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const twoFactor = pgTable("two_factor", {
	id: uuid("id").primaryKey(),
	secret: text("secret").notNull(),
	backupCodes: text("backup_codes").notNull(),
	userId: uuid("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const jwks = pgTable("jwks", {
	id: uuid("id").primaryKey(),
	publicKey: text("public_key").notNull(),
	privateKey: text("private_key").notNull(),
	createdAt: timestamp("created_at").notNull(),
});

export const apikey = pgTable("apikey", {
	id: uuid("id").primaryKey(),
	name: text("name"),
	start: text("start"),
	prefix: text("prefix"),
	key: text("key").notNull(),
	userId: uuid("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	refillInterval: integer("refill_interval"),
	refillAmount: integer("refill_amount"),
	lastRefillAt: timestamp("last_refill_at"),
	enabled: boolean("enabled").default(true),
	rateLimitEnabled: boolean("rate_limit_enabled").default(true),
	rateLimitTimeWindow: integer("rate_limit_time_window").default(86400000),
	rateLimitMax: integer("rate_limit_max").default(10),
	requestCount: integer("request_count").default(0),
	remaining: integer("remaining"),
	lastRequest: timestamp("last_request"),
	expiresAt: timestamp("expires_at"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	permissions: text("permissions"),
	metadata: text("metadata"),
});
