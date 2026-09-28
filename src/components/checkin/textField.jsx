import { useCallback, useEffect, useRef, useState } from "react";

import { textField } from "./checkin.module.css";

const useTextField = (onEnter, elem) => {
  // State for keeping track of whether key is pressed
  const [text, setText] = useState("");
  const regex = /^[A-Za-z0-9]+$/;

  // If pressed key is our target key then set to true
  const downHandler = useCallback(
    (e) => {
      const keyChar = String.fromCharCode(e.keyCode);
      if (e.key === "Enter") {
        setText((prev) => {
          if (prev !== "") onEnter({ text: prev, shift: e.shiftKey });
          return "";
        });
        // Remove event listeners on cleanup
      } else if (e.key === "Backspace") {
        setText((prev) => prev.slice(0, -1));
      } else if (regex.test(keyChar)) {
        // console.log(keyCode + ' - ' + key + ' - ' + String.fromCharCode(keyCode))
        setText((prev) => (prev.length > 20 ? prev : `${prev}${keyChar}`));
      }
    },
    [onEnter],
  );

  // Add event listeners
  useEffect(() => {
    if (elem) {
      elem.current.addEventListener("keydown", downHandler);
      // Remove event listeners on cleanup
      return () => {
        if (!elem?.current) return;
        elem.current.removeEventListener("keydown", downHandler);
      };
    }
    return () => {};
  }, [elem, downHandler]);

  return text;
};

const TextField = ({ onSubmit }) => {
  const elem = useRef(null);
  const text = useTextField(onSubmit, elem);

  return (
    // biome-ignore lint/a11y/useSemanticElements: <div is used here, a full reimplementation is needed to use a semantic element>
    <div ref={elem} role="textbox" tabIndex={0} className={textField}>
      {text}
    </div>
  );
};

const CompatibilityTextField = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  return (
    <input
      className={textField}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setValue((prev) => {
            if (prev !== "") onSubmit({ text: prev });
            return "";
          });
        }
      }}
      value={value}
    />
  );
};

export { CompatibilityTextField, TextField };
