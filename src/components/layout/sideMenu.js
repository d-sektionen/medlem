import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'gatsby'

import { FiX, FiGithub } from 'react-icons/fi'
import { PAGES, BASE_URL } from '../../config'

import webbu_logo from '../../images/webbu-logo-inverted.png'
import logo from '../../images/round.svg'
import {
  darknessOverlay,
  menu,
  x,
  imgWrapper,
  pageList,
  thisPage,
  footer
} from '../../scss/sideMenu.module.scss'
import { UserContext } from './layout'

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
    <AnimatePresence style={{ overflow: 'hidden' }}>
      {open && [
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0 }}
          className={darknessOverlay} onClick={close} key="overlay" />,
        <motion.div exit={{ x: '-100%' }} initial={{ x: '-100%' }} 
          animate={{ x: '0%' }} className={menu} key="menu" 
          transition={{ x: { type: "spring", bounce: 0, duration: 0.2 }}}>
          <div>
            <div>
              <FiX onClick={close} className={x} />
              <a className={imgWrapper} href="https://d-sektionen.se">
                <img src={logo} alt="" useMap="circle" />
                <map name="circle">
                  <area shape="circle" alt="" coords="0,100%,100%,100%" />
                </map>
              </a>
            </div>

            <ul className={pageList}>
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
                      activeClassName={thisPage}
                    >
                      {pageData.title}
                    </Link>
                  </li>,
                ]
              }, [])}
              {user.privileges['staff'] && (
                <li>
                  <a
                    href={`${BASE_URL}/admin`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Adminpanelen
                  </a>
                </li>
              )}
            </ul>

            <div className={footer}>
              <div>
                <a
                  href="https://github.com/d-sektionen/medlem"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGithub />
                </a>
              </div>
              <div>
                <a
                  href="https://www.webbu.se/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>Sidan är utvecklad av</p>
                  <img src={webbu_logo} alt="Webbutskottet"></img>
                </a>
              </div>
            </div>
          </div>
        </motion.div>,
      ]}
    </AnimatePresence>
  )
}

SideMenu.propTypes = {
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default SideMenu
