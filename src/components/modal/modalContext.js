import React from 'react'

export default React.createContext({
  isOpen: false,
  content: <></>,
  title: '',
  setOpen: () => {},
  setContent: () => {},
  setTitle: () => {},
})
