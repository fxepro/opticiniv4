/**
 * Timed logout: decodes JWT exp and logs out when the session expires.
 * Runs a periodic check so token refresh is respected.
 */
"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

function getTokenExpiryMs(token: string): number | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    const data = JSON.parse(json);
    const exp = data.exp;
    if (typeof exp !== "number") return null;
    return exp * 1000;
  } catch {
    return null;
  }
}

function doLogout(router: ReturnType<typeof useRouter>) {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  toast.info("Session expired. Please log in again.");
  router.push("/workspace/login?error=" + encodeURIComponent("Session expired. Please log in again."));
}

const CHECK_INTERVAL_MS = 60_000; // Check every minute

export function useTimedLogout() {
  const router = useRouter();
  const pathname = usePathname();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (pathname === "/workspace/login") return;

    const check = () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const expMs = getTokenExpiryMs(token);
      if (!expMs) return;

      const now = Date.now();
      const bufferMs = 5000; // Log out 5 seconds before expiry
      if (now >= expMs - bufferMs) {
        doLogout(router);
      }
    };

    check();
    const id = setInterval(check, CHECK_INTERVAL_MS);
    intervalRef.current = id;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [pathname, router]);
}
