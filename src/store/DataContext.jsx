import { boolean } from 'boolean'
import { useState, createContext } from 'react'

export const DataContext = createContext()

const auth = boolean(localStorage.getItem('auth'))

const DataProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(auth)


    return (
        <DataContext.Provider value={ { isAuthenticated, setIsAuthenticated } }>
            { children }
        </DataContext.Provider>
    )
}

export default DataProvider