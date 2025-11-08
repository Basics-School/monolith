import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "ecommerce"."enum_users_roles" AS ENUM('super-admin', 'admin', 'customer');
  CREATE TYPE "ecommerce"."enum_users_tenants_roles" AS ENUM('tenant-admin', 'tenant-viewer');
  CREATE TYPE "ecommerce"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "ecommerce"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "ecommerce"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "ecommerce"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "ecommerce"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "ecommerce"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "ecommerce"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "ecommerce"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "ecommerce"."enum_pages_blocks_archive_relation_to" AS ENUM('products');
  CREATE TYPE "ecommerce"."enum_pages_blocks_carousel_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "ecommerce"."enum_pages_blocks_carousel_relation_to" AS ENUM('products');
  CREATE TYPE "ecommerce"."enum_pages_blocks_banner_style" AS ENUM('info', 'warning', 'error', 'success');
  CREATE TYPE "ecommerce"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "ecommerce"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "ecommerce"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "ecommerce"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "ecommerce"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "ecommerce"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "ecommerce"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "ecommerce"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "ecommerce"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "ecommerce"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "ecommerce"."enum__pages_v_blocks_archive_relation_to" AS ENUM('products');
  CREATE TYPE "ecommerce"."enum__pages_v_blocks_carousel_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "ecommerce"."enum__pages_v_blocks_carousel_relation_to" AS ENUM('products');
  CREATE TYPE "ecommerce"."enum__pages_v_blocks_banner_style" AS ENUM('info', 'warning', 'error', 'success');
  CREATE TYPE "ecommerce"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "ecommerce"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "ecommerce"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "ecommerce"."enum_addresses_country" AS ENUM('US', 'GB', 'CA', 'AU', 'AT', 'BE', 'BR', 'BG', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HK', 'HU', 'IN', 'IE', 'IT', 'JP', 'LV', 'LT', 'LU', 'MY', 'MT', 'MX', 'NL', 'NZ', 'NO', 'PL', 'PT', 'RO', 'SG', 'SK', 'SI', 'ES', 'SE', 'CH');
  CREATE TYPE "ecommerce"."enum_variants_status" AS ENUM('draft', 'published');
  CREATE TYPE "ecommerce"."enum__variants_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "ecommerce"."enum_products_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "ecommerce"."enum_products_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "ecommerce"."enum_products_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "ecommerce"."enum_products_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "ecommerce"."enum_products_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "ecommerce"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "ecommerce"."enum__products_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "ecommerce"."enum__products_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "ecommerce"."enum__products_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "ecommerce"."enum__products_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "ecommerce"."enum__products_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "ecommerce"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "ecommerce"."enum_carts_currency" AS ENUM('USD');
  CREATE TYPE "ecommerce"."enum_orders_status" AS ENUM('processing', 'completed', 'cancelled', 'refunded');
  CREATE TYPE "ecommerce"."enum_orders_currency" AS ENUM('USD');
  CREATE TYPE "ecommerce"."enum_transactions_payment_method" AS ENUM('stripe');
  CREATE TYPE "ecommerce"."enum_transactions_status" AS ENUM('pending', 'succeeded', 'failed', 'cancelled', 'expired', 'refunded');
  CREATE TYPE "ecommerce"."enum_transactions_currency" AS ENUM('USD');
  CREATE TYPE "ecommerce"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "ecommerce"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "ecommerce"."users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "ecommerce"."enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ecommerce"."users_tenants_roles" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "ecommerce"."enum_users_tenants_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ecommerce"."users_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer NOT NULL
  );
  
  CREATE TABLE "ecommerce"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "ecommerce"."users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "ecommerce"."tenants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"domain" varchar,
  	"allow_public_read" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ecommerce"."pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "ecommerce"."enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "ecommerce"."enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "ecommerce"."pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "ecommerce"."enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "ecommerce"."enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "ecommerce"."pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "ecommerce"."enum_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "ecommerce"."enum_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "ecommerce"."enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "ecommerce"."pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "ecommerce"."enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "ecommerce"."enum_pages_blocks_archive_relation_to" DEFAULT 'products',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."pages_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"populate_by" "ecommerce"."enum_pages_blocks_carousel_populate_by" DEFAULT 'collection',
  	"relation_to" "ecommerce"."enum_pages_blocks_carousel_relation_to" DEFAULT 'products',
  	"limit" numeric DEFAULT 10,
  	"populated_docs_total" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."pages_blocks_three_item_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."pages_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "ecommerce"."enum_pages_blocks_banner_style" DEFAULT 'info',
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"published_on" timestamp(3) with time zone,
  	"hero_type" "ecommerce"."enum_pages_hero_type" DEFAULT 'lowImpact',
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "ecommerce"."enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "ecommerce"."pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"categories_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "ecommerce"."_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "ecommerce"."enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "ecommerce"."enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "ecommerce"."_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "ecommerce"."enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "ecommerce"."enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "ecommerce"."_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "ecommerce"."enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "ecommerce"."enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "ecommerce"."enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "ecommerce"."_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "ecommerce"."enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "ecommerce"."enum__pages_v_blocks_archive_relation_to" DEFAULT 'products',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."_pages_v_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"populate_by" "ecommerce"."enum__pages_v_blocks_carousel_populate_by" DEFAULT 'collection',
  	"relation_to" "ecommerce"."enum__pages_v_blocks_carousel_relation_to" DEFAULT 'products',
  	"limit" numeric DEFAULT 10,
  	"populated_docs_total" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."_pages_v_blocks_three_item_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."_pages_v_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "ecommerce"."enum__pages_v_blocks_banner_style" DEFAULT 'info',
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_published_on" timestamp(3) with time zone,
  	"version_hero_type" "ecommerce"."enum__pages_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_rich_text" jsonb,
  	"version_hero_media_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "ecommerce"."enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "ecommerce"."_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"categories_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "ecommerce"."categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ecommerce"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"alt" varchar NOT NULL,
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "ecommerce"."forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "ecommerce"."forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "ecommerce"."forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "ecommerce"."enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ecommerce"."form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "ecommerce"."form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ecommerce"."addresses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"customer_id" integer,
  	"title" varchar,
  	"first_name" varchar,
  	"last_name" varchar,
  	"company" varchar,
  	"address_line1" varchar,
  	"address_line2" varchar,
  	"city" varchar,
  	"state" varchar,
  	"postal_code" varchar,
  	"country" "ecommerce"."enum_addresses_country" NOT NULL,
  	"phone" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ecommerce"."variants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"product_id" integer,
  	"inventory" numeric DEFAULT 0,
  	"price_in_u_s_d_enabled" boolean,
  	"price_in_u_s_d" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "ecommerce"."enum_variants_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "ecommerce"."variants_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"variant_options_id" integer
  );
  
  CREATE TABLE "ecommerce"."_variants_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_product_id" integer,
  	"version_inventory" numeric DEFAULT 0,
  	"version_price_in_u_s_d_enabled" boolean,
  	"version_price_in_u_s_d" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "ecommerce"."enum__variants_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "ecommerce"."_variants_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"variant_options_id" integer
  );
  
  CREATE TABLE "ecommerce"."variant_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ecommerce"."variant_options" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_variantoptions_options_order" varchar,
  	"variant_type_id" integer NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ecommerce"."products_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"variant_option_id" integer
  );
  
  CREATE TABLE "ecommerce"."products_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "ecommerce"."enum_products_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "ecommerce"."enum_products_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "ecommerce"."products_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."products_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "ecommerce"."enum_products_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "ecommerce"."enum_products_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "ecommerce"."enum_products_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "ecommerce"."products_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."products_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"description" jsonb,
  	"inventory" numeric DEFAULT 0,
  	"enable_variants" boolean,
  	"price_in_u_s_d_enabled" boolean,
  	"price_in_u_s_d" numeric,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "ecommerce"."enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "ecommerce"."products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"variant_types_id" integer,
  	"products_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "ecommerce"."_products_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"variant_option_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "ecommerce"."_products_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "ecommerce"."enum__products_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "ecommerce"."enum__products_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "ecommerce"."_products_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."_products_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "ecommerce"."enum__products_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "ecommerce"."enum__products_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "ecommerce"."enum__products_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "ecommerce"."_products_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."_products_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ecommerce"."_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_description" jsonb,
  	"version_inventory" numeric DEFAULT 0,
  	"version_enable_variants" boolean,
  	"version_price_in_u_s_d_enabled" boolean,
  	"version_price_in_u_s_d" numeric,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "ecommerce"."enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "ecommerce"."_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"variant_types_id" integer,
  	"products_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "ecommerce"."carts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"variant_id" integer,
  	"quantity" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE "ecommerce"."carts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"customer_id" integer,
  	"purchased_at" timestamp(3) with time zone,
  	"subtotal" numeric,
  	"currency" "ecommerce"."enum_carts_currency" DEFAULT 'USD',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ecommerce"."orders_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"variant_id" integer,
  	"quantity" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE "ecommerce"."orders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"shipping_address_title" varchar,
  	"shipping_address_first_name" varchar,
  	"shipping_address_last_name" varchar,
  	"shipping_address_company" varchar,
  	"shipping_address_address_line1" varchar,
  	"shipping_address_address_line2" varchar,
  	"shipping_address_city" varchar,
  	"shipping_address_state" varchar,
  	"shipping_address_postal_code" varchar,
  	"shipping_address_country" varchar,
  	"shipping_address_phone" varchar,
  	"customer_id" integer,
  	"customer_email" varchar,
  	"status" "ecommerce"."enum_orders_status" DEFAULT 'processing',
  	"amount" numeric,
  	"currency" "ecommerce"."enum_orders_currency" DEFAULT 'USD',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ecommerce"."orders_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"transactions_id" integer
  );
  
  CREATE TABLE "ecommerce"."transactions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"variant_id" integer,
  	"quantity" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE "ecommerce"."transactions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"payment_method" "ecommerce"."enum_transactions_payment_method",
  	"stripe_customer_i_d" varchar,
  	"stripe_payment_intent_i_d" varchar,
  	"billing_address_title" varchar,
  	"billing_address_first_name" varchar,
  	"billing_address_last_name" varchar,
  	"billing_address_company" varchar,
  	"billing_address_address_line1" varchar,
  	"billing_address_address_line2" varchar,
  	"billing_address_city" varchar,
  	"billing_address_state" varchar,
  	"billing_address_postal_code" varchar,
  	"billing_address_country" varchar,
  	"billing_address_phone" varchar,
  	"status" "ecommerce"."enum_transactions_status" DEFAULT 'pending' NOT NULL,
  	"customer_id" integer,
  	"customer_email" varchar,
  	"order_id" integer,
  	"cart_id" integer,
  	"amount" numeric,
  	"currency" "ecommerce"."enum_transactions_currency" DEFAULT 'USD',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ecommerce"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "ecommerce"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ecommerce"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"tenants_id" integer,
  	"pages_id" integer,
  	"categories_id" integer,
  	"media_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"addresses_id" integer,
  	"variants_id" integer,
  	"variant_types_id" integer,
  	"variant_options_id" integer,
  	"products_id" integer,
  	"carts_id" integer,
  	"orders_id" integer,
  	"transactions_id" integer
  );
  
  CREATE TABLE "ecommerce"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ecommerce"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "ecommerce"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ecommerce"."header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "ecommerce"."enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "ecommerce"."header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ecommerce"."header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "ecommerce"."footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "ecommerce"."enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "ecommerce"."footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ecommerce"."footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  ALTER TABLE "ecommerce"."users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."users_tenants_roles" ADD CONSTRAINT "users_tenants_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."users_tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."users_tenants" ADD CONSTRAINT "users_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "ecommerce"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."users_tenants" ADD CONSTRAINT "users_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "ecommerce"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_blocks_carousel" ADD CONSTRAINT "pages_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_blocks_three_item_grid" ADD CONSTRAINT "pages_blocks_three_item_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_blocks_banner" ADD CONSTRAINT "pages_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "ecommerce"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages" ADD CONSTRAINT "pages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "ecommerce"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "ecommerce"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "ecommerce"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "ecommerce"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."pages_rels" ADD CONSTRAINT "pages_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "ecommerce"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "ecommerce"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_blocks_carousel" ADD CONSTRAINT "_pages_v_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_blocks_three_item_grid" ADD CONSTRAINT "_pages_v_blocks_three_item_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_blocks_banner" ADD CONSTRAINT "_pages_v_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "ecommerce"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v" ADD CONSTRAINT "_pages_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "ecommerce"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "ecommerce"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "ecommerce"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "ecommerce"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "ecommerce"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."categories" ADD CONSTRAINT "categories_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "ecommerce"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "ecommerce"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."form_submissions" ADD CONSTRAINT "form_submissions_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "ecommerce"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "ecommerce"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."addresses" ADD CONSTRAINT "addresses_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "ecommerce"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."addresses" ADD CONSTRAINT "addresses_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "ecommerce"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."variants" ADD CONSTRAINT "variants_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "ecommerce"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."variants_rels" ADD CONSTRAINT "variants_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."variants_rels" ADD CONSTRAINT "variants_rels_variant_options_fk" FOREIGN KEY ("variant_options_id") REFERENCES "ecommerce"."variant_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_variants_v" ADD CONSTRAINT "_variants_v_parent_id_variants_id_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_variants_v" ADD CONSTRAINT "_variants_v_version_product_id_products_id_fk" FOREIGN KEY ("version_product_id") REFERENCES "ecommerce"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_variants_v_rels" ADD CONSTRAINT "_variants_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."_variants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_variants_v_rels" ADD CONSTRAINT "_variants_v_rels_variant_options_fk" FOREIGN KEY ("variant_options_id") REFERENCES "ecommerce"."variant_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."variant_options" ADD CONSTRAINT "variant_options_variant_type_id_variant_types_id_fk" FOREIGN KEY ("variant_type_id") REFERENCES "ecommerce"."variant_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_gallery" ADD CONSTRAINT "products_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "ecommerce"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_gallery" ADD CONSTRAINT "products_gallery_variant_option_id_variant_options_id_fk" FOREIGN KEY ("variant_option_id") REFERENCES "ecommerce"."variant_options"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_gallery" ADD CONSTRAINT "products_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_blocks_cta_links" ADD CONSTRAINT "products_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."products_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_blocks_cta" ADD CONSTRAINT "products_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_blocks_content_columns" ADD CONSTRAINT "products_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."products_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_blocks_content" ADD CONSTRAINT "products_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_blocks_media_block" ADD CONSTRAINT "products_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "ecommerce"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_blocks_media_block" ADD CONSTRAINT "products_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."products" ADD CONSTRAINT "products_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "ecommerce"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."products" ADD CONSTRAINT "products_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "ecommerce"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_rels" ADD CONSTRAINT "products_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_rels" ADD CONSTRAINT "products_rels_variant_types_fk" FOREIGN KEY ("variant_types_id") REFERENCES "ecommerce"."variant_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "ecommerce"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."products_rels" ADD CONSTRAINT "products_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "ecommerce"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "ecommerce"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_variant_option_id_variant_options_id_fk" FOREIGN KEY ("variant_option_id") REFERENCES "ecommerce"."variant_options"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_blocks_cta_links" ADD CONSTRAINT "_products_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_products_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_blocks_cta" ADD CONSTRAINT "_products_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_blocks_content_columns" ADD CONSTRAINT "_products_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_products_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_blocks_content" ADD CONSTRAINT "_products_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_blocks_media_block" ADD CONSTRAINT "_products_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "ecommerce"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_blocks_media_block" ADD CONSTRAINT "_products_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v" ADD CONSTRAINT "_products_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "ecommerce"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v" ADD CONSTRAINT "_products_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "ecommerce"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_rels" ADD CONSTRAINT "_products_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_rels" ADD CONSTRAINT "_products_v_rels_variant_types_fk" FOREIGN KEY ("variant_types_id") REFERENCES "ecommerce"."variant_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_rels" ADD CONSTRAINT "_products_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "ecommerce"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."_products_v_rels" ADD CONSTRAINT "_products_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "ecommerce"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."carts_items" ADD CONSTRAINT "carts_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "ecommerce"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."carts_items" ADD CONSTRAINT "carts_items_variant_id_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "ecommerce"."variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."carts_items" ADD CONSTRAINT "carts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."carts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."carts" ADD CONSTRAINT "carts_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "ecommerce"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."carts" ADD CONSTRAINT "carts_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "ecommerce"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."orders_items" ADD CONSTRAINT "orders_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "ecommerce"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."orders_items" ADD CONSTRAINT "orders_items_variant_id_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "ecommerce"."variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."orders_items" ADD CONSTRAINT "orders_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."orders" ADD CONSTRAINT "orders_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "ecommerce"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."orders" ADD CONSTRAINT "orders_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "ecommerce"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."orders_rels" ADD CONSTRAINT "orders_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."orders_rels" ADD CONSTRAINT "orders_rels_transactions_fk" FOREIGN KEY ("transactions_id") REFERENCES "ecommerce"."transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."transactions_items" ADD CONSTRAINT "transactions_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "ecommerce"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."transactions_items" ADD CONSTRAINT "transactions_items_variant_id_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "ecommerce"."variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."transactions_items" ADD CONSTRAINT "transactions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."transactions" ADD CONSTRAINT "transactions_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "ecommerce"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."transactions" ADD CONSTRAINT "transactions_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "ecommerce"."orders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."transactions" ADD CONSTRAINT "transactions_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "ecommerce"."carts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "ecommerce"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "ecommerce"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "ecommerce"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "ecommerce"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "ecommerce"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "ecommerce"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_addresses_fk" FOREIGN KEY ("addresses_id") REFERENCES "ecommerce"."addresses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_variants_fk" FOREIGN KEY ("variants_id") REFERENCES "ecommerce"."variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_variant_types_fk" FOREIGN KEY ("variant_types_id") REFERENCES "ecommerce"."variant_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_variant_options_fk" FOREIGN KEY ("variant_options_id") REFERENCES "ecommerce"."variant_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "ecommerce"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_carts_fk" FOREIGN KEY ("carts_id") REFERENCES "ecommerce"."carts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "ecommerce"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_transactions_fk" FOREIGN KEY ("transactions_id") REFERENCES "ecommerce"."transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "ecommerce"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "ecommerce"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "ecommerce"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ecommerce"."footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "ecommerce"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "ecommerce"."users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "ecommerce"."users_roles" USING btree ("parent_id");
  CREATE INDEX "users_tenants_roles_order_idx" ON "ecommerce"."users_tenants_roles" USING btree ("order");
  CREATE INDEX "users_tenants_roles_parent_idx" ON "ecommerce"."users_tenants_roles" USING btree ("parent_id");
  CREATE INDEX "users_tenants_order_idx" ON "ecommerce"."users_tenants" USING btree ("_order");
  CREATE INDEX "users_tenants_parent_id_idx" ON "ecommerce"."users_tenants" USING btree ("_parent_id");
  CREATE INDEX "users_tenants_tenant_idx" ON "ecommerce"."users_tenants" USING btree ("tenant_id");
  CREATE INDEX "users_sessions_order_idx" ON "ecommerce"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "ecommerce"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "ecommerce"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "ecommerce"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "ecommerce"."users" USING btree ("email");
  CREATE UNIQUE INDEX "tenants_slug_idx" ON "ecommerce"."tenants" USING btree ("slug");
  CREATE INDEX "tenants_allow_public_read_idx" ON "ecommerce"."tenants" USING btree ("allow_public_read");
  CREATE INDEX "tenants_updated_at_idx" ON "ecommerce"."tenants" USING btree ("updated_at");
  CREATE INDEX "tenants_created_at_idx" ON "ecommerce"."tenants" USING btree ("created_at");
  CREATE INDEX "pages_hero_links_order_idx" ON "ecommerce"."pages_hero_links" USING btree ("_order");
  CREATE INDEX "pages_hero_links_parent_id_idx" ON "ecommerce"."pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "ecommerce"."pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "ecommerce"."pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "ecommerce"."pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "ecommerce"."pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "ecommerce"."pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_columns_order_idx" ON "ecommerce"."pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_parent_id_idx" ON "ecommerce"."pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "ecommerce"."pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "ecommerce"."pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "ecommerce"."pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "ecommerce"."pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "ecommerce"."pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "ecommerce"."pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "ecommerce"."pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "pages_blocks_archive_order_idx" ON "ecommerce"."pages_blocks_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_archive_parent_id_idx" ON "ecommerce"."pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_archive_path_idx" ON "ecommerce"."pages_blocks_archive" USING btree ("_path");
  CREATE INDEX "pages_blocks_carousel_order_idx" ON "ecommerce"."pages_blocks_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_parent_id_idx" ON "ecommerce"."pages_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_path_idx" ON "ecommerce"."pages_blocks_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_three_item_grid_order_idx" ON "ecommerce"."pages_blocks_three_item_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_three_item_grid_parent_id_idx" ON "ecommerce"."pages_blocks_three_item_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_three_item_grid_path_idx" ON "ecommerce"."pages_blocks_three_item_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_banner_order_idx" ON "ecommerce"."pages_blocks_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_banner_parent_id_idx" ON "ecommerce"."pages_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banner_path_idx" ON "ecommerce"."pages_blocks_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "ecommerce"."pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "ecommerce"."pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "ecommerce"."pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_form_idx" ON "ecommerce"."pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "pages_tenant_idx" ON "ecommerce"."pages" USING btree ("tenant_id");
  CREATE INDEX "pages_hero_hero_media_idx" ON "ecommerce"."pages" USING btree ("hero_media_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "ecommerce"."pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "ecommerce"."pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "ecommerce"."pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "ecommerce"."pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "ecommerce"."pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "ecommerce"."pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "ecommerce"."pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "ecommerce"."pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "ecommerce"."pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_categories_id_idx" ON "ecommerce"."pages_rels" USING btree ("categories_id");
  CREATE INDEX "pages_rels_products_id_idx" ON "ecommerce"."pages_rels" USING btree ("products_id");
  CREATE INDEX "_pages_v_version_hero_links_order_idx" ON "ecommerce"."_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_links_parent_id_idx" ON "ecommerce"."_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "ecommerce"."_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "ecommerce"."_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "ecommerce"."_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "ecommerce"."_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "ecommerce"."_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_columns_order_idx" ON "ecommerce"."_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_parent_id_idx" ON "ecommerce"."_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "ecommerce"."_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "ecommerce"."_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "ecommerce"."_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "ecommerce"."_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "ecommerce"."_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "ecommerce"."_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "ecommerce"."_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_archive_order_idx" ON "ecommerce"."_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_archive_parent_id_idx" ON "ecommerce"."_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_archive_path_idx" ON "ecommerce"."_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_carousel_order_idx" ON "ecommerce"."_pages_v_blocks_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_parent_id_idx" ON "ecommerce"."_pages_v_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_path_idx" ON "ecommerce"."_pages_v_blocks_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_three_item_grid_order_idx" ON "ecommerce"."_pages_v_blocks_three_item_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_three_item_grid_parent_id_idx" ON "ecommerce"."_pages_v_blocks_three_item_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_three_item_grid_path_idx" ON "ecommerce"."_pages_v_blocks_three_item_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_banner_order_idx" ON "ecommerce"."_pages_v_blocks_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banner_parent_id_idx" ON "ecommerce"."_pages_v_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banner_path_idx" ON "ecommerce"."_pages_v_blocks_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "ecommerce"."_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "ecommerce"."_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "ecommerce"."_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_form_idx" ON "ecommerce"."_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_parent_idx" ON "ecommerce"."_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_tenant_idx" ON "ecommerce"."_pages_v" USING btree ("version_tenant_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_idx" ON "ecommerce"."_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "ecommerce"."_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "ecommerce"."_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "ecommerce"."_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "ecommerce"."_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "ecommerce"."_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "ecommerce"."_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "ecommerce"."_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "ecommerce"."_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "ecommerce"."_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "ecommerce"."_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "ecommerce"."_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "ecommerce"."_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "ecommerce"."_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "ecommerce"."_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_rels_products_id_idx" ON "ecommerce"."_pages_v_rels" USING btree ("products_id");
  CREATE INDEX "categories_tenant_idx" ON "ecommerce"."categories" USING btree ("tenant_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "ecommerce"."categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "ecommerce"."categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "ecommerce"."categories" USING btree ("created_at");
  CREATE INDEX "media_tenant_idx" ON "ecommerce"."media" USING btree ("tenant_id");
  CREATE INDEX "media_updated_at_idx" ON "ecommerce"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "ecommerce"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "ecommerce"."media" USING btree ("filename");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "ecommerce"."forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "ecommerce"."forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "ecommerce"."forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "ecommerce"."forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "ecommerce"."forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "ecommerce"."forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "ecommerce"."forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "ecommerce"."forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "ecommerce"."forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "ecommerce"."forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "ecommerce"."forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "ecommerce"."forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "ecommerce"."forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "ecommerce"."forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "ecommerce"."forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "ecommerce"."forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "ecommerce"."forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "ecommerce"."forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "ecommerce"."forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "ecommerce"."forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "ecommerce"."forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "ecommerce"."forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "ecommerce"."forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "ecommerce"."forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "ecommerce"."forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "ecommerce"."forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "ecommerce"."forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "ecommerce"."forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "ecommerce"."forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "ecommerce"."forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "ecommerce"."forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "ecommerce"."forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "ecommerce"."forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "ecommerce"."form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "ecommerce"."form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_tenant_idx" ON "ecommerce"."form_submissions" USING btree ("tenant_id");
  CREATE INDEX "form_submissions_form_idx" ON "ecommerce"."form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "ecommerce"."form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "ecommerce"."form_submissions" USING btree ("created_at");
  CREATE INDEX "addresses_tenant_idx" ON "ecommerce"."addresses" USING btree ("tenant_id");
  CREATE INDEX "addresses_customer_idx" ON "ecommerce"."addresses" USING btree ("customer_id");
  CREATE INDEX "addresses_updated_at_idx" ON "ecommerce"."addresses" USING btree ("updated_at");
  CREATE INDEX "addresses_created_at_idx" ON "ecommerce"."addresses" USING btree ("created_at");
  CREATE INDEX "variants_product_idx" ON "ecommerce"."variants" USING btree ("product_id");
  CREATE INDEX "variants_updated_at_idx" ON "ecommerce"."variants" USING btree ("updated_at");
  CREATE INDEX "variants_created_at_idx" ON "ecommerce"."variants" USING btree ("created_at");
  CREATE INDEX "variants_deleted_at_idx" ON "ecommerce"."variants" USING btree ("deleted_at");
  CREATE INDEX "variants__status_idx" ON "ecommerce"."variants" USING btree ("_status");
  CREATE INDEX "variants_rels_order_idx" ON "ecommerce"."variants_rels" USING btree ("order");
  CREATE INDEX "variants_rels_parent_idx" ON "ecommerce"."variants_rels" USING btree ("parent_id");
  CREATE INDEX "variants_rels_path_idx" ON "ecommerce"."variants_rels" USING btree ("path");
  CREATE INDEX "variants_rels_variant_options_id_idx" ON "ecommerce"."variants_rels" USING btree ("variant_options_id");
  CREATE INDEX "_variants_v_parent_idx" ON "ecommerce"."_variants_v" USING btree ("parent_id");
  CREATE INDEX "_variants_v_version_version_product_idx" ON "ecommerce"."_variants_v" USING btree ("version_product_id");
  CREATE INDEX "_variants_v_version_version_updated_at_idx" ON "ecommerce"."_variants_v" USING btree ("version_updated_at");
  CREATE INDEX "_variants_v_version_version_created_at_idx" ON "ecommerce"."_variants_v" USING btree ("version_created_at");
  CREATE INDEX "_variants_v_version_version_deleted_at_idx" ON "ecommerce"."_variants_v" USING btree ("version_deleted_at");
  CREATE INDEX "_variants_v_version_version__status_idx" ON "ecommerce"."_variants_v" USING btree ("version__status");
  CREATE INDEX "_variants_v_created_at_idx" ON "ecommerce"."_variants_v" USING btree ("created_at");
  CREATE INDEX "_variants_v_updated_at_idx" ON "ecommerce"."_variants_v" USING btree ("updated_at");
  CREATE INDEX "_variants_v_latest_idx" ON "ecommerce"."_variants_v" USING btree ("latest");
  CREATE INDEX "_variants_v_autosave_idx" ON "ecommerce"."_variants_v" USING btree ("autosave");
  CREATE INDEX "_variants_v_rels_order_idx" ON "ecommerce"."_variants_v_rels" USING btree ("order");
  CREATE INDEX "_variants_v_rels_parent_idx" ON "ecommerce"."_variants_v_rels" USING btree ("parent_id");
  CREATE INDEX "_variants_v_rels_path_idx" ON "ecommerce"."_variants_v_rels" USING btree ("path");
  CREATE INDEX "_variants_v_rels_variant_options_id_idx" ON "ecommerce"."_variants_v_rels" USING btree ("variant_options_id");
  CREATE INDEX "variant_types_updated_at_idx" ON "ecommerce"."variant_types" USING btree ("updated_at");
  CREATE INDEX "variant_types_created_at_idx" ON "ecommerce"."variant_types" USING btree ("created_at");
  CREATE INDEX "variant_types_deleted_at_idx" ON "ecommerce"."variant_types" USING btree ("deleted_at");
  CREATE INDEX "variant_options__variantoptions_options_order_idx" ON "ecommerce"."variant_options" USING btree ("_variantoptions_options_order");
  CREATE INDEX "variant_options_variant_type_idx" ON "ecommerce"."variant_options" USING btree ("variant_type_id");
  CREATE INDEX "variant_options_updated_at_idx" ON "ecommerce"."variant_options" USING btree ("updated_at");
  CREATE INDEX "variant_options_created_at_idx" ON "ecommerce"."variant_options" USING btree ("created_at");
  CREATE INDEX "variant_options_deleted_at_idx" ON "ecommerce"."variant_options" USING btree ("deleted_at");
  CREATE INDEX "products_gallery_order_idx" ON "ecommerce"."products_gallery" USING btree ("_order");
  CREATE INDEX "products_gallery_parent_id_idx" ON "ecommerce"."products_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_gallery_image_idx" ON "ecommerce"."products_gallery" USING btree ("image_id");
  CREATE INDEX "products_gallery_variant_option_idx" ON "ecommerce"."products_gallery" USING btree ("variant_option_id");
  CREATE INDEX "products_blocks_cta_links_order_idx" ON "ecommerce"."products_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "products_blocks_cta_links_parent_id_idx" ON "ecommerce"."products_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_cta_order_idx" ON "ecommerce"."products_blocks_cta" USING btree ("_order");
  CREATE INDEX "products_blocks_cta_parent_id_idx" ON "ecommerce"."products_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_cta_path_idx" ON "ecommerce"."products_blocks_cta" USING btree ("_path");
  CREATE INDEX "products_blocks_content_columns_order_idx" ON "ecommerce"."products_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "products_blocks_content_columns_parent_id_idx" ON "ecommerce"."products_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_content_order_idx" ON "ecommerce"."products_blocks_content" USING btree ("_order");
  CREATE INDEX "products_blocks_content_parent_id_idx" ON "ecommerce"."products_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_content_path_idx" ON "ecommerce"."products_blocks_content" USING btree ("_path");
  CREATE INDEX "products_blocks_media_block_order_idx" ON "ecommerce"."products_blocks_media_block" USING btree ("_order");
  CREATE INDEX "products_blocks_media_block_parent_id_idx" ON "ecommerce"."products_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_media_block_path_idx" ON "ecommerce"."products_blocks_media_block" USING btree ("_path");
  CREATE INDEX "products_blocks_media_block_media_idx" ON "ecommerce"."products_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "products_tenant_idx" ON "ecommerce"."products" USING btree ("tenant_id");
  CREATE INDEX "products_meta_meta_image_idx" ON "ecommerce"."products" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "ecommerce"."products" USING btree ("slug");
  CREATE INDEX "products_updated_at_idx" ON "ecommerce"."products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "ecommerce"."products" USING btree ("created_at");
  CREATE INDEX "products_deleted_at_idx" ON "ecommerce"."products" USING btree ("deleted_at");
  CREATE INDEX "products__status_idx" ON "ecommerce"."products" USING btree ("_status");
  CREATE INDEX "products_rels_order_idx" ON "ecommerce"."products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "ecommerce"."products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "ecommerce"."products_rels" USING btree ("path");
  CREATE INDEX "products_rels_pages_id_idx" ON "ecommerce"."products_rels" USING btree ("pages_id");
  CREATE INDEX "products_rels_variant_types_id_idx" ON "ecommerce"."products_rels" USING btree ("variant_types_id");
  CREATE INDEX "products_rels_products_id_idx" ON "ecommerce"."products_rels" USING btree ("products_id");
  CREATE INDEX "products_rels_categories_id_idx" ON "ecommerce"."products_rels" USING btree ("categories_id");
  CREATE INDEX "_products_v_version_gallery_order_idx" ON "ecommerce"."_products_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_version_gallery_parent_id_idx" ON "ecommerce"."_products_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_gallery_image_idx" ON "ecommerce"."_products_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_products_v_version_gallery_variant_option_idx" ON "ecommerce"."_products_v_version_gallery" USING btree ("variant_option_id");
  CREATE INDEX "_products_v_blocks_cta_links_order_idx" ON "ecommerce"."_products_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_cta_links_parent_id_idx" ON "ecommerce"."_products_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_cta_order_idx" ON "ecommerce"."_products_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_cta_parent_id_idx" ON "ecommerce"."_products_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_cta_path_idx" ON "ecommerce"."_products_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_content_columns_order_idx" ON "ecommerce"."_products_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_content_columns_parent_id_idx" ON "ecommerce"."_products_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_content_order_idx" ON "ecommerce"."_products_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_content_parent_id_idx" ON "ecommerce"."_products_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_content_path_idx" ON "ecommerce"."_products_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_media_block_order_idx" ON "ecommerce"."_products_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_media_block_parent_id_idx" ON "ecommerce"."_products_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_media_block_path_idx" ON "ecommerce"."_products_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_media_block_media_idx" ON "ecommerce"."_products_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_products_v_parent_idx" ON "ecommerce"."_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_tenant_idx" ON "ecommerce"."_products_v" USING btree ("version_tenant_id");
  CREATE INDEX "_products_v_version_meta_version_meta_image_idx" ON "ecommerce"."_products_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "ecommerce"."_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "ecommerce"."_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "ecommerce"."_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version_deleted_at_idx" ON "ecommerce"."_products_v" USING btree ("version_deleted_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "ecommerce"."_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "ecommerce"."_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "ecommerce"."_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_latest_idx" ON "ecommerce"."_products_v" USING btree ("latest");
  CREATE INDEX "_products_v_autosave_idx" ON "ecommerce"."_products_v" USING btree ("autosave");
  CREATE INDEX "_products_v_rels_order_idx" ON "ecommerce"."_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "ecommerce"."_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "ecommerce"."_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_pages_id_idx" ON "ecommerce"."_products_v_rels" USING btree ("pages_id");
  CREATE INDEX "_products_v_rels_variant_types_id_idx" ON "ecommerce"."_products_v_rels" USING btree ("variant_types_id");
  CREATE INDEX "_products_v_rels_products_id_idx" ON "ecommerce"."_products_v_rels" USING btree ("products_id");
  CREATE INDEX "_products_v_rels_categories_id_idx" ON "ecommerce"."_products_v_rels" USING btree ("categories_id");
  CREATE INDEX "carts_items_order_idx" ON "ecommerce"."carts_items" USING btree ("_order");
  CREATE INDEX "carts_items_parent_id_idx" ON "ecommerce"."carts_items" USING btree ("_parent_id");
  CREATE INDEX "carts_items_product_idx" ON "ecommerce"."carts_items" USING btree ("product_id");
  CREATE INDEX "carts_items_variant_idx" ON "ecommerce"."carts_items" USING btree ("variant_id");
  CREATE INDEX "carts_tenant_idx" ON "ecommerce"."carts" USING btree ("tenant_id");
  CREATE INDEX "carts_customer_idx" ON "ecommerce"."carts" USING btree ("customer_id");
  CREATE INDEX "carts_updated_at_idx" ON "ecommerce"."carts" USING btree ("updated_at");
  CREATE INDEX "carts_created_at_idx" ON "ecommerce"."carts" USING btree ("created_at");
  CREATE INDEX "orders_items_order_idx" ON "ecommerce"."orders_items" USING btree ("_order");
  CREATE INDEX "orders_items_parent_id_idx" ON "ecommerce"."orders_items" USING btree ("_parent_id");
  CREATE INDEX "orders_items_product_idx" ON "ecommerce"."orders_items" USING btree ("product_id");
  CREATE INDEX "orders_items_variant_idx" ON "ecommerce"."orders_items" USING btree ("variant_id");
  CREATE INDEX "orders_tenant_idx" ON "ecommerce"."orders" USING btree ("tenant_id");
  CREATE INDEX "orders_customer_idx" ON "ecommerce"."orders" USING btree ("customer_id");
  CREATE INDEX "orders_updated_at_idx" ON "ecommerce"."orders" USING btree ("updated_at");
  CREATE INDEX "orders_created_at_idx" ON "ecommerce"."orders" USING btree ("created_at");
  CREATE INDEX "orders_rels_order_idx" ON "ecommerce"."orders_rels" USING btree ("order");
  CREATE INDEX "orders_rels_parent_idx" ON "ecommerce"."orders_rels" USING btree ("parent_id");
  CREATE INDEX "orders_rels_path_idx" ON "ecommerce"."orders_rels" USING btree ("path");
  CREATE INDEX "orders_rels_transactions_id_idx" ON "ecommerce"."orders_rels" USING btree ("transactions_id");
  CREATE INDEX "transactions_items_order_idx" ON "ecommerce"."transactions_items" USING btree ("_order");
  CREATE INDEX "transactions_items_parent_id_idx" ON "ecommerce"."transactions_items" USING btree ("_parent_id");
  CREATE INDEX "transactions_items_product_idx" ON "ecommerce"."transactions_items" USING btree ("product_id");
  CREATE INDEX "transactions_items_variant_idx" ON "ecommerce"."transactions_items" USING btree ("variant_id");
  CREATE INDEX "transactions_customer_idx" ON "ecommerce"."transactions" USING btree ("customer_id");
  CREATE INDEX "transactions_order_idx" ON "ecommerce"."transactions" USING btree ("order_id");
  CREATE INDEX "transactions_cart_idx" ON "ecommerce"."transactions" USING btree ("cart_id");
  CREATE INDEX "transactions_updated_at_idx" ON "ecommerce"."transactions" USING btree ("updated_at");
  CREATE INDEX "transactions_created_at_idx" ON "ecommerce"."transactions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "ecommerce"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "ecommerce"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "ecommerce"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "ecommerce"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_tenants_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("tenants_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_addresses_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("addresses_id");
  CREATE INDEX "payload_locked_documents_rels_variants_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("variants_id");
  CREATE INDEX "payload_locked_documents_rels_variant_types_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("variant_types_id");
  CREATE INDEX "payload_locked_documents_rels_variant_options_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("variant_options_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_carts_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("carts_id");
  CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX "payload_locked_documents_rels_transactions_id_idx" ON "ecommerce"."payload_locked_documents_rels" USING btree ("transactions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "ecommerce"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "ecommerce"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "ecommerce"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "ecommerce"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "ecommerce"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "ecommerce"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "ecommerce"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "ecommerce"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "ecommerce"."payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_order_idx" ON "ecommerce"."header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "ecommerce"."header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "ecommerce"."header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "ecommerce"."header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "ecommerce"."header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "ecommerce"."header_rels" USING btree ("pages_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "ecommerce"."footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "ecommerce"."footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "ecommerce"."footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "ecommerce"."footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "ecommerce"."footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "ecommerce"."footer_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "ecommerce"."users_roles" CASCADE;
  DROP TABLE "ecommerce"."users_tenants_roles" CASCADE;
  DROP TABLE "ecommerce"."users_tenants" CASCADE;
  DROP TABLE "ecommerce"."users_sessions" CASCADE;
  DROP TABLE "ecommerce"."users" CASCADE;
  DROP TABLE "ecommerce"."tenants" CASCADE;
  DROP TABLE "ecommerce"."pages_hero_links" CASCADE;
  DROP TABLE "ecommerce"."pages_blocks_cta_links" CASCADE;
  DROP TABLE "ecommerce"."pages_blocks_cta" CASCADE;
  DROP TABLE "ecommerce"."pages_blocks_content_columns" CASCADE;
  DROP TABLE "ecommerce"."pages_blocks_content" CASCADE;
  DROP TABLE "ecommerce"."pages_blocks_media_block" CASCADE;
  DROP TABLE "ecommerce"."pages_blocks_archive" CASCADE;
  DROP TABLE "ecommerce"."pages_blocks_carousel" CASCADE;
  DROP TABLE "ecommerce"."pages_blocks_three_item_grid" CASCADE;
  DROP TABLE "ecommerce"."pages_blocks_banner" CASCADE;
  DROP TABLE "ecommerce"."pages_blocks_form_block" CASCADE;
  DROP TABLE "ecommerce"."pages" CASCADE;
  DROP TABLE "ecommerce"."pages_rels" CASCADE;
  DROP TABLE "ecommerce"."_pages_v_version_hero_links" CASCADE;
  DROP TABLE "ecommerce"."_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "ecommerce"."_pages_v_blocks_cta" CASCADE;
  DROP TABLE "ecommerce"."_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "ecommerce"."_pages_v_blocks_content" CASCADE;
  DROP TABLE "ecommerce"."_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "ecommerce"."_pages_v_blocks_archive" CASCADE;
  DROP TABLE "ecommerce"."_pages_v_blocks_carousel" CASCADE;
  DROP TABLE "ecommerce"."_pages_v_blocks_three_item_grid" CASCADE;
  DROP TABLE "ecommerce"."_pages_v_blocks_banner" CASCADE;
  DROP TABLE "ecommerce"."_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "ecommerce"."_pages_v" CASCADE;
  DROP TABLE "ecommerce"."_pages_v_rels" CASCADE;
  DROP TABLE "ecommerce"."categories" CASCADE;
  DROP TABLE "ecommerce"."media" CASCADE;
  DROP TABLE "ecommerce"."forms_blocks_checkbox" CASCADE;
  DROP TABLE "ecommerce"."forms_blocks_country" CASCADE;
  DROP TABLE "ecommerce"."forms_blocks_email" CASCADE;
  DROP TABLE "ecommerce"."forms_blocks_message" CASCADE;
  DROP TABLE "ecommerce"."forms_blocks_number" CASCADE;
  DROP TABLE "ecommerce"."forms_blocks_select_options" CASCADE;
  DROP TABLE "ecommerce"."forms_blocks_select" CASCADE;
  DROP TABLE "ecommerce"."forms_blocks_state" CASCADE;
  DROP TABLE "ecommerce"."forms_blocks_text" CASCADE;
  DROP TABLE "ecommerce"."forms_blocks_textarea" CASCADE;
  DROP TABLE "ecommerce"."forms_emails" CASCADE;
  DROP TABLE "ecommerce"."forms" CASCADE;
  DROP TABLE "ecommerce"."form_submissions_submission_data" CASCADE;
  DROP TABLE "ecommerce"."form_submissions" CASCADE;
  DROP TABLE "ecommerce"."addresses" CASCADE;
  DROP TABLE "ecommerce"."variants" CASCADE;
  DROP TABLE "ecommerce"."variants_rels" CASCADE;
  DROP TABLE "ecommerce"."_variants_v" CASCADE;
  DROP TABLE "ecommerce"."_variants_v_rels" CASCADE;
  DROP TABLE "ecommerce"."variant_types" CASCADE;
  DROP TABLE "ecommerce"."variant_options" CASCADE;
  DROP TABLE "ecommerce"."products_gallery" CASCADE;
  DROP TABLE "ecommerce"."products_blocks_cta_links" CASCADE;
  DROP TABLE "ecommerce"."products_blocks_cta" CASCADE;
  DROP TABLE "ecommerce"."products_blocks_content_columns" CASCADE;
  DROP TABLE "ecommerce"."products_blocks_content" CASCADE;
  DROP TABLE "ecommerce"."products_blocks_media_block" CASCADE;
  DROP TABLE "ecommerce"."products" CASCADE;
  DROP TABLE "ecommerce"."products_rels" CASCADE;
  DROP TABLE "ecommerce"."_products_v_version_gallery" CASCADE;
  DROP TABLE "ecommerce"."_products_v_blocks_cta_links" CASCADE;
  DROP TABLE "ecommerce"."_products_v_blocks_cta" CASCADE;
  DROP TABLE "ecommerce"."_products_v_blocks_content_columns" CASCADE;
  DROP TABLE "ecommerce"."_products_v_blocks_content" CASCADE;
  DROP TABLE "ecommerce"."_products_v_blocks_media_block" CASCADE;
  DROP TABLE "ecommerce"."_products_v" CASCADE;
  DROP TABLE "ecommerce"."_products_v_rels" CASCADE;
  DROP TABLE "ecommerce"."carts_items" CASCADE;
  DROP TABLE "ecommerce"."carts" CASCADE;
  DROP TABLE "ecommerce"."orders_items" CASCADE;
  DROP TABLE "ecommerce"."orders" CASCADE;
  DROP TABLE "ecommerce"."orders_rels" CASCADE;
  DROP TABLE "ecommerce"."transactions_items" CASCADE;
  DROP TABLE "ecommerce"."transactions" CASCADE;
  DROP TABLE "ecommerce"."payload_kv" CASCADE;
  DROP TABLE "ecommerce"."payload_locked_documents" CASCADE;
  DROP TABLE "ecommerce"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "ecommerce"."payload_preferences" CASCADE;
  DROP TABLE "ecommerce"."payload_preferences_rels" CASCADE;
  DROP TABLE "ecommerce"."payload_migrations" CASCADE;
  DROP TABLE "ecommerce"."header_nav_items" CASCADE;
  DROP TABLE "ecommerce"."header" CASCADE;
  DROP TABLE "ecommerce"."header_rels" CASCADE;
  DROP TABLE "ecommerce"."footer_nav_items" CASCADE;
  DROP TABLE "ecommerce"."footer" CASCADE;
  DROP TABLE "ecommerce"."footer_rels" CASCADE;
  DROP TYPE "ecommerce"."enum_users_roles";
  DROP TYPE "ecommerce"."enum_users_tenants_roles";
  DROP TYPE "ecommerce"."enum_pages_hero_links_link_type";
  DROP TYPE "ecommerce"."enum_pages_hero_links_link_appearance";
  DROP TYPE "ecommerce"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "ecommerce"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "ecommerce"."enum_pages_blocks_content_columns_size";
  DROP TYPE "ecommerce"."enum_pages_blocks_content_columns_link_type";
  DROP TYPE "ecommerce"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE "ecommerce"."enum_pages_blocks_archive_populate_by";
  DROP TYPE "ecommerce"."enum_pages_blocks_archive_relation_to";
  DROP TYPE "ecommerce"."enum_pages_blocks_carousel_populate_by";
  DROP TYPE "ecommerce"."enum_pages_blocks_carousel_relation_to";
  DROP TYPE "ecommerce"."enum_pages_blocks_banner_style";
  DROP TYPE "ecommerce"."enum_pages_hero_type";
  DROP TYPE "ecommerce"."enum_pages_status";
  DROP TYPE "ecommerce"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "ecommerce"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "ecommerce"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "ecommerce"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "ecommerce"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE "ecommerce"."enum__pages_v_blocks_content_columns_link_type";
  DROP TYPE "ecommerce"."enum__pages_v_blocks_content_columns_link_appearance";
  DROP TYPE "ecommerce"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE "ecommerce"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "ecommerce"."enum__pages_v_blocks_carousel_populate_by";
  DROP TYPE "ecommerce"."enum__pages_v_blocks_carousel_relation_to";
  DROP TYPE "ecommerce"."enum__pages_v_blocks_banner_style";
  DROP TYPE "ecommerce"."enum__pages_v_version_hero_type";
  DROP TYPE "ecommerce"."enum__pages_v_version_status";
  DROP TYPE "ecommerce"."enum_forms_confirmation_type";
  DROP TYPE "ecommerce"."enum_addresses_country";
  DROP TYPE "ecommerce"."enum_variants_status";
  DROP TYPE "ecommerce"."enum__variants_v_version_status";
  DROP TYPE "ecommerce"."enum_products_blocks_cta_links_link_type";
  DROP TYPE "ecommerce"."enum_products_blocks_cta_links_link_appearance";
  DROP TYPE "ecommerce"."enum_products_blocks_content_columns_size";
  DROP TYPE "ecommerce"."enum_products_blocks_content_columns_link_type";
  DROP TYPE "ecommerce"."enum_products_blocks_content_columns_link_appearance";
  DROP TYPE "ecommerce"."enum_products_status";
  DROP TYPE "ecommerce"."enum__products_v_blocks_cta_links_link_type";
  DROP TYPE "ecommerce"."enum__products_v_blocks_cta_links_link_appearance";
  DROP TYPE "ecommerce"."enum__products_v_blocks_content_columns_size";
  DROP TYPE "ecommerce"."enum__products_v_blocks_content_columns_link_type";
  DROP TYPE "ecommerce"."enum__products_v_blocks_content_columns_link_appearance";
  DROP TYPE "ecommerce"."enum__products_v_version_status";
  DROP TYPE "ecommerce"."enum_carts_currency";
  DROP TYPE "ecommerce"."enum_orders_status";
  DROP TYPE "ecommerce"."enum_orders_currency";
  DROP TYPE "ecommerce"."enum_transactions_payment_method";
  DROP TYPE "ecommerce"."enum_transactions_status";
  DROP TYPE "ecommerce"."enum_transactions_currency";
  DROP TYPE "ecommerce"."enum_header_nav_items_link_type";
  DROP TYPE "ecommerce"."enum_footer_nav_items_link_type";`)
}
