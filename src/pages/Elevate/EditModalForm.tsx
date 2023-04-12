import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { User } from '../../common/types/user.type'
import humanPassword from 'human-password'

const roleFields = {
    'GUEST': ["REFERRER"],
    'POLLING_STATION_REPRESENTATIVE': ["USERNAME", "PASSWORD", "PHONE_NUMBER", "EMAIL", "LOCAL_DISTRICT_DESTINATION", "MUNICIPALITY_DESTINATION", "SECTION_DESTINATION", "ASSIGNED_BOOTH", "REPRESENTATIVE_STATUS", "ZONE_COORDINATOR", "REFERRER", "DISTRICT_COORDINATOR", "CURRENT"],
    'GENERAL_REPRESENTATIVE': ["USERNAME", "PASSWORD", "PHONE_NUMBER", "EMAIL", "LOCAL_DISTRICT_DESTINATION", "MUNICIPALITY_DESTINATION", "ASSIGNED_SECTIONS", "ROUTE", "ZONE_COORDINATOR", "REFERRER", "DISTRICT_COORDINATOR", "CURRENT"],
    'ZONE_COORDINATOR': ["USERNAME", "PASSWORD", "PHONE_NUMBER", "EMAIL", "LOCAL_DISTRICT_DESTINATION", "MUNICIPALITY_DESTINATIONS", "DISTRICT_COORDINATORS", "ASSIGNED_SECTIONS", "DISTRICT_COORDINATOR", "CURRENT"],
    'REFERRER': ["USERNAME", "PASSWORD", "PHONE_NUMBER", "EMAIL", "LOCAL_DISTRICT_DESTINATION", "MUNICIPALITY_DESTINATIONS", "DISTRICT_COORDINATORS", "ASSIGNED_SECTIONS", "DISTRICT_COORDINATOR", "CURRENT"],
    'DISTRICT_COORDINATOR': ["USERNAME", "PASSWORD", "PHONE_NUMBER", "EMAIL", "DISTRICT", "CURRENT"],
    'SUPERVISOR': ["USERNAME", "PASSWORD", "PHONE_NUMBER", "EMAIL"],
    'CC_OPERATOR': ["USERNAME", "PASSWORD", "PHONE_NUMBER", "EMAIL"],
    'EE_OPERATOR': ["USERNAME", "PASSWORD", "PHONE_NUMBER", "EMAIL"],
    'ADMIN': ["USERNAME", "PASSWORD", "PHONE_NUMBER", "EMAIL"],
}

