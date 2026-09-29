import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { post } from "../request";
import {
  previewFrame,
  errorContainer,
  errorTitle,
  errorBody,
  errorMessageClass,
  loadingContainer,
  loading,
  loadingSpinner,
} from "./mailPreview.module.css";
import { FiLoader } from "react-icons/fi";
import Window from "../ui/window";
import { useRef } from "react";

const Preview = ({ subject, content, infoChiefContent }) => {
  const iframeRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [scroll, setScroll] = useState({ top: 0, left: 0 });

  const saveCurrentScroll = useCallback(() => {
    const win = iframeRef.current?.contentWindow;

    setScroll({
      top: win?.scrollY,
      left: win?.scrollX,
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    // Fetch preview
    const controller = new AbortController();
    const signal = controller.signal;
    let isLatest = true;

    post("/mail/preview/", { content, infoChiefContent }, { signal })
      .then((data) => {
        if (!isLatest) return; // ignore stale response

        saveCurrentScroll();

        setPreview(data.data);
        setErrorMessage(null);
      })
      .catch((err) => {
        if (!isLatest) return;
        if (axios.isCancel(err) || err.name === "CanceledError") return;
        setErrorMessage(err.message);
      })
      .finally(() => {
        if (isLatest) {
          setIsLoading(false);
        }
      });

    return () => {
      isLatest = false;
      controller.abort();
    };
  }, [content, infoChiefContent, saveCurrentScroll]);

  function handleFrameLoad(event) {
    const frameWindow = event.target.contentWindow;
    if (!frameWindow) {
      return;
    }

    try {
      frameWindow.scrollTo(scroll);
    } catch (err) {
      console.warn("Could not scroll the mail preview into position:", err);
    }
  }

  return (
    <Window title={`Ämne: ${subject}`}>
      {errorMessage ? (
        <div className={errorContainer}>
          <h1 className={errorTitle}>Kunde inte generera förhandsgranskning</h1>
          <p className={errorBody}>
            Ett problem uppstod när förhandsgranskningen av mailet skulle
            hämtas.
          </p>
          <pre className={errorMessageClass}>{errorMessage}</pre>
        </div>
      ) : (
        <iframe
          title="preview"
          ref={iframeRef}
          srcDoc={preview}
          className={previewFrame}
          sandbox="allow-same-origin" // allow scrollTo
          onLoad={handleFrameLoad}
        ></iframe>
      )}

      {isLoading ? (
        <div className={loadingContainer}>
          <div className={loading}>
            <FiLoader className={loadingSpinner} />
            Laddar förhandsgranskning&#8230;
          </div>
        </div>
      ) : null}
    </Window>
  );
};

export default Preview;
