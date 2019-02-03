import React, { Component } from 'react'
import style from '../scss/layout.module.scss'
import { FiMenu } from 'react-icons/fi'
import ProfileMenu from './profileMenu'

class TopBar extends Component {
  render() {
    const { logout, user } = this.props
    return (
      <div className={style.topBar}>
        {user && <FiMenu onClick={this.props.openMenu} />}
        {user && <ProfileMenu user={user} logout={logout} />}
      </div>
    )
  }
}

export default TopBar
