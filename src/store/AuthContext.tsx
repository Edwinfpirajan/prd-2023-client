import { boolean } from 'boolean'
import { useState, createContext } from 'react'
import { User } from '@common/types/user.type'

export const AuthContext = createContext(null)

const auth = boolean(localStorage.getItem('auth'))

const defaultUser = localStorage.getItem('user') || {
    "id": "ALPCLS91111111H100",
    "username": "Black",
    "role": {
        "name": "Administrador",
        "permissions": {
            "SELF": {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            },
            "GUEST": {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            },
            "POLLING_STATION_REPRESENTATIVE": {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            },
            "GENERAL_REPRESENTATIVE": {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            },
            "ZONE_COORDINATOR": {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            },
            "REFERRER": {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            },
            "DISTRICT_COORDINATOR": {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            },
            "SUPERVISOR": {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            },
            "CC_OPERATOR": {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            },
            "EE_OPERATOR": {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            },
            "ADMIN": {
                "create": true,
                "read": true,
                "update": true,
                "delete": true
            }
        },
        "status": true,
        "@metadata": {
            "@collection": "Roles",
            "Raven-Node-Type": "Role",
            "@change-vector": "A:366110-AWi7aYE6n0WNuhTbLD1XTA, C:235754-oB2kQamaFkyA2cQZq4+8Ww, B:235755-oGhwKLG5UUewQbYMdv3qnQ",
            "@id": "Roles/ADMIN",
            "@last-modified": "2023-04-10T11:47:31.4482115Z"
        },
        "id": "Roles/ADMIN"
    },
    "email": "bhvampire@gmail.com",
    "phone": "+52 462 163 5497",
    "sections": [
        "89958ced-55c7-467b-888a-4f86fdacfe0d"
    ],
    "name": {
        "first": "Luis Felipe",
        "maternal": "Pichardo",
        "paternal": "Alonso"
    },
    "referrer": "Ninguno",
    "birthday": "1991-11-11T06:00:00.000Z",
    "ine": {
        "tipo": "INE",
        "subTipo": "F",
        "claveElector": "ALPCLS91111111H100",
        "curp": "AOPL911111HGTLCS05",
        "registro": "2010 05",
        "seccion": "0553",
        "vigencia": "2029",
        "sexo": "H",
        "primerApellido": "ALONSO",
        "segundoApellido": "PICHARDO",
        "nombres": "LUIS FELIPE",
        "calle": "CTO MERLOT 4004-102",
        "colonia": "FRACC VIÑEDOS 76235",
        "ciudad": "QUERETARO , QRO .",
        "fechaNacimiento": "11/11/1991",
        "emision": "2019",
        "codigoValidacion": "gd1680804386.057771",
        "mrz": "IDMEX2144620788<<05530851106539111118H2912316MEX<05<<10072<3ALONSOPICHARDO<<LUIS<FELIPE<<",
        "cic": "214462078",
        "ocr": "0553085110653",
        "identificadorCiudadano": "085110653",
        "validacionMRZ": {
            "fechaNacimiento": "OK",
            "sexo": "OK",
            "vigencia": "OK",
            "emision": "OK",
            "nombre": "OK"
        }
    },
    "status": true,
    "createdAt": "2023-04-06T18:06:27.164Z",
    "updatedAt": "2023-04-06T18:06:27.164Z",
    "createdBy": "ALPCLS91111111H100",
    "updatedBy": "ALPCLS91111111H100",
    "@metadata": {
        "@attachments": [
            {
                "changeVector": null,
                "contentType": "image/webp",
                "documentId": null,
                "hash": "YDeAtTl4aNL5cV8E34NtT8xFoQqe2j7uC3LtAg+fgoo=",
                "name": "ineBack.webp",
                "size": 156992
            },
            {
                "changeVector": null,
                "contentType": "image/webp",
                "documentId": null,
                "hash": "vBq0oadmy+0FPBPTvPX1kfVU0Vbjg2D649RPceoQNIA=",
                "name": "ineFront.webp",
                "size": 117522
            },
            {
                "changeVector": null,
                "contentType": "image/webp",
                "documentId": null,
                "hash": "vBq0oadmy+0FPBPTvPX1kfVU0Vbjg2D649RPceoQNIA=",
                "name": "photo.webp",
                "size": 117522
            }
        ],
        "@collection": "Users",
        "@nested-object-types": {
            "birthday": "date",
            "createdAt": "date",
            "updatedAt": "date"
        },
        "Raven-Node-Type": "User",
        "@change-vector": "A:366122-AWi7aYE6n0WNuhTbLD1XTA, C:235766-oB2kQamaFkyA2cQZq4+8Ww, B:235767-oGhwKLG5UUewQbYMdv3qnQ",
        "@flags": "HasAttachments",
        "@id": "ALPCLS91111111H100",
        "@last-modified": "2023-04-10T11:53:41.2673385Z"
    }
}

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(auth)
    const [user, setUser] = useState(defaultUser)

    return (
        <AuthContext.Provider value={ { user, isAuthenticated, setIsAuthenticated } }>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider