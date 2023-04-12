import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styles from './Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { DataContext } from '@store/DataContext'
import { useContext } from 'react'

const Login = () => {
    const { setIsAuthenticated } = useContext(DataContext)

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        localStorage.setItem('auth', 'true')
        setIsAuthenticated(true)
        navigate('/')
    }

    const onError = (data) => {
        if (data.username) toast('Por favor ingresa un usuario válido.')
        if (data.password) toast('Por favor ingresa una contraseña válida, la contraseña debe tener mínimo 8 carácteres, letras y números.')
    }

    return (
        <div className={ styles.login } >
            <form onSubmit={ handleSubmit(onSubmit, onError) }>

                <h2>Iniciar Sesión</h2>

                <br />

                <label htmlFor="username" >Usuario</label>
                <input id="username" { ...register('username', { required: true }) } />

                <br />

                <label htmlFor="password" >Contraseña</label>
                <input type="password" id="password" { ...register('password', { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ }) } />

                <br />
                <br />

                <button type="submit">Enviar</button>

                <br />

                <button onClick={ () => navigate('/self') } type="button">Registrarse</button>

                {/* <Link to="/register" ><u><small>¿Olvidaste tu contraseña?</small></u></Link> */ }
                <Link to="/register" ><u><small>¿Olvidaste tu contraseña?</small></u></Link>

            </form>
        </div >
    )
}

export default Login