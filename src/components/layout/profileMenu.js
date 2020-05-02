import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'gatsby'
import posed, { PoseGroup } from 'react-pose'

import { FiLogOut, FiUser, FiSettings } from 'react-icons/fi'
import { IoMdQrScanner } from 'react-icons/io'

import style from '../../scss/profileMenu.module.scss'
import { BASE_URL } from '../../config'
import useModal, { useCloseModal } from '../modal/useModal'
import QR from './qr'
import { UserContext } from './layout'
import { Button, ButtonGroup } from '../ui/buttons'

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
  const [openModal] = useModal(QR)
  const [openLogoutModal] = useModal(LogoutModal)
  const closeModal = useCloseModal()

  return (
    <div className={style.profileMenu}>
      <p>{`${user.pretty_name} (${user.username})`}</p>
      <ButtonGroup>
        <Button onClick={() => openModal('QR-kod')}>
          <IoMdQrScanner />
          QR-kod
        </Button>
        <Button to="/preferences" onClick={closeModal}>
          <FiSettings />
          Kontoinställningar
        </Button>
        <Button
          onClick={() => openLogoutModal('Loggar ut', {}, { noPadding: true })}
        >
          <FiLogOut />
          Logga ut
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default ProfileMenu
