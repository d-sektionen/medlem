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

    const startTimeout = setTimeout(async () => {
      controls = await codeReader.decodeFromVideoDevice(
        undefined,
        videoElement.current,
        (result, error, scanControls) => {
          if (!result) return;

          scanControls.stop();
          onSubmit({ text: result.getText() });
          reloadTimeout = reloadQrScanner();
        }
      );
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