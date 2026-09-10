import PropTypes from "prop-types";
import React from "react";
import { confirmation } from "../../scss/modal.module.scss";
import { Button } from "../ui/buttons";
import useModal, { useCloseModal } from "./useModal";

const Confirmation = ({
  text = "Är du säker?",
  onAccept = () => {},
  onDecline = () => {},
}) => {
  const close = useCloseModal();
  return (
    <div className={confirmation}>
      <p>{text}</p>
      <Button
        onClick={() => {
          onDecline();
          close();
        }}
      >
        Nej
      </Button>
      <Button
        onClick={() => {
          onAccept();
          close();
        }}
      >
        Ja
      </Button>
    </div>
  );
};

Confirmation.propTypes = {
  text: PropTypes.string,
  onAccept: PropTypes.func,
  onDecline: PropTypes.func,
};

export default function useConfirmModal() {
  const [openModal, isOpen] = useModal(Confirmation);

  const open = (text, onAccept, onDecline) => {
    openModal("", { text, onAccept, onDecline });
  };

  return [open, isOpen];
}
