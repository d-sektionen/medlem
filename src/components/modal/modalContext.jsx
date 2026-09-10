import React from 'react'

export default React.createContext({
  isOpen: false,
  content: <></>,
  title: '',
  options: {},
  setOpen: () => {},
  setContent: () => {},
  setTitle: () => {},
  setOptions: () => {},
})
