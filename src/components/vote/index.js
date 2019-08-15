import React, { useContext, useState } from 'react'
import ActiveVote from './activeVote'
import { Get, useEndpoint } from '../request'
import { LoadingContext } from '../layout/layout'

// import style from '../../scss/vote.module.scss'

const Vote = () => {
  const setLoading = useContext(LoadingContext)[1]
  const [message, setMessage] = useState(null)
  const [displayReloadCloseText, setDisplayReloadCloseText] = useState(false)

  const showMessage = (title, content, drct) => {
    setDisplayReloadCloseText(drct)
    setMessage({
      title,
      content,
    })
  }

  if (message !== null) {
    const { title, content } = message
    return (
      <>
        <h2>{title}</h2>
        <p>{content}</p>
        <button type="button" onClick={() => setMessage(null)}>
          {displayReloadCloseText ? 'Ladda om sidan' : 'Stäng'}
        </button>
      </>
    )
  }
  return (
    <>
      <h1>D-cide</h1>
      <ActiveVote showMessage={showMessage} setLoading={setLoading} />
    </>
  )
}

export default Vote
