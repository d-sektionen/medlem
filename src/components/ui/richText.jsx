import "../../scss/richText.module.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichText = ({ value, onChange, id }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean", "code-block"],
    ],
  };

  return (
    <ReactQuill
    id={id}
      modules={modules}
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
};

export default RichText;
