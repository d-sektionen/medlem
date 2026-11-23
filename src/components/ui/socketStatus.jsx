import { useEffect, useRef, useState } from "react";
import { useSocketStatus } from "../request/socket";
import { Button } from "./buttons";
import {
  dot,
  indicator,
  toast,
  toastError,
  toastRegion,
  toastSuccess,
} from "./socketStatus.module.css";

// Keyed by the reason for a disconnect when there is one, else by the status.
const LABELS = {
  connecting: "Ansluter till D-cide …",
  connected: "Ansluten till D-cide",
  disconnected: "Anslutningen bröts, återansluter …",
  offline: "Ingen internetanslutning",
  unauthorized: "Utloggad, ladda om sidan",
};

/** Small coloured dot with a label showing the WebSocket connection status. */
export function SocketStatusIndicator() {
  const { status, reason } = useSocketStatus();

  return (
    <p className={indicator} data-status={status}>
      <span className={dot} aria-hidden="true" />
      {LABELS[reason ?? status]}
    </p>
  );
}

const ReloadButton = () => (
  <Button onClick={() => window.location.reload()}>Ladda om sidan</Button>
);

const STALLED_AFTER = 20_000;

/**
 * Tells the user that the connection is lost and what they need to do about
 * it, if anything. Mounted for as long as the socket stays disconnected.
 */
function DisconnectedToast({ reason, stale }) {
  const [stalled, setStalled] = useState(false);
  const notUpdating =
    stale && `${stale} uppdateras inte förrän anslutningen är tillbaka.`;

  useEffect(() => {
    const timer = setTimeout(() => setStalled(true), STALLED_AFTER);
    return () => clearTimeout(timer);
  }, []);

  let content = (
    <p>
      <strong>Anslutningen till D-cide bröts.</strong> Återansluter automatiskt,
      du behöver inte göra något. {notUpdating}
    </p>
  );

  if (reason === "offline") {
    content = (
      <p>
        <strong>Du saknar internetanslutning.</strong> Kontrollera ditt wifi
        eller din mobildata. D-cide återansluter automatiskt när du är online
        igen. {notUpdating}
      </p>
    );
  } else if (reason === "unauthorized") {
    content = (
      <>
        <p>
          <strong>Du har loggats ut.</strong> Ladda om sidan och logga in igen
          för att fortsätta följa mötet. {notUpdating}
        </p>
        <ReloadButton />
      </>
    );
  } else if (stalled) {
    content = (
      <>
        <p>
          <strong>Anslutningen till D-cide bröts.</strong> Återanslutningen tar
          längre tid än väntat. Kontrollera din internetanslutning eller ladda
          om sidan. {notUpdating}
        </p>
        <ReloadButton />
      </>
    );
  }

  return (
    <div className={`${toast} ${toastError}`} role="alert">
      {content}
    </div>
  );
}

const RECONNECTED_TOAST_DURATION = 4_000;

/**
 * Fixed notice that appears while the WebSocket is disconnected and briefly
 * confirms when the connection is back.
 *
 * `stale` names what the page loads over the socket, for example
 * "Omröstningar och talarlistan", so the notice can say what stops updating.
 * Leave it out on pages that do not show any socket-driven content.
 */
export function SocketStatusToast({ stale }) {
  const { status, reason } = useSocketStatus();
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
        <DisconnectedToast reason={reason} stale={stale} />
      )}
      {showReconnected && (
        <div className={`${toast} ${toastSuccess}`}>
          Återansluten till D-cide.
        </div>
      )}
    </div>
  );
}
