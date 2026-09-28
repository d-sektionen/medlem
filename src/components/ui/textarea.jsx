import { textarea } from "./textarea.module.css";

const TextArea = ({ value, onChange, id }) => {
  return (
    <textarea
      className={textarea}
      value={value}
      id={id}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextArea;
