import React, { useRef, useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Link } from 'gatsby'
import useSWR from 'swr'

import style from '../../scss/qr.module.scss'
import { useCloseModal } from '../modal/useModal'

const QR = () => {
  const { data } = useSWR('/account/identification-token/')
  const [error, setError] = useState(null)
  const canvasRef = useRef(null)
  const closeModal = useCloseModal()

  useEffect(
    () => {
      if (data && data.token) {
        QRCode.toCanvas(canvasRef.current, data.token, { scale: 8 }, err => {
          if (err) setError(err)
        })
      }
    },
    [data]
  )

  return (
    <div>
      {error ? (
        <div>
          <p>Kunde inte generera en QR-kod.</p>
          <pre>{error}</pre>
        </div>
      ) : (
        <div className={style.qrWrapper1}>
          <div className={style.qrWrapper2}>
            <canvas className={style.qr} ref={canvasRef} />
          </div>
        </div>
      )}
      <p>
        {`Detta är din QR-kod som kan användas för att identifiera dig vid
        evenemang. Om du inte vill identifiera dig med QR-koden kan du även
        använda dig av ditt LiU-kort. För att göra det kan du lägga till ditt
        kortnummer i `}
        <Link to="/preferences" onClick={closeModal}>
          din profil
        </Link>
        .
      </p>
    </div>
  )
}

export default QR
