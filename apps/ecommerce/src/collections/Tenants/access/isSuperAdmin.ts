import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

export const isSuperAdminAccess = ({ req: { user } }: AccessArgs<User>): boolean => {
    return Boolean(user?.roles?.includes('super-admin' as any))
}

export const isSuperAdmin = (user?: User | null): boolean => {
    return Boolean(user?.roles?.includes('super-admin' as any))
}
