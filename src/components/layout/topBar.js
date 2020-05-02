import React from 'react'
import PropTypes from 'prop-types'
import { FiMenu, FiUser } from 'react-icons/fi'
import ProfileMenu from './profileMenu'
import style from '../../scss/layout.module.scss'
import useModal from '../modal/useModal'

const TopBar = ({ user, openMenu }) => {
  const [openUserModal] = useModal(ProfileMenu)

  return (
    <div className={style.topBar}>
      <FiMenu onClick={openMenu} />
      <FiUser onClick={() => openUserModal('Konto', { user })} />
    </div>
  )
}

TopBar.defaultProps = {
  user: null,
}

TopBar.propTypes = {
  user: PropTypes.object,
  openMenu: PropTypes.func.isRequired,
}

export default TopBar
