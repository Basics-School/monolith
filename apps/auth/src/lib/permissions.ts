/**
 * Access Control Configuration
 *
 * This file defines the permission structure for the application.
 * It uses Better Auth's access control system to provide fine-grained, role-based access.
 *
 * Structure:
 * - statement: Defines all resources and their possible actions
 * - ac: Access control instance for creating roles
 * - roles: Predefined roles with specific permissions
 *
 * Usage:
 * Import this configuration in both server and client Better Auth setups to enable
 * consistent permission checking across the entire application.
 */

import { createAccessControl } from "better-auth/plugins/access";

/**
 * Permission Statement
 * Defines all resources and their available actions
 *
 * Format: resource: [actions...]
 * Example: "project:create", "project:read", "project:update", "project:delete"
 */
export const statement = {
    // Organization Management
    organization: ["create", "read", "update", "delete", "invite", "remove"],
    member: ["create", "read", "update", "delete", "invite", "remove"],
    team: ["create", "read", "update", "delete", "invite", "remove"],

    // Project Management
    project: ["create", "read", "update", "delete", "archive"],

    // User Management
    user: ["create", "read", "update", "delete", "invite"],

    // Settings & Configuration
    settings: ["read", "update"],
    billing: ["read", "update", "manage"],
    integration: ["create", "read", "update", "delete", "configure"],
} as const;

/**
 * Create access control instance
 */
export const ac = createAccessControl(statement);

/**
 * Owner Role
 * Full system access - complete control over organization
 */
export const owner = ac.newRole({
    organization: ["create", "read", "update", "delete", "invite", "remove"],
    member: ["create", "read", "update", "delete", "invite", "remove"],
    team: ["create", "read", "update", "delete", "invite", "remove"],
    project: ["create", "read", "update", "delete", "archive"],
    user: ["create", "read", "update", "delete", "invite"],
    settings: ["read", "update"],
    billing: ["read", "update", "manage"],
    integration: ["create", "read", "update", "delete", "configure"],
});

/**
 * User Role
 * Basic user access - read-only access to most resources
 */
export const user = ac.newRole({
    organization: ["read"],
    member: ["read"],
    team: ["read"],
    project: ["read"],
    user: ["read"],
    settings: ["read"],
});
