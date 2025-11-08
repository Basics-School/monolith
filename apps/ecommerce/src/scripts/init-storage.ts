/**
 * Initialize Supabase Storage Buckets
 * Run this script once to set up the required storage buckets
 *
 * Usage: node --loader ts-node/esm src/scripts/init-storage.ts
 * Or add to package.json: "init-storage": "node --loader ts-node/esm src/scripts/init-storage.ts"
 */

import { SupabaseStorageService } from '../lib/storage'

async function initStorage() {
    console.log('🚀 Initializing Supabase Storage...\n')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
        console.error('❌ Missing required environment variables:')
        console.error('   - NEXT_PUBLIC_SUPABASE_URL')
        console.error('   - NEXT_PUBLIC_SUPABASE_ANON_KEY')
        console.error('   - SUPABASE_SERVICE_ROLE_KEY')
        process.exit(1)
    }

    const storageService = new SupabaseStorageService({
        url: supabaseUrl,
        anonKey: anonKey,
        serviceRoleKey: serviceRoleKey,
    })

    // Create media bucket
    console.log('📦 Creating "media" bucket...')
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

    if (mediaBucketResult.success) {
        console.log('✅ Media bucket created successfully')
    } else if (mediaBucketResult.error?.includes('already exists')) {
        console.log('ℹ️  Media bucket already exists')
    } else {
        console.error('❌ Failed to create media bucket:', mediaBucketResult.error)
    }

    console.log('\n✨ Storage initialization complete!')
    console.log('\n📝 Next steps:')
    console.log('1. Set up RLS policies in Supabase Dashboard (see SUPABASE_STORAGE.md)')
    console.log('2. Update your Payload CMS config to use the Supabase adapter')
    console.log('3. Start uploading files!\n')
}

// Run initialization
initStorage().catch((error) => {
    console.error('❌ Initialization failed:', error)
    process.exit(1)
})
