import React, { useState } from 'react'
import BigPixels from '../layout/bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import Textarea from '../ui/textarea'

import {
  inputContainer,
  inputButtons,
  confirmation,
  confirmationButtons,
  status,
  textSuccess,
  textFail,
  failMessageClass,
} from '../../scss/mail.module.scss'
import AutoInput from '../form/input'
import { Button } from '../ui/buttons'
import { post } from '../request'
import { FiSend, FiCheck, FiSlash, FiUpload, FiUser } from 'react-icons/fi'
import RichText from '../ui/richText'
import Modal from '../modal/modal'
import Preview from './preview'

const ModalState = Object.freeze({
  CLOSED: 'CLOSED',
  SENDING: 'SENDING',
  CONFIRMATION: 'CONFIRMATION',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
})

function formatErrorMessage(error) {
  if (error.response?.data) {
    const { data } = error.response
    return typeof data === 'string' ? data : JSON.stringify(data, null, 2)
  }
  return error.message
}

const MailPage = () => {
  const [subject, setSubject] = useState('')
  const [infoChiefContent, setInfoChiefContent] = useState('')
  const [content, setContent] = useState('')
  const [rawMode, setRawMode] = useState(false)
  const [modalState, setModalState] = useState(ModalState.CLOSED)
  const [failMessage, setFailMessage] = useState('')

  function sendMail() {
    setModalState(ModalState.SENDING)
    post('/mail/send/', { subject, content, infoChiefContent })
      .then(() => {
        setModalState(ModalState.SUCCESS)
      })
      .catch((error) => {
        setModalState(ModalState.FAIL)
        setFailMessage(formatErrorMessage(error))
      })
  }

  function sendMailToMyself() {
    setModalState(ModalState.SENDING)
    post('/mail/send-self/', { subject, content, infoChiefContent })
      .then(() => {
        setModalState(ModalState.SUCCESS)
      })
      .catch((error) => {
        setModalState(ModalState.FAIL)
        setFailMessage(formatErrorMessage(error))
      })
  }

  function closeModal() {
    setModalState(ModalState.CLOSED)
  }

  function confirmEmail() {
    setModalState(ModalState.CONFIRMATION)
  }

  return (
    <BigPixels>
      <Modal
        title="Skicka infomail"
        isOpen={modalState !== ModalState.CLOSED}
        setOpen={(value) => {
          if (!value) {
            setModalState(ModalState.CLOSED)
          } else {
            setModalState(ModalState.CONFIRMATION)
          }
        }}
        options={{}}
      >
        {modalState == ModalState.CONFIRMATION ? (
          <div className={confirmation}>
            <div>
              <h3>Är du säker på att du vill skicka ut detta infomail?</h3>
              <p>
                Du är påväg att skicka ut ett infomail till alla medlemmar på
                d-sektionen som prenumererar på infomailet (potentiellt över
                2000 personer!). Om du väljer att skicka mailet kommer det
                skickas omedelbart till alla prenumeranter. Detta val går inte
                att ångra
              </p>
            </div>

            <div className={confirmationButtons}>
              <Button onClick={closeModal}>
                <FiSlash /> Nej, avbryt utskicket
              </Button>
              <Button onClick={sendMail}>
                <FiCheck /> Ja, jag är säker
              </Button>
            </div>
          </div>
        ) : modalState == ModalState.SENDING ? (
          <div className={status}>
            <FiUpload size="9rem" />
            <h2>Mailet skickas...</h2>
          </div>
        ) : modalState == ModalState.SUCCESS ? (
          <div className={status}>
            <FiSend size="9rem" className={textSuccess} />
            <h2 className={textSuccess}>Mailet har skickats!</h2>
          </div>
        ) : modalState == ModalState.FAIL ? (
          <div className={status}>
            <FiSlash size="9rem" className={textFail} />
            <h2 className={textFail}>Ett fel uppstod vid utskick av mailet.</h2>
            <pre className={failMessageClass}>{failMessage}</pre>
          </div>
        ) : null}
      </Modal>
      <GridContainer>
        <GridItem>
          <div className={inputContainer}>
            <div>
              <label htmlFor="rawMode">
                <input
                  type="checkbox"
                  id="rawMode"
                  onChange={(e) => {
                    setRawMode(e.target.checked)
                  }}
                ></input>
                &nbsp; Skriv rå HTML
              </label>

              <br />

              <AutoInput label={'Ämne'} onChange={setSubject} value={subject} />

              <br />

              <label>
                Infochefens hörna
                {rawMode ? (
                  <Textarea
                    value={infoChiefContent}
                    onChange={setInfoChiefContent}
                  />
                ) : (
                  <RichText
                    value={infoChiefContent}
                    onChange={setInfoChiefContent}
                  />
                )}
              </label>

              <br />

              <label>
                Innehåll
                {rawMode ? (
                  <Textarea value={content} onChange={setContent} />
                ) : (
                  <RichText value={content} onChange={setContent} />
                )}
              </label>
            </div>

            <div className={inputButtons}>
              <Button onClick={sendMailToMyself}>
                <FiUser /> Skicka till mig själv
              </Button>
              <Button onClick={confirmEmail}>
                <FiSend /> Skicka
              </Button>
            </div>
          </div>
        </GridItem>
        <GridItem>
          <Preview
            subject={subject}
            content={content}
            infoChiefContent={infoChiefContent}
          />
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}

export default MailPage
