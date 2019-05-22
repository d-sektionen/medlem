import React from 'react'
import { FiMenu } from 'react-icons/fi'
import ProfileMenu from './profileMenu'
import style from '../scss/layout.module.scss'

const TopBar = ({ logout, user, openMenu }) => (
  <div className={style.topBar}>
    {user && <FiMenu onClick={openMenu} />}
    {user && <ProfileMenu user={user} logout={logout} />}
  </div>
)

export default TopBar
