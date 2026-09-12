import PropTypes from "prop-types";
import React, { useState } from "react";
import Modal from "./modal";
import ModalContext from "./modalContext";

const ModalHandler = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [content, setContent] = useState(<React.Fragment />);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState({});
  return (
    <ModalContext.Provider
      value={{
        isOpen,
        content,
        title,
        options,
        setOpen,
        setContent,
        setTitle,
        setOptions,
      }}
    >
      <Modal
        isOpen={isOpen}
        content={content}
        title={title}
        options={options}
        setOpen={setOpen}
      >
        {content}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

ModalHandler.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalHandler;
