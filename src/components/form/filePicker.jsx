import { useEffect, useId, useRef, useState } from "react";
import { FiImage, FiTrash2 } from "react-icons/fi";

import {
  bottomBar,
  dragging,
  dropzone,
  fileLabel,
  fileMeta,
  filePicker,
  filePreview,
  hiddenInput,
} from "./filePicker.module.css";

const FilePicker = ({
  label,
  value,
  onChange,
  accept = "image/*",
  required = false,
  existingUrl,
  canClear = true,
}) => {
  const id = useId();
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(existingUrl ?? null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!value) {
      setPreview(existingUrl ?? null);
      return;
    }

    const url = URL.createObjectURL(value);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [value, existingUrl]);

  const choose = (chosen) => {
    onChange(chosen ?? null);
  };

  const clear = () => {
    choose(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    choose(event.dataTransfer.files?.[0]);
  };

  return (
    <div className={filePicker}>
      <label className={fileLabel} htmlFor={id}>
        {label}
        {required && <span>*</span>}
      </label>

      <label
        className={`${dropzone} ${isDragging ? dragging : ""}`}
        htmlFor={id}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          className={hiddenInput}
          id={id}
          type="file"
          accept={accept}
          aria-label={label}
          required={required}
          onChange={(event) => choose(event.target.files?.[0])}
        />

        {preview ? (
          <img className={filePreview} src={preview} alt="Förhandsgranskning" />
        ) : (
          <FiImage aria-hidden="true" />
        )}

        <div className={fileMeta}>
          {!value && (
            <span>
              Klicka här för att välja eller dra och släpp en fil här.
            </span>
          )}
        </div>
      </label>

      {canClear && value && (
        <div className={bottomBar}>
          <span>{value.name}</span>

          <button type="button" onClick={clear}>
            <FiTrash2 /> Ta bort
          </button>
        </div>
      )}
    </div>
  );
};

export default FilePicker;
