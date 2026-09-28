import { textarea } from "../../scss/textarea.module.scss";

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
