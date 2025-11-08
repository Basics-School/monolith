/**
 * Supabase Storage Plugin for Payload CMS
 * Implements the Payload storage plugin interface using Supabase Storage REST API
 */

import type { CollectionConfig, Plugin } from 'payload'
import path from 'path'
import { SupabaseStorageService } from './storage'

interface SupabaseStoragePluginArgs {
    collections: {
        [collectionSlug: string]:
        | boolean
        | {
            prefix?: string
        }
    }
    bucket: string
    supabaseUrl: string
    supabaseAnonKey: string
    supabaseServiceRoleKey?: string
}

export const supabaseAdapter = (pluginOptions: SupabaseStoragePluginArgs): Plugin => {
    return (incomingConfig) => {
        const config = { ...incomingConfig }

        const storageService = new SupabaseStorageService({
            url: pluginOptions.supabaseUrl,
            anonKey: pluginOptions.supabaseAnonKey,
            serviceRoleKey: pluginOptions.supabaseServiceRoleKey,
        })

        // Modify collections that have uploads enabled
        config.collections = (config.collections || []).map((collection) => {
            if (!pluginOptions.collections[collection.slug]) {
                return collection
            }

            // Only apply to collections with upload enabled
            if (!collection.upload) {
                return collection
            }

            const collectionOptions = typeof pluginOptions.collections[collection.slug] === 'object'
                ? pluginOptions.collections[collection.slug]
                : {}

            const prefix = (collectionOptions as any).prefix || collection.slug

            // Add beforeChange hook to handle uploads
            const originalBeforeChange = collection.hooks?.beforeChange || []
            const beforeChangeHooks = Array.isArray(originalBeforeChange) ? originalBeforeChange : [originalBeforeChange]

            return {
                ...collection,
                upload: {
                    ...(typeof collection.upload === 'object' ? collection.upload : {}),
                    disableLocalStorage: true,
                    adminThumbnail: ({ doc }: any) => doc?.url || '',
                },
                hooks: {
                    ...collection.hooks,
                    beforeChange: [
                        ...beforeChangeHooks,
                        async ({ req, data, operation }: any) => {
                            // Only handle on create or when file is being uploaded
                            if (operation !== 'create' && operation !== 'update') {
                                return data
                            }

                            // Check if there's a file in the request
                            const file = req.file || (req as any).files?.file

                            if (!file) {
                                return data
                            }

                            try {
                                // Generate a unique filename
                                const timestamp = Date.now()
                                const randomString = Math.random().toString(36).substring(2, 8)
                                const extension = path.extname(file.name || file.filename || '')
                                const basename = path.basename(file.name || file.filename || 'file', extension)
                                const sanitizedBasename = basename.replace(/[^a-z0-9]/gi, '-').toLowerCase()
                                const uniqueFilename = `${sanitizedBasename}-${timestamp}-${randomString}${extension}`
                                const filePath = `${prefix}/${uniqueFilename}`

                                // Get file buffer
                                const buffer = file.data || file.buffer

                                if (!buffer) {
                                    console.error('No file buffer found')
                                    return data
                                }

                                // Convert buffer to Blob for upload
                                const fileBlob = new Blob([new Uint8Array(buffer)], {
                                    type: file.mimetype || file.mimeType || 'application/octet-stream',
                                }) as any

                                // Upload to Supabase Storage
                                const uploadResult = await storageService.uploadFile(
                                    pluginOptions.bucket,
                                    filePath,
                                    fileBlob,
                                    {
                                        upsert: false,
                                        cacheControl: '31536000',
                                        contentType: file.mimetype || file.mimeType,
                                        useServiceRole: true,
                                    },
                                )

                                if (!uploadResult.success) {
                                    throw new Error(uploadResult.error || 'Failed to upload file to Supabase Storage')
                                }

                                // Return the modified data with storage info
                                return {
                                    ...data,
                                    filename: uniqueFilename,
                                    url: uploadResult.data?.publicUrl,
                                    mimeType: file.mimetype || file.mimeType,
                                    filesize: file.size || file.filesize,
                                }
                            } catch (error) {
                                console.error('Supabase upload error:', error)
                                throw error
                            }
                        },
                    ],
                },
            } as any
        })

        return config
    }
}
