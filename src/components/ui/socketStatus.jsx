import { useEffect, useRef, useState } from "react";
import { useSocketStatus } from "../request/socket";
import {
  dot,
  indicator,
  toast,
  toastError,
  toastRegion,
  toastSuccess,
} from "./socketStatus.module.css";

const LABELS = {
  connecting: "Ansluter till live-uppdateringar …",
  connected: "Live-uppdateringar anslutna",
  disconnected: "Anslutningen bröts, återansluter …",
};

/** Small coloured dot with a label showing the WebSocket connection status. */
export function SocketStatusIndicator() {
  const status = useSocketStatus();

  return (
    <p className={indicator} data-status={status}>
      <span className={dot} aria-hidden="true" />
      {LABELS[status]}
    </p>
  );
}

const RECONNECTED_TOAST_DURATION = 4_000;

/**
 * Fixed notice that appears while the WebSocket is disconnected and briefly
 * confirms when the connection is back.
 */
export function SocketStatusToast() {
  const status = useSocketStatus();
  const previousStatus = useRef(status);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const wasDisconnected = previousStatus.current === "disconnected";
    previousStatus.current = status;

    if (status !== "connected") {
      setShowReconnected(false);
      return;
    }
    if (!wasDisconnected) return;

    setShowReconnected(true);
    const timer = setTimeout(
      () => setShowReconnected(false),
      RECONNECTED_TOAST_DURATION,
    );
    return () => clearTimeout(timer);
  }, [status]);

  return (
    // The live region is always rendered so screen readers pick up changes.
    <div className={toastRegion} aria-live="polite">
      {status === "disconnected" && (
        <div className={`${toast} ${toastError}`} role="alert">
          <strong>Anslutningen till D-cide bröts.</strong> Försöker återansluta
          … Omröstningar och talarlistan uppdateras inte förrän anslutningen är
          tillbaka.
        </div>
      )}
      {showReconnected && (
        <div className={`${toast} ${toastSuccess}`}>
          Återansluten till D-cide.
        </div>
      )}
    </div>
  );
}
