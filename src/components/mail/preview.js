import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { post } from '../request'
import {
  previewFrame,
  errorContainer,
  errorTitle,
  errorBody,
  errorMessageClass,
} from '../../scss/mailPreview.module.scss'
import Window from '../ui/window'

const Preview = ({ subject, content, infoChiefContent }) => {
  const [preview, setPreview] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    let isLatest = true

    post('/mail/preview/', { content, infoChiefContent }, { signal })
      .then((data) => {
        if (!isLatest) return // ignore stale response
        setPreview(data.data)
        setErrorMessage(null)
      })
      .catch((err) => {
        if (!isLatest) return
        if (axios.isCancel(err) || err.name === 'CanceledError') return
        setErrorMessage(err.message)
      })

    return () => {
      isLatest = false
      controller.abort()
    }
  }, [content, infoChiefContent])

  return (
    <Window title={`Ämne: ${subject}`}>
      {errorMessage ? (
        <div className={errorContainer}>
          <h1 className={errorTitle}>Kunde inte generera förhandsgranskning</h1>
          <p className={errorBody}>
            Ett problem uppstod när förhandsgranskningen av mailet skulle
            hämtas.
          </p>
          <pre className={errorMessageClass}>{errorMessage}</pre>
        </div>
      ) : (
        <iframe
          title="preview"
          srcDoc={preview}
          className={previewFrame}
        ></iframe>
      )}
    </Window>
  )
}

export default Preview
