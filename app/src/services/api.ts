import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Gate,
  Zone,
  User,
  LoginResponse,
  LoginRequest,
  Ticket,
  CheckInRequest,
  CheckoutRequest,
  Invoice,
  Subscription,
  AdminUser,
  Category,
  AdminZone,
  ParkingStateReport,
  ParkingStateReportResponse,
  RushHour,
  Vacation,
  CreateUserRequest,
  UpdateCategoryRequest,
  UpdateZoneRequest,
  CreateRushHourRequest,
  CreateVacationRequest,
  CreateZoneRequest,
} from "../types/types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Zones",
    "Tickets",
    "Users",
    "Categories",
    "RushHours",
    "Vacations",
  ],
  endpoints: (builder) => ({
    // ✅ Gates
    getGates: builder.query<Gate[], void>({
      query: () => "/master/gates",
    }),

    // ✅ Zones
    getZones: builder.query<Zone[], { gateId: string }>({
      query: ({ gateId }) => `/master/zones?gateId=${gateId}`,
      providesTags: ["Zones"],
    }),

    // ✅ Check-in
    checkIn: builder.mutation<
      { ticket: Ticket; message: string },
      CheckInRequest
    >({
      query: (body) => ({
        url: "/tickets/checkin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Zones", "Tickets"],
    }),

    // ✅ Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // ✅ Get Ticket
    getTicket: builder.query<Ticket, string>({
      query: (ticketId) => `/tickets/${ticketId}`,
      providesTags: ["Tickets"],
    }),

    // ✅ Checkout
    checkout: builder.mutation<Invoice, CheckoutRequest>({
      query: (body) => ({
        url: "/tickets/checkout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tickets", "Zones"],
    }),

    getSubscription: builder.query<Subscription, string>({
      query: (subscriptionId) => `/subscriptions/${subscriptionId}`,
    }),

    // 🔧 Admin Endpoints

    // ✅ reports/parking-state
    getParkingStateReport: builder.query<ParkingStateReportResponse, void>({
      query: () => "/admin/reports/parking-state",
      providesTags: ["Zones"],
    }),

    // ✅ master/zones
    getZone: builder.query<AdminZone[], void>({
      query: () => "/master/zones",
      providesTags: ["Zones"],
    }),

    // ✅ Admin Zone Endpoints
    createZone: builder.mutation<AdminZone, CreateZoneRequest>({
      query: (body) => ({
        url: "/admin/zones",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Zones"],
    }),

    updateZone: builder.mutation<
      AdminZone,
      { id: string; data: UpdateZoneRequest }
    >({
      query: ({ id, data }) => ({
        url: `/admin/zones/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Zones"],
    }),

    deleteZone: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/admin/zones/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Zones"],
    }),

    toggleZone: builder.mutation<AdminZone, { id: string; open: boolean }>({
      query: ({ id, open }) => ({
        url: `/admin/zones/${id}/open`,
        method: "PUT",
        body: { open },
      }),
      invalidatesTags: ["Zones"],
    }),

    // ✅ categories
    getCategories: builder.query<Category[], void>({
      query: () => "/master/categories",
      providesTags: ["Categories"],
    }),

    // ✅ Update Category
    updateCategory: builder.mutation<
      Category,
      { id: string; data: UpdateCategoryRequest }
    >({
      query: ({ id, data }) => ({
        url: `/admin/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // ✅ Add Rush Hours
    createRushHour: builder.mutation<RushHour, CreateRushHourRequest>({
      query: (body) => ({
        url: "/admin/rush-hours",
        method: "POST",
        body,
      }),
      invalidatesTags: ["RushHours"],
    }),

    // ✅ Add Vacations
    createVacation: builder.mutation<Vacation, CreateVacationRequest>({
      query: (body) => ({
        url: "/admin/vacations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Vacations"],
    }),

    // ✅ Get subscriptions
    getSubscriptions: builder.query<Subscription[], void>({
      query: () => "admin/subscriptions",
    }),

    // ✅ Get subscriptions Id
    getSubscriptionById: builder.query<Subscription, string>({
      query: (subscriptionId) => `/subscriptions/${subscriptionId}`,
    }),
  }),
});

export const {
  useGetGatesQuery,
  useGetZonesQuery,
  useCheckInMutation,
  useLoginMutation,
  useGetTicketQuery,
  useCheckoutMutation,
  useGetSubscriptionQuery,

  // Admin hooks
  useGetParkingStateReportQuery,
  useGetZoneQuery,
  useCreateZoneMutation,
  useUpdateZoneMutation,
  useDeleteZoneMutation,
  useToggleZoneMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useCreateRushHourMutation,
  useCreateVacationMutation,
  useGetSubscriptionsQuery,
  useGetSubscriptionByIdQuery,
} = apiSlice;
