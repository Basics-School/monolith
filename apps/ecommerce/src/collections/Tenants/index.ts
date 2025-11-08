import type { CollectionConfig } from 'payload'

import { isSuperAdminAccess } from './access/isSuperAdmin'
import { updateAndDeleteAccess } from './access/updateAndDelete'

export const Tenants: CollectionConfig = {
    slug: 'tenants',
    access: {
        create: isSuperAdminAccess,
        delete: updateAndDeleteAccess,
        read: ({ req }) => Boolean(req.user),
        update: updateAndDeleteAccess,
    },
    admin: {
        useAsTitle: 'name',
        group: 'Admin',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            admin: {
                description: 'Display name for this tenant',
            },
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            admin: {
                description: 'Used for URL paths, example: /tenant-slug/page-slug',
            },
        },
        {
            name: 'domain',
            type: 'text',
            admin: {
                description: 'Used for domain-based tenant handling (optional)',
            },
        },
        {
            name: 'allowPublicRead',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                description:
                    'If checked, logging in is not required to read. Useful for building public stores.',
                position: 'sidebar',
            },
            index: true,
        },
    ],
}
