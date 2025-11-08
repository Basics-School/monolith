// storage-adapter-import-placeholder
import { supabaseAdapter } from '@/lib/supabase-adapter'
import { postgresAdapter } from '@payloadcms/db-postgres'

import {
    BoldFeature,
    EXPERIMENTAL_TableFeature,
    IndentFeature,
    ItalicFeature,
    LinkFeature,
    OrderedListFeature,
    UnderlineFeature,
    UnorderedListFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Tenants } from '@/collections/Tenants'
import { Users } from '@/collections/Users'
import { Footer } from '@/globals/Footer'
import { Header } from '@/globals/Header'
import { plugins } from './plugins'
import { seedMultiTenant } from '@/endpoints/seedMultiTenant'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        components: {
            // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
            // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
            beforeLogin: ['@/components/BeforeLogin#BeforeLogin'],
            // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
            // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
            beforeDashboard: ['@/components/BeforeDashboard#BeforeDashboard'],
            // Custom branding - white label
            graphics: {
                Icon: '/graphics/Icon/index.tsx#Icon',
                Logo: '/graphics/Logo/index.tsx#Logo',
            },
        },
        // Custom metadata for white labeling
        meta: {
            description: 'Your custom e-commerce admin panel',
            icons: [
                {
                    type: 'image/svg+xml',
                    rel: 'icon',
                    url: '/assets/favicon.svg',
                },
            ],
            openGraph: {
                description: 'Manage your e-commerce store with ease',
                images: [
                    {
                        height: 630,
                        url: '/assets/ogImage.png',
                        width: 1200,
                    },
                ],
                title: 'Your Brand - Admin Panel',
            },
            titleSuffix: ' - Your Brand',
        },
        user: Users.slug,
    },
    collections: [Users, Tenants, Pages, Categories, Media],
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI || '',
        },
        // Use 'ecommerce' schema to isolate PayloadCMS tables from other applications
        schemaName: 'ecommerce',
    }),
    editor: lexicalEditor({
        features: () => {
            return [
                UnderlineFeature(),
                BoldFeature(),
                ItalicFeature(),
                OrderedListFeature(),
                UnorderedListFeature(),
                LinkFeature({
                    enabledCollections: ['pages'],
                    fields: ({ defaultFields }) => {
                        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
                            if ('name' in field && field.name === 'url') return false
                            return true
                        })

                        return [
                            ...defaultFieldsWithoutUrl,
                            {
                                name: 'url',
                                type: 'text',
                                admin: {
                                    condition: ({ linkType }) => linkType !== 'internal',
                                },
                                label: ({ t }) => t('fields:enterURL'),
                                required: true,
                            },
                        ]
                    },
                }),
                IndentFeature(),
                EXPERIMENTAL_TableFeature(),
            ]
        },
    }),
    //email: nodemailerAdapter(),
    endpoints: [seedMultiTenant],
    globals: [Header, Footer],
    plugins: [
        ...plugins,
        // storage-adapter-placeholder
        supabaseAdapter({
            collections: {
                media: true, // Enable for media collection
            },
            bucket: 'media',
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
            supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        }),
    ],
    secret: process.env.PAYLOAD_SECRET || '',
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    // Sharp is now an optional dependency -
    // if you want to resize images, crop, set focal point, etc.
    // make sure to install it and pass it to the config.
    sharp,
})
