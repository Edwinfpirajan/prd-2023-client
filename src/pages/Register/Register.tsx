import { FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import ineFront from '@assets/images/ineFront.svg'
import ineBack from '@assets/images/ineBack.svg'
import photo from '@assets/images/photo.svg'
import { toast } from 'react-toastify'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { User } from '@common/types/user.type'


import styles from './Register.module.scss'

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const [photoPreview, setPhotoPreview] = useState(null)
    const [ineBackPreview, setIneBackPreview] = useState(null)
    const [ineFrontPreview, setIneFrontPreview] = useState(null)
    const [usersList, setUsersList] = useState<UsersList[]>([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get<UsersList[]>(`${import.meta.env.VITE_API_URL}/users`)
                setUsersList(data)
            } catch (error) {
                toast(error.message)
            }
        })()
    }, [])


    const onSubmit = async (data) => {
        const body: User = {
            email: data.email,
            phone: data.phone,
            booth: data.booth,
            referrer: data.referrer,
            createdBy: data.id,
            updatedBy: data.id
        }

        const formData = new FormData()

        formData.append("ineFront", data.ineFront[0])
        formData.append("ineBack", data.ineBack[0])
        formData.append("photo", data.photo[0])

        formData.append("body", JSON.stringify(body))

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users/ine`, formData)
            toast('El usuario se guardó exitosamente.')
            reset()
            setPhotoPreview(null)
            setIneBackPreview(null)
            setIneFrontPreview(null)
        } catch (error) {
            toast(error?.response?.data?.message, { autoClose: false })
        }
    }

    const handlePhotoChange = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                setPhotoPreview(reader.result)
            }
            reader.readAsDataURL(file)
        } else {
            setPhotoPreview(null)
        }
    }

    const handleIneBackChange = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                setIneBackPreview(reader.result)
            }
            reader.readAsDataURL(file)
        } else {
            setIneBackPreview(null)
        }
    }

    const handleIneFrontChange = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                setIneFrontPreview(reader.result)
            }
            reader.readAsDataURL(file)
        } else {
            setIneFrontPreview(null)
        }
    }

    return (
        <div className={ styles.register } >
            <div className={ styles.card } >
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <div className={ styles.left } >
                        <label >*INE: Imagen Frontal</label>
                        <input { ...register("ineFront", { required: true, pattern: /\.(jpg|jpeg|png)$/i }) } type="file" accept="image/png, image/jpeg" onChange={ handleIneFrontChange } />
                        <img src={ ineFrontPreview || ineFront } alt="INE: Imagen frontal" />
                        { errors.ineFront && <span>Este campo es requerido, debe ser una imagen JPG, JPEG, o PNG</span> }

                        <label>*INE: Imagen <small><small><b>Obligatorio</b></small></small></label>
                        <input { ...register("ineBack", { required: true, pattern: /\.(jpg|jpeg|png)$/i }) } type="file" accept="image/png, image/jpeg" onChange={ handleIneBackChange } />
                        <img src={ ineBackPreview || ineBack } alt="INE: Imagen dorsal" />
                        { errors.ineBack && <span>Este campo es requerido, debe ser una imagen JPG, JPEG, o PNG</span> }

                        <label>Fotografía</label>
                        <input { ...register("photo", { required: false, pattern: /\.(jpg|jpeg|png)$/i }) } accept="image/png, image/jpeg" type="file" onChange={ handlePhotoChange } />
                        <img src={ photoPreview || photo } alt="Photo Preview" />
                        {/* { errors.photo && <span>Este campo es requerido, debe ser una imagen JPG, JPEG, o PNG</span> } */ }
                    </div>

                    <div className={ styles.right } >
                        <label htmlFor="email">*Correo Electrónico</label>
                        <input autoComplete="off" type="email" id="email" { ...register("email", { required: true }) } />
                        { errors.email && <span>This field is required</span> }

                        <label htmlFor="phone">*Teléfono, por favor usa el siguiente formato: <br /> +52 123 123 1234</label>
                        <input autoComplete="off" id="phone" defaultValue="+52 " { ...register("phone", { required: true, pattern: /^\+52\s\d{3}\s\d{3}\s\d{4}$/ }) } />
                        { errors.phone && <span>This field is required</span> }

                        <label htmlFor="id">*Tu propia Clave Electoral (Servirá más adelante para localizar tus registros)</label>
                        <input id="id" { ...register("id", { required: true, pattern: /^[A-Z]{6}[0-9]{8}[A-Z][0-9]{3}$/ }) } />
                        { errors.id && <span>This field is required</span> }

                        {/* <label htmlFor="referrer">Usuario Referente</label>
                        <select id="referrer" { ...register("referrer") } >
                            <option selected value={ null }>Ninguno</option>
                            { usersList?.map(user => (
                                <option value={ user.id }>{ user.username } - { user.name.first } { user.name.paternal } { user.name.maternal }</option>
                            )) }
                        </select>
                        { errors.referrer && <span>This field is required</span> } */}

                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Register

interface UsersList {
    id: string
    username: string
    name: {
        first: string
        paternal: string
        maternal: string
    }
}