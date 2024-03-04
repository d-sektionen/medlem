import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { FiX } from 'react-icons/fi'

import {
  darknessOverlay,
  modalWrapper,
  modal,
  NoPadding,
} from '../../scss/modal.module.scss'

const Overlay = posed.div({
  enter: {
    transition: { duration: 100 },
    opacity: 1,
  },
  exit: {
    transition: { duration: 100 },
    opacity: 0,
  },
})

const ModalWrapper = posed.div({
  enter: { transition: { duration: 100 }, scale: 1 },
  exit: { transition: { duration: 100 }, scale: 0 },
})

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
    <PoseGroup style={{ overflow: 'hidden' }}>
      {isOpen && (
        <Overlay className={darknessOverlay} onClick={close} key="overlay" />
      )}
      {isOpen && (
        <ModalWrapper
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
        </ModalWrapper>
      )}
    </PoseGroup>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default Modal
