import { BrowserQRCodeReader } from "@zxing/browser";
import { useCallback, useEffect, useRef, useState } from "react";

const QrScanner = ({ onSubmit, refresh }) => {
  const videoElement = useRef(null);
  const [qrScannerState, setQrScannerState] = useState(false);
  const codeReader = useRef(new BrowserQRCodeReader());

  const reloadQrScanner = useCallback(() => {
    return setTimeout(() => {
      setQrScannerState((state) => !state);
    }, 1500);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <Refresh should refresh the effect>
  useEffect(() => {
    let cancelled = false;
    let controls;
    let reloadTimeout;

    const startTimeout = setTimeout(async () => {
      try {
        controls = await codeReader.current.decodeFromVideoDevice(
          undefined,
          videoElement.current,
          (result, _error, scanControls) => {
            if (!result || cancelled) return;

            scanControls.stop();
            onSubmit({ text: result.getText() });
            reloadTimeout = reloadQrScanner();
          },
        );

        if (cancelled) {
          controls.stop();
        }
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(startTimeout);
      clearTimeout(reloadTimeout);
      controls?.stop();
    };
  }, [onSubmit, reloadQrScanner, qrScannerState, refresh]);

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
