import { useSyncExternalStore } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "../../config";
import backendService from "./backendService";

const joinedRooms = new Set();

const socket = io(BASE_URL, {
  withCredentials: true,
  path: "/ws",
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1_000,
  reconnectionDelayMax: 30_000,
  randomizationFactor: 0.3,
});

/*
 * Connection status store.
 *
 * status:
 * "connecting":   no connection has been attempted to completion yet.
 * "connected":    the socket is connected and has (re)joined its rooms.
 * "disconnected": the connection was lost or could not be established; a
 *                 reconnect is always pending while in this state.
 *
 * reason, only set while disconnected, tells why reconnecting cannot succeed
 * until the user does something:
 * "offline":      the browser reports that it has no network connection.
 * "unauthorized": the session has expired and the user has to log in again.
 * null:           nothing for the user to do, reconnecting is automatic.
 */
let state = {
  status: socket.connected ? "connected" : "connecting",
  reason: null,
};
let sessionExpired = false;
const statusListeners = new Set();

function setStatus(status) {
  let reason = null;
  if (status === "disconnected") {
    if (navigator.onLine === false) reason = "offline";
    else if (sessionExpired) reason = "unauthorized";
  }
  if (status === state.status && reason === state.reason) return;

  state = { status, reason };
  statusListeners.forEach((listener) => {
    listener();
  });
}

function subscribeStatus(listener) {
  statusListeners.add(listener);
  return () => statusListeners.delete(listener);
}

function getState() {
  return state;
}

/** Returns the WebSocket connection state as `{ status, reason }`. */
export function useSocketStatus() {
  return useSyncExternalStore(subscribeStatus, getState);
}

/*
 * socket.io only reconnects by itself after transport-level failures. When the
 * server closes the connection or rejects the handshake (for example because
 * the access token cookie expired), the socket goes inactive and stays
 * disconnected. In that case we refresh the session and reconnect ourselves,
 * with the same kind of backoff socket.io uses.
 */
const MANUAL_RETRY_BASE_DELAY = 1_000;
const MANUAL_RETRY_MAX_DELAY = 30_000;
let manualRetryTimer = null;
let manualRetryAttempts = 0;

function clearManualRetry() {
  clearTimeout(manualRetryTimer);
  manualRetryTimer = null;
}

function scheduleManualReconnect() {
  if (manualRetryTimer) return;

  const backoff = Math.min(
    MANUAL_RETRY_BASE_DELAY * 2 ** manualRetryAttempts,
    MANUAL_RETRY_MAX_DELAY,
  );
  const delay = backoff * (0.7 + Math.random() * 0.6);
  manualRetryAttempts += 1;

  manualRetryTimer = setTimeout(async () => {
    manualRetryTimer = null;
    try {
      // Any authenticated request refreshes an expired access token through
      // the axios-auth-refresh interceptor, so the handshake gets a valid
      // cookie.
      await backendService.get("/account/me/");
      sessionExpired = false;
    } catch (error) {
      // A 401 means that refreshing the session failed as well, so the user
      // has to log in again. Any other error means the backend is unreachable.
      // Either way connecting fails and is retried, which also picks up a
      // session that was renewed in another tab.
      sessionExpired = error.response?.status === 401;
    }
    socket.connect();
  }, delay);
}

socket.on("connect", () => {
  clearManualRetry();
  manualRetryAttempts = 0;
  sessionExpired = false;
  joinedRooms.forEach((room) => {
    socket.emit("join", { room });
  });
  setStatus("connected");
});

socket.on("disconnect", (reason) => {
  console.warn(`Disconnected from WebSocket server: ${reason}`);
  setStatus("disconnected");
  if (!socket.active) scheduleManualReconnect();
});

socket.on("connect_error", (error) => {
  console.warn(`Could not connect to WebSocket server: ${error.message}`);
  setStatus("disconnected");
  if (!socket.active) scheduleManualReconnect();
});

/*
 * Browsers throttle timers in background tabs and the backoff can grow to
 * 30 seconds, so reconnect right away when the network comes back or the tab
 * becomes visible again instead of waiting for the next scheduled attempt.
 */
function reconnectNow() {
  if (socket.connected) return;
  clearManualRetry();
  manualRetryAttempts = 0;
  // disconnect() also cancels a pending socket.io reconnect and resets its
  // backoff; the rooms are kept in joinedRooms and rejoined on connect.
  socket.disconnect().connect();
}

if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    setStatus(state.status);
    reconnectNow();
  });
  // Recompute the reason so the user is told to check their network.
  window.addEventListener("offline", () => setStatus(state.status));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") reconnectNow();
  });
}

export function joinRoom(room) {
  joinedRooms.add(room);
  socket.emit("join", { room });
}

export function leaveRoom(room) {
  joinedRooms.delete(room);
  socket.emit("leave", { room });
}

export default socket;
