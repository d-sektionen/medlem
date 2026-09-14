import React from "react";
import { textarea } from "../../scss/textarea.module.scss";

const TextArea = ({ value, onChange }) => {
  return (
    <textarea
      className={textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextArea;
