import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '@store/AuthContext'
import { useContext } from 'react'
import { Action } from '@common/types/roles.type'

type Permissions = Record<string, Action[]>

const PrivateRoute = ({ permissions }: { permissions?: Permissions }): JSX.Element => {
    const { user } = useContext(AuthContext)

    // Simulamos la autenticación
    if (!user) {
        // Si el usuario no está autenticado, redirigimos a la página de inicio de sesión
        return <Navigate to="/login" />
    } else if (permissions && (!checkRolesAndPermissions(user, permissions) || !user?.role?.status || !user?.status || user?.pending)) {
        // Si el usuario no tiene los roles y permisos necesarios, redirigimos a la página de acceso denegado
        return <Navigate to="/access-denied" />
    } else {
        // Si el usuario está autenticado y tiene los roles y permisos necesarios, mostramos la ruta protegida
        return <Outlet />
    }
}

const checkRolesAndPermissions = (user, permissions: Permissions): boolean => {
    // Lógica para verificar los roles y permisos del usuario
    // const userRole = user.role.name
    const userPermissions = user.role.permissions

    // Verificamos que el usuario tenga al menos uno de los roles necesarios
    // const hasRequiredRoles = roles.some(role => userRole === role)
    // if (!hasRequiredRoles) {
    //     return false
    // }

    let hasPermission = false

    // Verificamos que el usuario tenga al menos uno de los permisos necesarios
    for (const [permission, actions] of Object.entries(permissions)) {
        if (userPermissions[permission]) {
            // Verificamos que el usuario tenga todas las acciones necesarias para el permiso
            const allActionsExist = actions.every(action => userPermissions[permission][action])
            if (allActionsExist) {
                hasPermission = true
                break
            }
        }
    }

    if (!hasPermission) {
        return false
    }

    return true
}


export default PrivateRoute
