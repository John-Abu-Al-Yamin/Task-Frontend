// 🟢 Basic Types
export interface Gate {
  id: string;
  name: string;
  location?: string; 
}

export interface Zone {
  id: string;
  name: string;
  gateId: string;
}

export interface User {
  username: string;
  role: "admin" | "employee" | "visitor";
}

// 🟢 Authentication Types
export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

// 🟢 Ticket Types
export interface Ticket {
  id: string;
  type: "visitor" | "subscriber";
  status: string;
  price?: number;
  zoneId: string;
  gateId: string;
  checkinAt: string | null;
  checkoutAt: string | null;
  subscriptionId?: string;
  plateNumber?: string;
}

export interface CheckInRequest {
  gateId: string;
  zoneId: string;
  type: "visitor" | "subscriber";
  subscriptionId?: string;   // اختياري لو subscriber
  plateNumber?: string;      // اختياري لو visitor
}

export interface CheckoutRequest {
  ticketId: string;
  forceConvertToVisitor?: boolean;
}

// 🟢 Invoice Types
export interface Invoice {
  ticketId: string;
  checkinAt: string;
  checkoutAt: string;
  durationHours: number;
  breakdown: {
    from: string;
    to: string;
    hours: number;
    rateMode: string;
    rate: number;
    amount: number;
  }[];
  amount: number;
  zoneState: {
    id: string;
    name: string;
    categoryId: string;
    gateIds: string[];
    totalSlots: number;
    occupied: number;
    free: number;
    reserved: number;
    availableForVisitors: number;
    availableForSubscribers: number;
    rateNormal: number;
    rateSpecial: number;
    open: boolean;
  };
}

// 🟢 Subscription Types
export interface Subscription {
  id: string;
  userName?: string;

  // الحقل اللي كان اسمه category في السيرفر
  category?: string;

  active: boolean;

  // بدل validUntil/expiresAt
  expiresAt: string;

  // بدل vehicles/cars
  cars: {
    plate: string;
    brand?: string;
    model?: string;
    color?: string;
  }[];

  // موجودة اختياريًا من السيرفر
  currentCheckins: {
    ticketId: string;
    zoneId: string;
    checkinAt: string;
  }[];
}


// 🔧 Admin Types
export interface AdminUser {
  id: string;
  username: string;
  role: "admin" | "employee";
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  // description?: string;
  rateNormal: number;
  rateSpecial: number;
}

// 🔹 تعديل AdminZone لتوافق البيانات اللي بتيجي من السيرفر
export interface AdminZone {
  id: string; // 👈 بدل zoneId
  name: string;
  categoryId?: string;
  gateIds?: string[];
  totalSlots: number;
  occupied: number;
  free: number;
  reserved: number;
  availableForVisitors: number;
  availableForSubscribers: number;
  subscriberCount: number;
  rateNormal?: number;
  rateSpecial?: number;
  open: boolean;
}

export interface ParkingStateReport {
  zones: AdminZone[];
}

// 🔹 Alternative type if API returns zones array directly
export type ParkingStateReportResponse = AdminZone[] | ParkingStateReport;

export interface RushHour {
  id: string;
  weekDay: number;
  from: string;
  to: string;
}

export interface Vacation {
  id: string;
  name: string;
  from: string;
  to: string;
}

// 🔧 Admin Request Types
export interface CreateUserRequest {
  username: string;
  password: string;
  role: "admin" | "employee";
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  rateNormal?: number;
  rateSpecial?: number;
}

export interface UpdateZoneRequest {
  open: boolean;
}

export interface CreateRushHourRequest {
  weekDay: number;
  from: string;
  to: string;
}

export interface CreateVacationRequest {
  name: string;
  from: string;
  to: string;
}

// 🔧 Admin Request Types
export interface CreateZoneRequest {
  name: string;
  categoryId: string;
  gateIds: string[];
  totalSlots: number;
  rateNormal?: number;
  rateSpecial?: number;
}

export interface UpdateZoneRequest {
  name?: string;
  categoryId?: string;
  gateIds?: string[];
  totalSlots?: number;
  rateNormal?: number;
  rateSpecial?: number;
  open: boolean;
}
