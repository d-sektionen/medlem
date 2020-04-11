import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import posed, { PoseGroup } from 'react-pose'

import { FiX, FiGithub } from 'react-icons/fi'
import { PAGES, BASE_URL } from '../../config'

import logo from '../../images/round.svg'
import style from '../../scss/sideMenu.module.scss'
import { UserContext } from './layout'

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

const SideMenu = ({ close, open }) => {
  const [user] = useContext(UserContext)

  const escFunction = event => {
    if (event.keyCode === 27) close()
  }
  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)
    return () => document.removeEventListener('keydown', escFunction, false)
  }, [])

  return (
    <PoseGroup style={{ overflow: 'hidden' }}>
      {open && [
        <Overlay
          className={style.darknessOverlay}
          onClick={close}
          key="overlay"
        />,
        <Menu className={style.menu} key="menu">
          <div>
            <div>
              <FiX onClick={close} className={style.x} />
              <a className={style.imgWrapper} href="https://d-sektionen.se">
                <img src={logo} alt="" useMap="circle" />
                <map name="circle">
                  <area shape="circle" alt="" coords="0,100%,100%,100%" />
                </map>
              </a>
            </div>

            <ul className={style.pageList}>
              {PAGES.reduce((links, current) => {
                const pageData = current
                if (
                  !pageData.menu ||
                  (pageData.requiredPrivileges &&
                    !user.privileges[pageData.requiredPrivileges])
                )
                  return links
                return [
                  ...links,
                  <li key={`menuitem-${pageData.path}`}>
                    <Link
                      to={pageData.path}
                      onClick={close}
                      activeClassName={style.thisPage}
                    >
                      {pageData.title}
                    </Link>
                  </li>,
                ]
              }, [])}
            </ul>

            <div className={style.footer}>
              {user.privileges['staff'] && (
                <p>
                  <a href={`${BASE_URL}/admin`}>Adminpanelen</a>
                </p>
              )}
              <p>Sidan är utvecklad av Webbgruppen</p>
              <div>
                <a href="https://github.com/d-sektionen/medlem">
                  <FiGithub />
                </a>
              </div>
            </div>
          </div>
        </Menu>,
      ]}
    </PoseGroup>
  )
}

SideMenu.propTypes = {
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default SideMenu
