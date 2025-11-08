import type { Endpoint } from 'payload'

export const seedMultiTenant: Endpoint = {
    path: '/seed-multi-tenant',
    method: 'get',
    handler: async (req) => {
        const { payload } = req

        try {
            // Create tenants
            const tenant1 = await payload.create({
                collection: 'tenants' as any,
                data: {
                    name: 'Gold Store',
                    slug: 'gold-store',
                    domain: 'gold.localhost',
                    allowPublicRead: true,
                } as any,
            })

            const tenant2 = await payload.create({
                collection: 'tenants' as any,
                data: {
                    name: 'Silver Store',
                    slug: 'silver-store',
                    domain: 'silver.localhost',
                    allowPublicRead: true,
                } as any,
            })

            const tenant3 = await payload.create({
                collection: 'tenants' as any,
                data: {
                    name: 'Bronze Store',
                    slug: 'bronze-store',
                    domain: 'bronze.localhost',
                    allowPublicRead: false,
                } as any,
            })

            // Create super admin user
            const superAdmin = await payload.create({
                collection: 'users',
                data: {
                    email: 'superadmin@example.com',
                    password: 'test123',
                    name: 'Super Admin',
                    roles: ['super-admin'] as any,
                } as any,
            })

            // Create tenant-specific admin users
            const tenant1Admin = await payload.create({
                collection: 'users',
                data: {
                    email: 'admin@gold-store.com',
                    password: 'test123',
                    name: 'Gold Store Admin',
                    roles: ['admin'],
                    tenants: [
                        {
                            tenant: tenant1.id,
                            roles: ['tenant-admin'],
                        },
                    ],
                } as any,
            })

            const tenant2Admin = await payload.create({
                collection: 'users',
                data: {
                    email: 'admin@silver-store.com',
                    password: 'test123',
                    name: 'Silver Store Admin',
                    roles: ['admin'],
                    tenants: [
                        {
                            tenant: tenant2.id,
                            roles: ['tenant-admin'],
                        },
                    ],
                } as any,
            })

            // Create multi-tenant admin (access to multiple tenants)
            const multiTenantAdmin = await payload.create({
                collection: 'users',
                data: {
                    email: 'multiadmin@example.com',
                    password: 'test123',
                    name: 'Multi-Tenant Admin',
                    roles: ['admin'],
                    tenants: [
                        {
                            tenant: tenant1.id,
                            roles: ['tenant-admin'],
                        },
                        {
                            tenant: tenant2.id,
                            roles: ['tenant-admin'],
                        },
                        {
                            tenant: tenant3.id,
                            roles: ['tenant-viewer'],
                        },
                    ],
                } as any,
            })

            // Create tenant-specific customer
            const customer1 = await payload.create({
                collection: 'users',
                data: {
                    email: 'customer@gold-store.com',
                    password: 'test123',
                    name: 'Gold Store Customer',
                    roles: ['customer'],
                    tenants: [
                        {
                            tenant: tenant1.id,
                            roles: ['tenant-viewer'],
                        },
                    ],
                } as any,
            })

            return Response.json({
                message: 'Multi-tenant seed data created successfully',
                data: {
                    tenants: [
                        { id: tenant1.id, name: (tenant1 as any).name, slug: (tenant1 as any).slug },
                        { id: tenant2.id, name: (tenant2 as any).name, slug: (tenant2 as any).slug },
                        { id: tenant3.id, name: (tenant3 as any).name, slug: (tenant3 as any).slug },
                    ],
                    users: [
                        { id: superAdmin.id, email: superAdmin.email, roles: superAdmin.roles },
                        { id: tenant1Admin.id, email: tenant1Admin.email, roles: tenant1Admin.roles },
                        { id: tenant2Admin.id, email: tenant2Admin.email, roles: tenant2Admin.roles },
                        { id: multiTenantAdmin.id, email: multiTenantAdmin.email, roles: multiTenantAdmin.roles },
                        { id: customer1.id, email: customer1.email, roles: customer1.roles },
                    ],
                },
            })
        } catch (error: any) {
            return Response.json(
                {
                    error: error.message,
                },
                { status: 500 },
            )
        }
    },
}
