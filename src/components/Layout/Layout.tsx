import { Outlet } from 'react-router-dom'
import styles from './Layout.module.scss'
import createModal from '../UI/Modal/index'
import Navbar from './Navbar/Navbar'


const Layout = () => {

  return (
    <div className={ styles.layout }    >

      <Navbar />

      <div className={ styles.content }>
        <Outlet />
      </div>

    </div >
  )
}

export default Layout

const Test = () => <div>Oli</div>