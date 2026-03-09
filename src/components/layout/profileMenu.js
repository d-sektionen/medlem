import { navigate } from 'gatsby'
import React, { useContext } from 'react'

import { FiLogOut, FiSettings } from 'react-icons/fi'
import { IoMdQrScanner } from 'react-icons/io'

import { BASE_URL } from '../../config'
import useModal, { useCloseModal } from '../modal/useModal'
import QR from './qr'
import { UserContext } from './layout'
import { Button, ButtonGroup } from '../ui/buttons'

const ProfileMenu = ({ user }) => {
  const setUser = useContext(UserContext)[1]
  const [openModal] = useModal(QR)
  const closeModal = useCloseModal()

  const logout = () => {
    setUser(null)

    navigate(`${BASE_URL}/oauth2/logout?next=${window.location.origin}`)
  }

  return (
    <div>
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
        <Button onClick={logout}>
          <FiLogOut />
          Logga ut
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default ProfileMenu
