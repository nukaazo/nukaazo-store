/**
 * AppAlertBridge
 * Mounts inside AppAlertProvider and registers the show/hide functions
 * with the global `appAlert` singleton so handlers can call them
 * without needing the React context directly.
 */
import { useEffect } from "react";
import { initAppAlert, useAppAlert } from "@/lib/AppAlert";

export function AppAlertBridge() {
  const { show, hide } = useAppAlert();
  useEffect(() => {
    initAppAlert(show, hide);
  }, [show, hide]);
  return null;
}
