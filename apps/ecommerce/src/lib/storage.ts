/**
 * Storage service for uploading files to Supabase Storage using REST API
 * No Supabase SDK required - pure REST API implementation
 */

interface SupabaseStorageConfig {
    url: string
    anonKey: string
    serviceRoleKey?: string
}

interface UploadResponse {
    success: boolean
    data?: {
        path: string
        id: string
        fullPath: string
        publicUrl?: string
    }
    error?: string
}

class SupabaseStorageService {
    private config: SupabaseStorageConfig

    constructor(config: SupabaseStorageConfig) {
        this.config = config
    }

    /**
     * Upload a file to Supabase Storage
     */
    async uploadFile(
        bucket: string,
        path: string,
        file: File | Buffer,
        options: {
            upsert?: boolean
            cacheControl?: string
            contentType?: string
            duplex?: string
            useServiceRole?: boolean
        } = {},
    ): Promise<UploadResponse> {
        try {
            const {
                upsert = false,
                cacheControl = '3600',
                contentType = file instanceof File ? file.type : 'application/octet-stream',
                useServiceRole = false,
            } = options

            // Use service role key for server-side uploads, anon key for client-side
            const authKey =
                useServiceRole && this.config.serviceRoleKey
                    ? this.config.serviceRoleKey
                    : this.config.anonKey

            // Prepare headers
            const headers: Record<string, string> = {
                Authorization: `Bearer ${authKey}`,
                'x-upsert': upsert.toString(),
            }

            if (cacheControl) {
                headers['cache-control'] = cacheControl
            }

            if (contentType) {
                headers['content-type'] = contentType
            }

            // Create the upload URL
            const uploadUrl = `${this.config.url}/storage/v1/object/${bucket}/${path}`

            // Convert Buffer to Blob for fetch API compatibility
            const body = Buffer.isBuffer(file) ? new Blob([new Uint8Array(file)]) : file

            // Upload the file
            const response = await fetch(uploadUrl, {
                method: 'POST',
                headers,
                body: body,
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                return {
                    success: false,
                    error:
                        errorData.error?.message ||
                        `Upload failed with status ${response.status}`,
                }
            }

            const data = await response.json()

            // Construct the full public URL (not relative path)
            // Ensure config.url doesn't have trailing slash
            const baseUrl = this.config.url.replace(/\/$/, '')
            const publicUrl = `${baseUrl}/storage/v1/object/public/${bucket}/${path}`

            return {
                success: true,
                data: {
                    path,
                    id: data.Id || data.id,
                    fullPath: data.Key || `${bucket}/${path}`,
                    publicUrl,
                },
            }
        } catch (error) {
            console.error('Storage upload error:', error)
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown upload error',
            }
        }
    }

    /**
     * Delete a file from Supabase Storage
     */
    async deleteFile(
        bucket: string,
        paths: string[],
        options: { useServiceRole?: boolean } = {},
    ): Promise<UploadResponse> {
        try {
            const { useServiceRole = false } = options

            // Use service role key for server-side deletes, anon key for client-side
            const authKey =
                useServiceRole && this.config.serviceRoleKey
                    ? this.config.serviceRoleKey
                    : this.config.anonKey

            const deleteUrl = `${this.config.url}/storage/v1/object/${bucket}`

            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${authKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prefixes: paths }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                return {
                    success: false,
                    error:
                        errorData.error?.message ||
                        `Delete failed with status ${response.status}`,
                }
            }

            return {
                success: true,
            }
        } catch (error) {
            console.error('Storage delete error:', error)
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown delete error',
            }
        }
    }

    /**
     * Generate a unique file path for uploading
     */
    generateFilePath(prefix: string, file: File): string {
        const timestamp = Date.now()
        const randomString = Math.random().toString(36).substring(2)
        const extension = file.name.split('.').pop() || 'webp'

        return `${prefix}/${timestamp}-${randomString}.${extension}`
    }

    /**
     * Create bucket (requires service role key)
     */
    async createBucket(
        id: string,
        options: {
            public?: boolean
            allowedMimeTypes?: string[]
            fileSizeLimit?: number
        } = {},
    ): Promise<UploadResponse> {
        try {
            if (!this.config.serviceRoleKey) {
                return {
                    success: false,
                    error: 'Service role key required for bucket creation',
                }
            }

            const createUrl = `${this.config.url}/storage/v1/bucket`

            const response = await fetch(createUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.config.serviceRoleKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    name: id,
                    public: options.public || false,
                    allowed_mime_types: options.allowedMimeTypes || [],
                    file_size_limit: options.fileSizeLimit || 52428800, // 50MB default
                }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                return {
                    success: false,
                    error:
                        errorData.error?.message ||
                        `Bucket creation failed with status ${response.status}`,
                }
            }

            const data = await response.json()

            return {
                success: true,
                data: {
                    path: id,
                    id: data.name,
                    fullPath: data.name,
                },
            }
        } catch (error) {
            console.error('Bucket creation error:', error)
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : 'Unknown bucket creation error',
            }
        }
    }
}

// Lazy storage service instance getter (only used server-side)
// This prevents accessing server-side env vars during client-side module evaluation
let _storageService: SupabaseStorageService | null = null

function getStorageService(): SupabaseStorageService {
    if (!_storageService) {
        _storageService = new SupabaseStorageService({
            url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
            anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        })
    }
    return _storageService
}

// Export as storageService for backward compatibility
export const storageService = new Proxy({} as SupabaseStorageService, {
    get: (target, prop) => {
        const service = getStorageService()
        const value = service[prop as keyof SupabaseStorageService]
        return typeof value === 'function' ? value.bind(service) : value
    },
})

/**
 * Get public URL from storage path
 * Use this helper to construct public URLs from stored paths
 * @param path - The storage path (e.g., "products/123-abc.webp" or "media/products/123-abc.webp")
 * @param bucket - Optional bucket name (defaults to "media")
 */
export function getPublicUrl(
    path: string | null | undefined,
    bucket = 'media',
): string | null {
    if (!path) return null

    // If path already contains the full URL, return it as is (for backward compatibility during migration)
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path
    }

    // Remove bucket prefix if it exists in the path
    const cleanPath = path.startsWith(`${bucket}/`) ? path : `${bucket}/${path}`

    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    return `${baseUrl}/storage/v1/object/public/${cleanPath}`
}

/**
 * Extract storage path from full URL or return path as is
 * Use this to normalize paths before saving to database
 * @param pathOrUrl - Either a full URL or just the path
 */
export function extractStoragePath(
    pathOrUrl: string | null | undefined,
): string | null {
    if (!pathOrUrl) return null

    // If it's already just a path (no protocol), return it
    if (!pathOrUrl.startsWith('http://') && !pathOrUrl.startsWith('https://')) {
        return pathOrUrl
    }

    // Extract path from full URL
    // URL format: http://localhost:8000/storage/v1/object/public/media/products/123.webp
    // We want: products/123.webp (without the bucket name)
    const match = pathOrUrl.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)$/)
    if (match && match[1]) {
        return match[1]
    }

    return pathOrUrl
}

export { SupabaseStorageService }
export type { UploadResponse }
