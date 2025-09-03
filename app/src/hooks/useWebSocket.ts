import { useEffect, useState } from "react";
import { wsService, WebSocketMessage, AdminUpdatePayload } from "../services/websocket";

export interface UseWebSocketOptions {
  onZoneUpdate?: (zoneData: any) => void;
  onAdminUpdate?: (adminData: AdminUpdatePayload) => void;
  gateId?: string;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const [connectionState, setConnectionState] = useState<"connecting" | "open" | "closed" | "error">("closed");
  const [adminUpdates, setAdminUpdates] = useState<AdminUpdatePayload[]>([]);

  useEffect(() => {
    // Update connection state
    const updateConnectionState = () => {
      setConnectionState(wsService.getConnectionState());
    };

    // Initial state
    updateConnectionState();

    // Set up message handler
    const messageHandler = (message: WebSocketMessage) => {
      switch (message.type) {
        case "zone-update":
          options.onZoneUpdate?.(message.payload);
          break;
        case "admin-update":
          const adminData = message.payload as AdminUpdatePayload;
          options.onAdminUpdate?.(adminData);
          
          // Add to admin updates log
          setAdminUpdates(prev => [
            adminData,
            ...prev.slice(0, 9) // Keep only last 10 updates
          ]);
          break;
      }
    };

    wsService.addMessageHandler(messageHandler);

    // Subscribe to gate if provided
    if (options.gateId) {
      wsService.subscribe(options.gateId);
    }

    // Set up connection state polling
    const interval = setInterval(updateConnectionState, 1000);

    return () => {
      wsService.removeMessageHandler(messageHandler);
      if (options.gateId) {
        wsService.unsubscribe(options.gateId);
      }
      clearInterval(interval);
    };
  }, [options.gateId, options.onZoneUpdate, options.onAdminUpdate]);

  const connect = () => wsService.connect();
  const disconnect = () => wsService.disconnect();

  return {
    connectionState,
    adminUpdates,
    connect,
    disconnect,
  };
}
