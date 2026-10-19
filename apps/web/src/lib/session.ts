import { useSyncExternalStore } from 'react';

interface MemorySession {
  accessToken: string;
  refreshToken: string;
}

let currentSession: MemorySession | null = null;
const listeners = new Set<() => void>();

export function setSession(session: MemorySession | null) {
  currentSession = session;
  listeners.forEach((listener) => listener());
}

export function getSession() {
  return currentSession;
}

export function hasSession() {
  return currentSession !== null;
}

export function useSession() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSession,
    () => null,
  );
}

let pendingVerification: { email: string; token?: string } | null = null;

export function setPendingVerification(value: { email: string; token?: string } | null) {
  pendingVerification = value;
}

export function getPendingVerification() {
  return pendingVerification;
}
