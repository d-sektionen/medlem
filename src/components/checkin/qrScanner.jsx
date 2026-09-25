import React, { useState, useRef, useEffect } from "react";

import { BrowserQRCodeReader } from "@zxing/browser";

const QrScanner = ({ onSubmit, refresh }) => {
  const videoElement = useRef(null);
  const [qrScannerState, setQrScannerState] = useState(false);
  const codeReader = new BrowserQRCodeReader();

  const reloadQrScanner = () => {
    return setTimeout(() => {
      setQrScannerState((state) => !state);
    }, 1500);
  };

  useEffect(() => {
    let controls;
    let reloadTimeout;

    const startTimeout = setTimeout(() => {
      codeReader
        .decodeOnceFromVideoDevice(undefined, videoElement.current)
        .then((result) => {
          onSubmit({ text: result.getText() });
          reloadTimeout = reloadQrScanner();
        })
        .catch((err) => console.error(err));
    }, 500);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(reloadTimeout);
      controls?.stop();
    };
  }, [qrScannerState, refresh]);

  return (
    <video
      ref={videoElement}
      muted
      style={{ display: "block" }}
      width="100%"
      height="auto"
    />
  );
};

export default QrScanner;
