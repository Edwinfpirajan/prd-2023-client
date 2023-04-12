import { Role, RoleNames } from './roles.type'

export class User {
    id?: string
    username?: string
    password?: string
    role?: string | Role
    roleFields?: RoleFields
    email?: string
    phone?: string
    booth?: string
    sections?: string[]
    assignedSections?: string[]
    name?: Name
    referrer?: string
    birthday?: Date
    payment?: number
    ine?: INE
    pending?: boolean
    status?: boolean
    unsaculated?: boolean
    createdAt?: Date
    updatedAt?: Date
    createdBy?: string
    updatedBy?: string
}

export class INE {
    tipo?: string
    subTipo?: string
    claveElector?: string
    sexo?: string
    curp?: string
    registro?: string
    seccion?: string
    vigencia?: string
    primerApellido?: string
    segundoApellido?: string
    nombres?: string
    calle?: string
    colonia?: string
    ciudad?: string
    fechaNacimiento?: string
    emision?: string
    codigoValidacion?: string
    mrz?: string
    cic?: string
    ocr?: string
    identificadorCiudadano?: string
    validacionMRZ?: MRZValidation
    estatus?: string
}

export class MRZValidation {
    fechaNacimiento?: string
    sexo?: string
    vigencia?: string
    emision?: string
    nombre?: string
}

export class Name {
    first?: string
    paternal?: string
    maternal?: string
}

export class Permissions {
    [key: string]: {
        create?: boolean
        update?: boolean
        read?: boolean
        delete?: boolean
    }
}

class RoleFields {
    localDistrictDestination: string
    municipalityDestination: string
    email: string
    phone: string
    municipalityDestinations: string[]
    sectionDestination: string
    assignedBooth: string
    assignedSections: string
    representativeStatus: string
    zoneCoordinator: string
    districtCoordinator: string
    districtCoordinators: string[]
    current: string
    route: string
    referrer: string
    district: string
}