import { store } from "../store/store";
import { apiSlice } from "./api";

export interface WebSocketMessage {
  type: "zone-update" | "admin-update";
  payload: any;
}

export interface AdminUpdatePayload {
  adminId: string;
  action:
    | "category-rates-changed"
    | "zone-closed"
    | "zone-opened"
    | "vacation-added"
    | "rush-updated";
  targetType: "category" | "zone" | "vacation" | "rush";
  targetId: string;
  details?: any;
  timestamp: string;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private isConnecting = false;
  private subscriptions = new Set<string>();
  private messageHandlers = new Set<(message: WebSocketMessage) => void>();

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    try {
      this.ws = new WebSocket("ws://localhost:3000/api/v1/ws");

      this.ws.onopen = () => {
        console.log("WebSocket connected");
        this.isConnecting = false;
        this.reconnectAttempts = 0;

        // Resubscribe to all previous subscriptions
        this.subscriptions.forEach((gateId) => {
          this.subscribe(gateId);
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.log("Failed to parse WebSocket message:", error);
        }
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected");
        this.isConnecting = false;
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.log("WebSocket error:", error);
        this.isConnecting = false;
      };
    } catch (error) {
      console.log("Failed to create WebSocket connection:", error);
      this.isConnecting = false;
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log("Max reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(
      `Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`
    );

    setTimeout(() => {
      this.connect();
    }, delay);
  }

  private handleMessage(message: WebSocketMessage) {
    console.log("WebSocket message received:", message);

    // Notify all registered handlers
    this.messageHandlers.forEach((handler) => {
      try {
        handler(message);
      } catch (error) {
        console.error("Error in WebSocket message handler:", error);
      }
    });

    // Handle specific message types
    switch (message.type) {
      case "zone-update":
        this.handleZoneUpdate(message.payload);
        break;
      case "admin-update":
        this.handleAdminUpdate(message.payload);
        break;
    }
  }

  private handleZoneUpdate(zoneData: any) {
    // Invalidate relevant queries to trigger refetch
    store.dispatch(apiSlice.util.invalidateTags(["Zones"]));
  }

  private handleAdminUpdate(adminData: AdminUpdatePayload) {
    // Invalidate relevant queries based on the action
    const tagsToInvalidate = ["Zones"];

    switch (adminData.action) {
      case "category-rates-changed":
        tagsToInvalidate.push("Categories");
        break;
      case "zone-closed":
      case "zone-opened":
        tagsToInvalidate.push("Zones");
        break;
      case "vacation-added":
        tagsToInvalidate.push("Vacations");
        break;
      case "rush-updated":
        tagsToInvalidate.push("RushHours");
        break;
    }

    tagsToInvalidate.forEach((tag) => {
      store.dispatch(apiSlice.util.invalidateTags([tag]));
    });
  }

  subscribe(gateId: string) {
    this.subscriptions.add(gateId);

    if (this.ws?.readyState === WebSocket.OPEN) {
      this.send({
        type: "subscribe",
        payload: { gateId },
      });
    }
  }

  unsubscribe(gateId: string) {
    this.subscriptions.delete(gateId);

    if (this.ws?.readyState === WebSocket.OPEN) {
      this.send({
        type: "unsubscribe",
        payload: { gateId },
      });
    }
  }

  private send(message: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected, cannot send message:", message);
    }
  }

  addMessageHandler(handler: (message: WebSocketMessage) => void) {
    this.messageHandlers.add(handler);
  }

  removeMessageHandler(handler: (message: WebSocketMessage) => void) {
    this.messageHandlers.delete(handler);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscriptions.clear();
    this.messageHandlers.clear();
    this.reconnectAttempts = 0;
  }

  getConnectionState(): "connecting" | "open" | "closed" | "error" {
    if (this.isConnecting) return "connecting";
    if (!this.ws) return "closed";

    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return "connecting";
      case WebSocket.OPEN:
        return "open";
      case WebSocket.CLOSING:
      case WebSocket.CLOSED:
        return "closed";
      default:
        return "error";
    }
  }
}

// Create a singleton instance
export const wsService = new WebSocketService();

// Auto-connect when the service is imported
if (typeof window !== "undefined") {
  wsService.connect();
}
