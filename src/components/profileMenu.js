import React, { Component } from 'react'
import { Link } from 'gatsby'
import posed, { PoseGroup } from 'react-pose'

import { FiLogOut, FiUser, FiSettings } from 'react-icons/fi'

import style from '../scss/profileMenu.module.scss'
import { BASE_URL } from '../js/config'

const Menu = posed.div({
  enter: { height: 'auto' },
  exit: { height: '0' },
})

const Top = posed.div({
  compact: { height: '100%' },
  expanded: { height: '200%' },
})

class ProfileMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }))
  }

  render() {
    const { open } = this.state
    const { user, logout } = this.props

    const top = (
      <Top
        onClick={this.toggle}
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
            <Link to="/preferences">
              <FiSettings />
              Kontoinställningar
            </Link>
          </li>
          <li>
            <a href={`${BASE_URL}/account/logout`} onClick={logout}>
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
}

export default ProfileMenu
