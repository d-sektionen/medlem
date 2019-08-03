import React, { useState, useRef, useEffect } from 'react'

import { BrowserQRCodeReader } from '@zxing/library'
import { useCloseModal } from '../modal/useModal'

const QrScanner = ({ onSubmit }) => {
  const videoElement = useRef(null)
  const close = useCloseModal()
  const codeReader = new BrowserQRCodeReader()

  useEffect(() => {
    codeReader
      .decodeFromInputVideoDevice(undefined, videoElement.current)
      .then(result => {
        onSubmit({ text: result.text })
        close()
      })
      .catch(err => console.error(err))

    return () => codeReader.reset()
  }, [])
  return <video ref={videoElement} muted />
}

export default QrScanner
