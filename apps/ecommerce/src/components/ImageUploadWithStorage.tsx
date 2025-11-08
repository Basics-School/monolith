'use client'

import * as React from 'react'
import { uploadMediaFile, deleteMediaFile } from '@/actions/storage'
import { extractStoragePath } from '@/lib/storage'

interface ImageUploadWithStorageProps {
    value?: string // URL or path
    onValueChange?: (url: string | undefined) => void
    type?: 'products' | 'media' | 'categories' | 'pages'
    disabled?: boolean
    accept?: string
    maxSize?: number // in MB
    className?: string
}

export function ImageUploadWithStorage({
    value,
    onValueChange,
    type = 'media',
    disabled = false,
    accept = 'image/*',
    maxSize = 5,
    className,
}: ImageUploadWithStorageProps) {
    const [file, setFile] = React.useState<File | undefined>(undefined)
    const [isUploading, setIsUploading] = React.useState(false)
    const [currentPath, setCurrentPath] = React.useState<string | undefined>(
        value ? extractStoragePath(value) || undefined : undefined,
    )
    const [error, setError] = React.useState<string | undefined>()
    const [preview, setPreview] = React.useState<string | undefined>(value)

    // Handle file selection
    const handleFileChange = React.useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = event.target.files?.[0]
            if (!selectedFile) return

            // Validate file size
            if (selectedFile.size > maxSize * 1024 * 1024) {
                setError(`File size must be less than ${maxSize}MB`)
                return
            }

            setError(undefined)
            setFile(selectedFile)

            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(selectedFile)

            // Upload immediately
            setIsUploading(true)
            try {
                const formData = new FormData()
                formData.append('file', selectedFile)
                formData.append('type', type)

                const result = await uploadMediaFile(formData)

                if (!result.success) {
                    setError(result.error || 'Failed to upload image')
                    setPreview(value) // Revert to original
                    return
                }

                if (result.data) {
                    // Delete old image if exists
                    if (currentPath && currentPath !== result.data.path) {
                        try {
                            await deleteMediaFile(currentPath)
                        } catch (error) {
                            console.error('Failed to delete old image:', error)
                        }
                    }

                    setFile(selectedFile)
                    setCurrentPath(result.data.path)
                    setPreview(result.data.url)
                    onValueChange?.(result.data.url || undefined)
                }
            } catch (error) {
                console.error('Upload error:', error)
                setError('An error occurred while uploading the image')
                setPreview(value) // Revert to original
            } finally {
                setIsUploading(false)
            }
        },
        [currentPath, onValueChange, type, maxSize, value],
    )

    // Handle file removal
    const handleRemove = React.useCallback(async () => {
        if (currentPath) {
            setIsUploading(true)
            try {
                await deleteMediaFile(currentPath)
            } catch (error) {
                console.error('Failed to delete image:', error)
            } finally {
                setIsUploading(false)
            }
        }

        setFile(undefined)
        setCurrentPath(undefined)
        setPreview(undefined)
        onValueChange?.(undefined)
    }, [currentPath, onValueChange])

    return (
        <div className={ className }>
            <div className="space-y-4">
                { preview ? (
                    <div className="relative inline-block">
                        <img
                            src={ preview }
                            alt="Preview"
                            className="h-48 w-48 object-cover rounded-lg border"
                        />
                        { !disabled && (
                            <button
                                type="button"
                                onClick={ handleRemove }
                                disabled={ isUploading }
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 disabled:opacity-50"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        ) }
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer inline-flex flex-col items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-400 mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={ 2 }
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            <span className="text-sm text-gray-600">
                                { isUploading ? 'Uploading...' : 'Click to upload' }
                            </span>
                            <span className="text-xs text-gray-500 mt-1">Max { maxSize }MB</span>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept={ accept }
                            onChange={ handleFileChange }
                            disabled={ disabled || isUploading }
                            className="hidden"
                        />
                    </div>
                ) }

                { error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{ error }</div>
                ) }

                { isUploading && (
                    <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
                        Uploading...
                    </div>
                ) }
            </div>
        </div>
    )
}
