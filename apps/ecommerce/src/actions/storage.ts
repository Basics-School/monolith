'use server'

import { storageService, getPublicUrl, extractStoragePath } from '@/lib/storage'

export interface ImageUploadResult {
    success: boolean
    url?: string
    error?: string
    data?: {
        path: string
        url: string
    }
}

/**
 * Upload product image to Supabase Storage
 */
export async function uploadProductImage(
    formData: FormData,
): Promise<ImageUploadResult> {
    try {
        const file = formData.get('file') as File

        if (!file || !file.type.startsWith('image/')) {
            return {
                success: false,
                error: 'Please provide a valid image file',
            }
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024
        if (file.size > maxSize) {
            return {
                success: false,
                error: 'File size must be less than 5MB',
            }
        }

        // Generate a unique path for the product image
        const filePath = storageService.generateFilePath('products', file)

        // Upload to Supabase Storage using service role key for server-side upload
        const uploadResult = await storageService.uploadFile('media', filePath, file, {
            upsert: true,
            cacheControl: '31536000', // 1 year cache
            contentType: file.type,
            useServiceRole: true,
        })

        if (!uploadResult.success) {
            return {
                success: false,
                error: uploadResult.error || 'Failed to upload image',
            }
        }

        // Get public URL
        const publicUrl = getPublicUrl(uploadResult.data?.path, 'media')

        // Return only the path for portability
        return {
            success: true,
            url: uploadResult.data?.path,
            data: {
                path: uploadResult.data?.path || '',
                url: publicUrl || '',
            },
        }
    } catch (error) {
        console.error('Image upload error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown upload error',
        }
    }
}

/**
 * Upload media file (image or document) for general use
 */
export async function uploadMediaFile(formData: FormData): Promise<ImageUploadResult> {
    try {
        const file = formData.get('file') as File
        const type = (formData.get('type') as string) || 'media'

        if (!file) {
            return {
                success: false,
                error: 'No file provided',
            }
        }

        // Validate file type - allow images and PDFs
        const isImage = file.type.startsWith('image/')
        const isPDF = file.type === 'application/pdf'
        if (!isImage && !isPDF) {
            return {
                success: false,
                error: 'Please provide an image or PDF file',
            }
        }

        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024
        if (file.size > maxSize) {
            return {
                success: false,
                error: 'File size must be less than 10MB',
            }
        }

        // Generate unique file path
        const filePath = storageService.generateFilePath(type, file)

        // Upload file
        const uploadResult = await storageService.uploadFile('media', filePath, file, {
            upsert: true,
            cacheControl: '31536000',
            contentType: file.type,
            useServiceRole: true,
        })

        if (!uploadResult.success) {
            return {
                success: false,
                error: uploadResult.error || 'Failed to upload file',
            }
        }

        // Get public URL
        const publicUrl = getPublicUrl(uploadResult.data?.path, 'media')

        return {
            success: true,
            url: uploadResult.data?.path,
            data: {
                path: uploadResult.data?.path || '',
                url: publicUrl || '',
            },
        }
    } catch (error) {
        console.error('File upload error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Upload failed',
        }
    }
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteMediaFile(imagePath: string): Promise<ImageUploadResult> {
    try {
        if (!imagePath) {
            return {
                success: false,
                error: 'No image path provided',
            }
        }

        // Extract the path from the URL if it's a full URL
        const filePath = extractStoragePath(imagePath) || imagePath

        const deleteResult = await storageService.deleteFile('media', [filePath], {
            useServiceRole: true,
        })

        if (!deleteResult.success) {
            return {
                success: false,
                error: deleteResult.error || 'Failed to delete file',
            }
        }

        return {
            success: true,
        }
    } catch (error) {
        console.error('File delete error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown delete error',
        }
    }
}

/**
 * Initialize storage buckets if they don't exist
 */
export async function initializeStorageBuckets() {
    try {
        // Create media bucket for all uploads
        const mediaBucketResult = await storageService.createBucket('media', {
            public: true,
            allowedMimeTypes: [
                'image/jpeg',
                'image/png',
                'image/webp',
                'image/gif',
                'image/svg+xml',
                'application/pdf',
            ],
            fileSizeLimit: 10485760, // 10MB
        })

        if (
            !mediaBucketResult.success &&
            !mediaBucketResult.error?.includes('already exists')
        ) {
            console.error('Failed to create media bucket:', mediaBucketResult.error)
        } else {
            console.log('Media bucket initialized successfully')
        }

        return {
            success: true,
            message: 'Storage buckets initialized',
        }
    } catch (error) {
        console.error('Storage initialization error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to initialize storage',
        }
    }
}
