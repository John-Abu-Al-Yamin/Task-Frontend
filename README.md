Parking Reservation System — Frontend (Next.js + TypeScript)
Overview

**Repository**
https://github.com/John-Abu-Al-Yamin/Task-Frontend




Framework: Next.js (App Router)

Language: TypeScript

State & Data Fetching: Used RTK Query only instead of combining Redux Toolkit + React Query to reduce complexity and boilerplate while still getting caching, invalidations, and retries in one library.

WebSocket: Implemented via the browser API with a simple wrapper.

UI/UX: Minimal UI components with clear loading/error states.



Why RTK Query?

Single library to manage fetching, caching, and synchronization instead of mixing multiple tools.

Excellent TypeScript support with auto-generated types from server responses.

Built-in caching and revalidation policies, plus support for optimistic updates when needed. 


Features Coverage
1. Gate Screen (/gate/[id])

Tabs for Visitor and Subscriber.

Shows parking zones with server status indicators (occupied, free, reserved, available, etc.).

Zone selection enabled/disabled based on open and availableForVisitors.

Complete check-in flow for visitors and subscribers.

Printable ticket after check-in.

Real-time updates via WebSocket (zone-update, admin-update). 

2. Checkpoint Screen (/checkpoint)

Employee login.

Ticket number input with validation.

Shows breakdown and amount exactly as returned from the server.

Supports forced conversion from subscription to visitor (forceConvertToVisitor).

3. Admin Panel (/admin/*)

Admin login.

Manage employees.

View parking reports and zone status.

Open/close zones.

Update pricing categories.

Add rush hours and vacations.

Live activity log via WebSocket.

✅ Rule respected: No business logic on the frontend — the app only displays fields exactly as returned from the server. 



Project Structure

Organized for clarity and teamwork:
app/
  gate/[id]/page.tsx       # Gate screen
  checkpoint/page.tsx      # Checkpoint screen
  admin/page.tsx           # Admin panel

src/
  components/              # Reusable UI components
    GateHeader.tsx
    ZoneCard.tsx
    TicketModal.tsx
    CheckoutPanel.tsx
    AdminReports.tsx

  services/                # API layer (RTK Query + WebSocket wrapper)
    api.ts
    ws.ts

  store/                   # Additional state slices if needed
  types/                   # Shared TypeScript types
  validations/             # Form validation schemas


Implementation Notes

All amounts, breakdowns, and reservations are rendered as returned from the backend.

Clear loading/error states throughout the app.

WebSocket connection status indicator.

Printable ticket from the check-in screen. 


