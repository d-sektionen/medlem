import { BrowserQRCodeReader } from "@zxing/library";
import { useCallback, useEffect, useRef, useState } from "react";

const QrScanner = ({ onSubmit, refresh }) => {
  const videoElement = useRef(null);
  const [qrScannerState, setQrScannerState] = useState(false);
  // TODO: Swap zxing/library for zxing/browser as this class was moved there.
  const codeReader = new BrowserQRCodeReader();

  const reloadQrScanner = useCallback(() => {
    setTimeout(() => {
      codeReader.reset();
      setQrScannerState(!qrScannerState);
    }, 1500);
  }, [qrScannerState, codeReader]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <Refresh should refresh the effect>
  useEffect(() => {
    setTimeout(() => {
      codeReader
        .decodeOnceFromVideoDevice(undefined, videoElement.current)
        .then((result) => {
          onSubmit({ text: result.text });
          reloadQrScanner();
        })
        .catch((err) => console.error(err));
    }, 500);

    return () => codeReader.reset();
  }, [onSubmit, reloadQrScanner, codeReader, refresh]);

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
