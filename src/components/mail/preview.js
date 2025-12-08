import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { post } from '../request'
import Window from '../ui/window'

function errorHTML(message) {
  return `
  <div style="font-family: sans-serif; padding: 1em;">
    <h1 style="color: red;">Kunde inte generera förhandsgranskning</h1>
    <p style="color: #ddd;">Ett problem uppstod när förhandsgranskningen av mailet skulle hämtas.</p>
    <pre style="background: #333; padding: 10px; border-radius: 12px; color: #ddd; border-style: dashed; border-width: 3px; border-color: #555;">${message}</pre>
  </div>
`
}

const Preview = ({ subject, content, infoCheifContent }) => {
  const [preview, setPreview] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    let isLatest = true

    post('/mail/preview/', { content, infoCheifContent }, { signal })
      .then((data) => {
        if (!isLatest) return // ignore stale response
        setPreview(data.data)
      })
      .catch((err) => {
        if (!isLatest) return
        if (axios.isCancel(err) || err.name === 'CanceledError') return
        setPreview(errorHTML(err.message))
      })

    return () => {
      isLatest = false
      controller.abort()
    }
  }, [content, infoCheifContent])

  return (
    <Window title={`Ämne: ${subject}`}>
      <iframe
        title="preview"
        style={{
          width: '100%',
          height: '600px',
          border: 'none',
          display: 'block',
          marginBottom: '-25px', // NOTE: Hack to remove confusing padding
        }}
        srcDoc={preview}
      ></iframe>
    </Window>
  )
}

export default Preview
