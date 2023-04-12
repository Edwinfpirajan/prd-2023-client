export type RoleNames = 'Roles/ADMIN' | 'Roles/CC_OPERATOR' | 'Roles/DISTRICT_COORDINATOR' | 'Roles/EE_OPERATOR' | 'Roles/GENERAL_REPRESENTATIVE' | 'Roles/POLLING_STATION_REPRESENTATIVE' | 'Roles/REFERRER' | 'Roles/ZONE_COORDINATOR' | 'Roles/SUPERVISOR' | 'Roles/GUEST'

export type Permission = 'SELF' | 'GUESTS' | 'POLLING_STATION_REPRESENTATIVE' | 'GENERAL_REPRESENTATIVE' | 'ZONE_COORDINATOR' | 'REFERRER' | 'DISTRICT_COORDINATOR' | 'SUPERVISOR' | 'CC_OPERATOR' | 'EE_OPERATOR' | 'ADMINISTRATOR'

export type Action = 'create' | 'read' | 'update' | 'delete'

export interface Role {
    id: RoleNames
    name: string
    permissions: Permissions
    status: boolean
}

export interface Permissions {
    SELF: Administrator
    GUESTS: Administrator
    POLLING_STATION_REPRESENTATIVE: Administrator
    GENERAL_REPRESENTATIVE: Administrator
    ZONE_COORDINATOR: Administrator
    REFERRER: Administrator
    DISTRICT_COORDINATOR: Administrator
    SUPERVISOR: Administrator
    CC_OPERATOR: Administrator
    EE_OPERATOR: Administrator
    ADMINISTRATOR: Administrator
}

export interface Administrator {
    create: boolean
    read: boolean
    update: boolean
    delete: boolean
}