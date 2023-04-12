import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.scss'
import DataProvider, { DataContext } from '@store/DataContext'
import { useContext } from 'react'

const Navbar = () => {


    const { setIsAuthenticated } = useContext(DataContext)

    const navigate = useNavigate()

    const logoutHandler = () => {
        localStorage.removeItem('auth')
        setIsAuthenticated(false)
        navigate('/login')
    }

    return (
        <div className={ styles.navbar } >
            {/* <div className={ styles.title } >Sitio de registro</div> */ }
            <nav className={ styles.links }>
                <Link to="/register" >Registrar INE</Link>
                <Link to="/elevate" >Administrador de Permisos</Link>
            </nav>
            <button onClick={ () => logoutHandler() } >Cerrar sesión</button>
        </div>
    )
}

export default Navbar