import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'gatsby'
import posed, { PoseGroup } from 'react-pose'

import { FiLogOut, FiUser, FiSettings } from 'react-icons/fi'
import { IoMdQrScanner } from 'react-icons/io'

import style from '../../scss/profileMenu.module.scss'
import { BASE_URL } from '../../config'
import useModal from '../modal/useModal'
import QR from './qr'
import { UserContext } from './layout'

const Menu = posed.div({
  enter: { height: 'auto' },
  exit: { height: '0' },
})

const Top = posed.div({
  compact: { height: '100%' },
  expanded: { height: '200%' },
})

const LogoutModal = () => {
  const setUser = useContext(UserContext)[1]

  useEffect(() => {
    window.localStorage.removeItem('token')
    setUser(null)
  }, [])

  return (
    <iframe
      title="Log out"
      src={`${BASE_URL}/account/logout/`}
      sandbox="allow-scripts"
      style={{
        width: '50rem',
        maxWidth: '100%',
        height: '30rem',
        maxHeight: '100%',
        border: 'none',
        display: 'block',
        marginBottom: 0,
      }}
    />
  )
}

const ProfileMenu = ({ user }) => {
  const [open, setOpen] = useState(false)
  const [openModal] = useModal(QR)
  const [openLogoutModal] = useModal(LogoutModal)

  const toggle = () => {
    setOpen(prevState => !prevState)
  }

  const top = (
    <Top
      onClick={toggle}
      key="top"
      className={style.top}
      pose={open ? 'expanded' : 'compact'}
    >
      {user && (
        <>
          <div>
            <FiUser />
            {`${user.first_name} ${user.last_name}`}
          </div>
          {open && <div>{user.username}</div>}
        </>
      )}
    </Top>
  )

  const menu = (
    <Menu key="menu" className={style.menu}>
      <ul>
        <li>
          <a onClick={() => openModal('QR-kod')}>
            <IoMdQrScanner />
            QR-kod
          </a>
        </li>
        <li>
          <Link to="/preferences">
            <FiSettings />
            Kontoinställningar
          </Link>
        </li>
        <li>
          <a
            onClick={() =>
              openLogoutModal('Loggar ut', {}, { noPadding: true })
            }
          >
            <FiLogOut />
            Logga ut
          </a>
        </li>
      </ul>
    </Menu>
  )

  return (
    <div className={style.profileMenu}>
      <PoseGroup>{open ? [top, menu] : [top]}</PoseGroup>
    </div>
  )
}

export default ProfileMenu
