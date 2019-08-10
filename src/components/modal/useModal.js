import React, { useEffect, useState, useContext } from 'react'
import ModalContext from './modalContext'

export default function useModal(Component) {
  const { isOpen, setOpen, setContent, setTitle, setOptions } = useContext(
    ModalContext
  )

  const open = (title, props = {}, options = {}) => {
    setOptions(options)
    setContent(<Component {...props} />)
    setTitle(title)
    setOpen(true)
  }

  return [open, isOpen]
}

// Returns a function to close the currently open modal
export const useCloseModal = () => {
  const { setOpen } = useContext(ModalContext)

  const close = () => {
    setOpen(false)
  }

  return close
}
