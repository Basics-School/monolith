import type { Access } from 'payload'

import { getUserTenantIDs } from '@/utilities/getUserTenantIDs'
import { isSuperAdmin } from './isSuperAdmin'

export const updateAndDeleteAccess: Access = ({ req: { user } }) => {
    if (!user) return false

    if (isSuperAdmin(user)) {
        return true
    }

    const userTenantIDs = getUserTenantIDs(user)

    return {
        id: {
            in: userTenantIDs,
        },
    }
}
