import type { User } from '@/payload-types'

/**
 * Get all tenant IDs that a user has access to
 */
export const getUserTenantIDs = (user?: User | null): (number | string)[] => {
    if (!user) return []

    const tenants: any[] = (user as any).tenants || []

    return tenants
        .map((tenantRow: any) => {
            if (!tenantRow || typeof tenantRow !== 'object') return null
            const tenant = tenantRow.tenant
            if (!tenant) return null
            if (typeof tenant === 'object') return tenant.id
            return tenant
        })
        .filter((id): id is number | string => id !== null)
}
