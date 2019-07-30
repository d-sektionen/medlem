import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import ModalContext from './modalContext'
import Modal from './modal'

const ModalHandler = ({ children }) => {
  const [isOpen, setOpen] = useState(false)
  const [content, setContent] = useState(<></>)
  const [title, setTitle] = useState('')
  return (
    <ModalContext.Provider
      value={{ isOpen, content, title, setOpen, setContent, setTitle }}
    >
      <Modal isOpen={isOpen} content={content} title={title} setOpen={setOpen}>
        {content}
      </Modal>
      {children}
    </ModalContext.Provider>
  )
}

ModalHandler.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ModalHandler
