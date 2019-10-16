import React from 'react'
import PropTypes from 'prop-types'

import useModal, { useCloseModal } from './useModal'
import { Button } from '../ui/buttons'

import style from '../../scss/modal.module.scss'

const Confirmation = ({ text, onAccept, onDecline }) => {
  const close = useCloseModal()
  return (
    <div className={style.confirmation}>
      <p>{text}</p>
      <Button
        onClick={() => {
          onDecline()
          close()
        }}
      >
        Nej
      </Button>
      <Button
        onClick={() => {
          onAccept()
          close()
        }}
      >
        Ja
      </Button>
    </div>
  )
}

Confirmation.propTypes = {
  text: PropTypes.string,
  onAccept: PropTypes.func,
  onDecline: PropTypes.func,
}

Confirmation.defaultProps = {
  text: 'Är du säker?',
  onAccept: () => {},
  onDecline: () => {},
}

export default function useConfirmModal() {
  const [openModal, isOpen] = useModal(Confirmation)

  const open = (text, onAccept, onDecline) => {
    openModal('', { text, onAccept, onDecline })
  }

  return [open, isOpen]
}
