import React, { Component } from 'react'
import { Link } from 'gatsby'
import posed, { PoseGroup } from 'react-pose'

import { MENU_ITEMS } from '../js/config'

import logo from '../images/round.svg'
import style from '../scss/sideMenu.module.scss'
import { FiX } from 'react-icons/fi'

const Menu = posed.div({
  enter: {
    x: 0,
    transition: {
      duration: 200,
      ease: 'backIn',
    },
  },
  exit: {
    x: '-100%',
    transition: {
      duration: 200,
      ease: 'backOut',
    },
  },
})

const Overlay = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
})

class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.escFunction = this.escFunction.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false)
  }

  escFunction(event) {
    const { close } = this.props
    if (event.keyCode === 27) close()
  }

  render() {
    const { close, open } = this.props
    return (
      <PoseGroup style={{ overflow: 'hidden' }}>
        {open && [
          <Overlay
            className={style.darknessOverlay}
            onClick={close}
            key="overlay"
          />,
          <Menu className={style.menu} key="menu">
            <FiX onClick={close} className={style.x} />
            <a className={style.imgWrapper} href="https://d-sektionen.se">
              <img src={logo} useMap="circle" />
              <map name="circle">
                <area shape="circle" coords="0,100%,100%,100%" />
              </map>
            </a>

            <ul className={style.pageList}>
              {Object.keys(MENU_ITEMS).map(key => (
                <li key={`menuitem-${key}`}>
                  <Link
                    to={MENU_ITEMS[key]}
                    onClick={close}
                    activeClassName={style.thisPage}
                  >
                    {key}
                  </Link>
                </li>
              ))}
            </ul>
          </Menu>,
        ]}
      </PoseGroup>
    )
  }
}

export default SideMenu
