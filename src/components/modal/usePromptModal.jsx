import PropTypes from "prop-types";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Button } from "../ui/buttons";
import { promptActions, promptForm } from "./modal.module.css";
import useModal, { useCloseModal } from "./useModal";

/*
The body of the prompt modal. Answers are reported through `onSubmit`, cancellations
through `onCancel`, so that `usePromptModal` can settle the promise returned by
`prompt()`.
*/
const Prompt = ({
  message = "",
  defaultValue = "",
  submitLabel = "OK",
  cancelLabel = "Avbryt",
  onSubmit = () => {},
  onCancel = () => {},
}) => {
  const close = useCloseModal();
  const [value, setValue] = useState(defaultValue);
  const input = useRef(null);
  const messageId = useId();

  // The browser's prompt() opens with the field focused and its default value
  // selected, so typing immediately replaces it.
  useEffect(() => {
    input.current?.focus();
    input.current?.select();
  }, []);

  const cancel = () => {
    onCancel();
    close();
  };

  return (
    <form
      className={promptForm}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
        close();
      }}
    >
      <p id={messageId}>{message}</p>
      <input
        ref={input}
        aria-labelledby={messageId}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <div className={promptActions}>
        <Button onClick={cancel}>{cancelLabel}</Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
};

Prompt.propTypes = {
  message: PropTypes.string,
  defaultValue: PropTypes.string,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

/*
A drop-in replacement for the browser's `window.prompt()`.

    const [prompt] = usePromptModal();
    const name = await prompt("Vad ska mötet heta?", "Styrelsemöte");
    if (name === null) return; // The user cancelled.

Returns a promise that resolves to the entered string, or to `null` when the prompt
is dismissed (cancel, Escape, the close icon, or a click on the overlay), matching
the native API.
*/
export default function usePromptModal() {
  const [openModal, isOpen] = useModal(Prompt);
  const settle = useRef(null);

  const finish = useCallback((answer) => {
    const resolve = settle.current;
    settle.current = null;
    if (resolve) {
      resolve(answer);
    }
  }, []);

  // Any dismissal that does not come from the form itself (Escape, overlay click,
  // close icon) simply closes the modal, which the native prompt() reports as null.
  useEffect(() => {
    if (!isOpen) {
      finish(null);
    }
  }, [isOpen, finish]);

  const prompt = (message = "", defaultValue = "", options = {}) => {
    // A prompt that is replaced without an answer counts as a cancellation.
    finish(null);

    const answer = new Promise((resolve) => {
      settle.current = resolve;
    });

    openModal("", {
      message,
      defaultValue,
      ...options,
      onSubmit: (value) => finish(value),
      onCancel: () => finish(null),
    });

    return answer;
  };

  return [prompt, isOpen];
}
