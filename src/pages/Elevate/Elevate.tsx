import { User as UserTypes } from '@common/types/user.type'
import styles from './Elevate.module.scss'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Role, RoleNames } from '@common/types/roles.type'
import { HiInformationCircle, HiPencilSquare } from 'react-icons/hi2'
import createModal from '@components/UI/Modal'
import EditModalForm from './EditModalForm'
import { AuthContext } from '@store/AuthContext'

const Elevate = () => {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState<Role[]>([])
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [lastName, setLastName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [votersCode, setVotersCode] = useState('')

  const filterHandler = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users?name=${name}&lastName=${lastName}&middleName=${middleName}&votersCode=${votersCode}&role=${role}`)
      setUsers(data)
    } catch (error) {
      toast(error?.response?.data?.message)
    }
  }

  const resetHandler = (e) => {
    setName('')
    setLastName('')
    setMiddleName('')
    setVotersCode('')
    setRole('')
  }

  useEffect(() => {
    filterHandler()
  }, [name, lastName, middleName, votersCode, role])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/roles`)
        setRoles(data)
      } catch (error) {
        toast(error?.response?.data?.message)
      }
    })()
  }, [])

  return (
    <div className={ styles.elevate } >

      <div className={ styles.controller } >
        <h3>Filtros</h3>
        <div className={ styles.group }>
          <label htmlFor="name" >Nombre</label>
          <input onChange={ e => setName(e.currentTarget.value) } value={ name } id="name" type="text" />
          <label htmlFor="lastName" >Apellido Paterno</label>
          <input onChange={ e => setLastName(e.currentTarget.value) } value={ lastName } id="lastName" type="text" />
          <label htmlFor="middleName" >Apellido Materno</label>
          <input onChange={ e => setMiddleName(e.currentTarget.value) } value={ middleName } id="middleName" type="text" />
        </div>

        <div className={ styles.group }>
          <label htmlFor="votersCode" >Clave de Elector</label>
          <input onChange={ e => setVotersCode(e.currentTarget.value) } value={ votersCode } id="votersCode" type="text" />
          <label htmlFor="role" >Rol de Usuario</label>
          <select onChange={ e => setRole(e.currentTarget.value) } value={ role } id="role" >
            <option value="">Ningun rol seleccionado</option>
            { roles.map(r => (
              <option value={ r.id }>{ r.name }</option>
            )) }
          </select>
        </div>

        <div className={ styles.group }>
          <button type="button" onClick={ (e) => resetHandler(e) } >Limpiar</button>
        </div>
      </div>


      <div className={ styles.users }>
        {
          users.map(user => <User setUsers={ setUsers } user={ user } roles={ roles } role={ roles.find(r => r.id === user?.role).name } />)
        }
      </div>
    </div>
  )
}

const User = ({ user, roles, role, setUsers }: { user: UserTypes, roles: Role[], role: string, setUsers }) => {
  const { user: singedUser } = useContext(AuthContext)

  return (
    <div className={ styles.user }>
      <div className={ styles.votersCode } >{ user.ine.claveElector }</div>
      <div className={ styles.name } >{ user?.name?.first } { user?.name?.paternal } { user?.name?.maternal }</div>
      <div className={ styles.role } >{ user?.role ? role : 'Invitado' }</div>
      <div className={ styles.controls }>
        <div className={ styles.edit }
          onClick={ () => createModal(InfoModal, { props: { user, role } }) } ><HiInformationCircle size={ '2rem' } /></div>
        <div className={ styles.edit }
          onClick={ () => createModal(EditModal, { closeButton: true, discardChangesWarning: true, props: { singedUser, user, roles, setUsers }, }) } ><HiPencilSquare size={ '2rem' } /></div>
      </div>
    </div>
  )
}

const InfoModal = ({ user, role }: { user: UserTypes, role: RoleNames }) => {
  return (
    <div className={ styles.infoModal } >
      <div><span>Nombre:</span> { user.name.first } { user.name.paternal } { user.name.maternal }</div>
      <div><span>Clave de elector:</span> { user.ine.claveElector }</div>
      <div><span>Fecha de nacimiento:</span> { user.ine.fechaNacimiento }</div>
      <div><span>Correo electrónico:</span> { user.email }</div>
      <div><span>CURP:</span> { user.ine.curp }</div>
      <div><span>Sección de origen:</span> { user.ine.seccion }</div>
      <div><span>Teléfono:</span> { user.phone }</div>
      <div><span>Rol de usuario:</span> { role }</div>
      <div><span>Pendiente de aprobación:</span> { user.pending ? 'Aprobado' : 'Pendiente' }</div>
      <div><span>Estatus:</span> { user.status ? 'Activo' : 'Inactivo' }</div>
    </div>
  )
}

const EditModal = ({ singedUser, user, roles, close, setUsers }: { singedUser: UserTypes, user: UserTypes, roles: Role[], close: () => void, setUsers }) => {
  const [role, setRole] = useState('')

  return (
    <div className={ styles.editModal } >
      <div className={ styles.details }>
        <div className={ styles.name }  >{ user.name.first } { user.name.paternal } { user.name.maternal }</div>
        <div className={ styles.role } >{ roles.find(role => role.id === user.role).name }</div>
        <div className={ styles.votersCode } >{ user.ine.claveElector }</div>
      </div>

      <label>
        Asignar nuevo rol de usuario:
        <select value={ role } onChange={ e => setRole(e.currentTarget.value) } name="role">
          { roles?.map(role => role.status
            // @ts-ignore
            && singedUser?.role?.permissions[role?.id?.replace('Roles/', '')]?.update
            && <option value={ role.id }>{ role.name }</option>) }
        </select>
      </label>

      <EditModalForm setUsers={ setUsers } user={ user } role={ role.replace('Roles/', '') } close={ close } />
    </div >
  )
}

export default Elevate