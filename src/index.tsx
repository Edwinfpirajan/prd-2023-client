import { render } from 'preact'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import DataProvider from './store/DataContext'

import './styles/globals.scss'
import './styles/assets/waves/waves'
import AuthProvider from '@store/AuthContext'

render(

    <AuthProvider>
        <BrowserRouter >
            <DataProvider>
                <div id="modal-container" />
                <App />
                <ToastContainer limit={ 3 } />
            </DataProvider>
        </ BrowserRouter >
    </AuthProvider>
    , document.getElementById('app')
)