const EditModalForm = ({ user, role, close, setUsers }: { user: User, role: string, close: () => void, setUsers: () => void }) => {
    const availableFields = roleFields[role] || []

    const [username, setUsername] = useState(user.username || humanPassword({ couples: 1, digits: 4 }).toUpperCase())
    const [password, setPassword] = useState(humanPassword({ couples: 1, digits: 4 }).toUpperCase())
    const [phone, setPhone] = useState(user.roleFields?.phone || user.phone || '')
    const [email, setEmail] = useState(user.roleFields?.email || user.email || '')
    const [referrer, setReferrer] = useState(user.roleFields.referrer || '')
    const [localDistrictDestination, setLocalDistrictDestination] = useState(user.roleFields.localDistrictDestination || '')
    const [municipalityDestination, setMunicipalityDestination] = useState(user.roleFields.municipalityDestination || '')
    const [municipalityDestinations, setMunicipalityDestinations] = useState(user.roleFields.municipalityDestinations || '')
    const [sectionDestination, setSectionDestination] = useState(user.roleFields.sectionDestination || '')
    const [assignedBooth, setAssignedBooth] = useState(user.roleFields.assignedBooth || '')
    const [assignedSections, setAssignedSections] = useState(user.roleFields.assignedSections || '')
    const [representativeStatus, setRepresentativeStatus] = useState(user.roleFields.representativeStatus || '')
    const [zoneCoordinator, setZoneCoordinator] = useState(user.roleFields.zoneCoordinator || '')
    const [districtCoordinator, setDistrictCoordinator] = useState(user.roleFields.districtCoordinator || '')
    const [districtCoordinators, setDistrictCoordinators] = useState(user.roleFields.districtCoordinators || '')
    const [current, setCurrent] = useState(user.roleFields.current || '')
    const [route, setRoute] = useState(user.roleFields.route || '')
    const [district, setDistrict] = useState(user.roleFields.district || '')

    const renderField = (fieldName: string) => {
        switch (fieldName) {
            case "USERNAME":
                return (
                    <label>
                        Nombre de Usuario:
                        <input type="text" disabled name="username" onChange={ e => setUsername(e.currentTarget.value) } value={ username } />
                    </label>
                )
            case "PASSWORD":
                return (
                    <label>
                        Contraseña:
                        <input type="text" disabled name="password" onChange={ e => setPassword(e.currentTarget.value) } value={ password } />
                    </label>
                )
            case "REFERRER":

                return (
                    <label>
                        Referente:
                        <input type="text" name="referrer" onChange={ e => setReferrer(e.currentTarget.value) } value={ referrer } />
                    </label>
                )
            case "PHONE_NUMBER":
                return (
                    <label>
                        Teléfono:
                        <input type="text" name="phone-number" onChange={ e => setPhone(e.currentTarget.value) } value={ phone } />
                    </label>
                )
            case "EMAIL":
                return (
                    <label>
                        Correo Electrónico:
                        <input type="email" name="email" onChange={ e => setEmail(e.currentTarget.value) } value={ email } />
                    </label>
                )
            case "LOCAL_DISTRICT_DESTINATION":
                return (
                    <label>
                        Distrito Local Destino:
                        <input type="text" name="local-district-destination" onChange={ e => setLocalDistrictDestination(e.currentTarget.value) } value={ localDistrictDestination } />
                    </label>
                )
            case "MUNICIPALITY_DESTINATION":
                return (
                    <label>
                        Municipio Destino:
                        <input type="text" name="municipality-destination" onChange={ e => setMunicipalityDestination(e.currentTarget.value) } value={ municipalityDestination } />
                    </label>
                )
            case "MUNICIPALITY_DESTINATIONS":
                return (
                    <label>
                        Municipios Destino:
                        <input type="text" name="municipality-destinations" onChange={ e => setMunicipalityDestinations(e.currentTarget.value) } value={ municipalityDestinations } />
                    </label>
                )
            case "SECTION_DESTINATION":
                return (
                    <label>
                        Sección Electoral Destino:
                        <input type="text" name="section-destination" onChange={ e => setSectionDestination(e.currentTarget.value) } value={ sectionDestination } />
                    </label>
                )
            case "ASSIGNED_BOOTH":
                return (
                    <label>
                        Casilla Asignada:
                        <input type="text" name="assigned-booth" onChange={ e => setAssignedBooth(e.currentTarget.value) } value={ assignedBooth } />
                    </label>
                )
            case "ASSIGNED_SECTIONS":
                

                return (
                    <label>
                        Secciones Asignadas:
                        <select multiple name="assigned-sections" onChange={ e => setAssignedSections(e.currentTarget.value) } value={ assignedSections } >
                            <option ></option>
                        </select>
                    </label>
                )
            case "REPRESENTATIVE_STATUS":
                return (
                    <label>
                        Calidad del Representante:
                        <input type="text" name="representative-status" onChange={ e => setRepresentativeStatus(e.currentTarget.value) } value={ representativeStatus } />
                    </label>
                )
            case "ZONE_COORDINATOR":
                return (
                    <label>
                        Coordinador de Zona:
                        <input type="text" name="zone-coordinator" onChange={ e => setZoneCoordinator(e.currentTarget.value) } value={ zoneCoordinator } />
                    </label>
                )
            case "DISTRICT_COORDINATOR":
                return (
                    <label>
                        Coordinador Distrital:
                        <input type="text" name="district-coordinator" onChange={ e => setDistrictCoordinator(e.currentTarget.value) } value={ districtCoordinator } />
                    </label>
                )
            case "DISTRICT_COORDINATORS":
                return (
                    <label>
                        Coordinadores Distritales:
                        <input type="text" name="district-coordinators" onChange={ e => setDistrictCoordinators(e.currentTarget.value) } value={ districtCoordinators } />
                    </label>
                )
            case "CURRENT":
                return (
                    <label>
                        Corriente:
                        <input type="text" name="current" onChange={ e => setCurrent(e.currentTarget.value) } value={ current } />
                    </label>
                )
            case "ROUTE":
                return (
                    <label>
                        Ruta:
                        <input type="text" name="route" onChange={ e => setRoute(e.currentTarget.value) } value={ route } />
                    </label>
                )
            case "DISTRICT":
                return (
                    <label>
                        Distrito:
                        <input type="text" name="district" onChange={ e => setDistrict(e.currentTarget.value) } value={ district } />
                    </label>
                )
            default:
                return null
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/users/${user.id}`, {
                username,
                password,
                role: 'Roles/' + role,
                roleFields: {
                    referrer: referrer || null,
                    phoneNumber: phone || null,
                    email: email || null,
                    localDistrictDestination: localDistrictDestination || null,
                    municipalityDestination: municipalityDestination || null,
                    municipalityDestinations: municipalityDestinations || null,
                    sectionDestination: sectionDestination || null,
                    assignedBooth: assignedBooth || null,
                    assignedSections: assignedSections || null,
                    representativeStatus: representativeStatus || null,
                    zoneCoordinator: zoneCoordinator || null,
                    districtCoordinator: districtCoordinator || null,
                    districtCoordinators: districtCoordinators || null,
                    current: current || null,
                    route: route || null,
                    district: district || null
                }
            })

            // @ts-ignore
            setUsers(s => {
                const index = s.findIndex(u => u.id === user.id)
                s[index] = data
                return s
            })

            toast('El cambio de rol se aplicó exitosamente.')

            close()
        } catch (error) {
            toast(error?.response?.data?.message)
        }
    }

    return (
        <form onSubmit={ (e) => submitHandler(e) } >
            { availableFields.map((fieldName) => (
                <div key={ fieldName }>{ renderField(fieldName) }</div>
            )) }

            <button type="submit">Enviar</button>
        </form>
    )
}


export default EditModalForm