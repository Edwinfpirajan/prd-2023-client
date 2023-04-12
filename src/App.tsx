import { Route, Routes } from "react-router-dom"
import Home from "@pages/Home/Home"
import Layout from '@components/Layout/Layout'
import Login from '@pages/Login/Login'
import Register from '@pages/Register/Register'
import Referrals from '@pages/Referrals/Referrals'
import PrivateRoute from '@components/Routers/PrivateRoute'
import Elevate from '@pages/Elevate/Elevate'

const App = () => {
    return <Routes >
        <Route element={ <PrivateRoute /> } >
            <Route element={ <Layout /> } >
                <Route path="/" element={ <Home /> } />

                <Route element={ <PrivateRoute permissions={ { "DISTRICT_COORDINATOR": ['read', 'create'], "REFERRER": ['read', 'create'], "ZONE_COORDINATOR": ['read', 'create'] } } /> } >
                    <Route path="/referrals" element={ <Referrals /> } />
                </Route>

                <Route path="/register" element={ <Register /> } />
                <Route path="/elevate" element={ <Elevate /> } />
            </Route>
        </Route>


        <Route path="/login" element={ <Login /> } />
        <Route path="/access-denied" element={ <div >Access Denied</div> } />
        <Route path="*" element={ <div >Not Found</div> } />
    </Routes >
}

export default App