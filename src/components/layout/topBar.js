import React from 'react'
import PropTypes from 'prop-types'
import { FiMenu } from 'react-icons/fi'
import ProfileMenu from './profileMenu'
import style from '../../scss/layout.module.scss'

const TopBar = ({ user, openMenu }) => (
  <div className={style.topBar}>
    <FiMenu onClick={openMenu} />
    <ProfileMenu user={user} />
  </div>
)

TopBar.defaultProps = {
  user: null,
}

TopBar.propTypes = {
  user: PropTypes.object,
  openMenu: PropTypes.func.isRequired,
}

export default TopBar
