import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

import {
  darknessOverlay,
  modalWrapper,
  modal,
  NoPadding,
} from '../../scss/modal.module.scss'

const Modal = ({ children, title, isOpen, options, setOpen }) => {
  const close = () => setOpen(false)

  const { noPadding } = options

  useEffect(() => {
    if (isOpen) {
      const escClose = event => {
        if (event.key === 'Escape') close()
      }

      window.addEventListener('keydown', escClose, false)

      return () => {
        window.removeEventListener('keydown', escClose, false)
      }
    }
    return () => {}
  }, [isOpen])

  return (
    <AnimatePresence style={{ overflow: 'hidden' }}>
      {isOpen && (
        <motion.div 
          transition={{ duration: 0.2, delay: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={darknessOverlay} onClick={close} key="overlay" />
      )}
      {isOpen && (
        <motion.div 
          transition={{ duration: 0.1 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          role="dialog"
          aria-modal
          className={modalWrapper}
          key="modal"
        >
          <div className={modal}>
            <header>
              <h2>{title}</h2>
              <FiX onClick={close} />
            </header>
            <div className={noPadding && NoPadding}>{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default Modal
