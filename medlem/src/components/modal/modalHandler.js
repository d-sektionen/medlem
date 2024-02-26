import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import ModalContext from './modalContext'
import Modal from './modal'

const ModalHandler = ({ children }) => {
  const [isOpen, setOpen] = useState(false)
  const [content, setContent] = useState(<></>)
  const [title, setTitle] = useState('')
  const [options, setOptions] = useState({})
  return (
    <ModalContext.Provider
      value={{
        isOpen,
        content,
        title,
        options,
        setOpen,
        setContent,
        setTitle,
        setOptions,
      }}
    >
      <Modal
        isOpen={isOpen}
        content={content}
        title={title}
        options={options}
        setOpen={setOpen}
      >
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
