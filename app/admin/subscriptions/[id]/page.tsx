"use client";

import React from "react";
import Loading from "@/app/src/components/Loading";
import { useGetSubscriptionQuery } from "@/app/src/services/api";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Car,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Tag,
  Clock,
  ArrowLeft,
  CreditCard,
  MapPin,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const SubscriptionDetail = () => {
  const params = useParams();
  const subscriptionId = params.id as string;

  const {
    data: sub,
    isLoading,
    error,
  } = useGetSubscriptionQuery(subscriptionId);

  if (isLoading) return <Loading />;
  if (error || !sub)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f0c] via-[#0f1611] to-[#0a0f0c]">
        <div className="text-center p-8 bg-red-900/30 border border-red-700/50 rounded-lg backdrop-blur-sm max-w-md">
          <AlertCircle className="w-12 h-12 mx-auto text-red-400 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            Error Loading Subscription
          </h2>
          <p className="text-[#9eb7a8] mb-4">
            Unable to load subscription details. Please try again later.
          </p>
          <Link
            href="/subscriptions"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#38e07b] text-[#0a0f0c] rounded-md font-medium hover:bg-[#29d65c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Subscriptions
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-[#0a0f0c] via-[#0f1611] to-[#0a0f0c]">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Link
            href="/subscriptions"
            className="flex items-center gap-2 text-[#9eb7a8] hover:text-[#38e07b] transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#38e07b] to-[#29d65c] bg-clip-text text-transparent">
              Subscription Details
            </h1>
            <p className="text-[#9eb7a8] mt-1">
              View detailed subscription information
            </p>
          </div>
        </div>

        <Card
          className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl backdrop-blur-sm border ${
            sub.active
              ? "border-[#29382f] bg-[#0a0f0c]/70"
              : "border-red-700/50 bg-red-900/30"
          }`}
        >
          {/* Status Badge */}
          <div
            className={`absolute top-4 right-4 flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
              sub.active
                ? "bg-green-600/90 text-white shadow-lg shadow-green-600/25"
                : "bg-red-500/90 text-white shadow-lg shadow-red-500/25"
            }`}
          >
            {sub.active ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <XCircle className="w-3 h-3" />
            )}
            {sub.active ? "Active" : "Inactive"}
          </div>

          <CardContent className="p-6 space-y-6">
            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-[#0a0f0c]/30 rounded-lg">
                  <div className="p-2 bg-[#38e07b]/10 rounded-full">
                    <User className="w-5 h-5 text-[#38e07b]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#9eb7a8]">User</h3>
                    <p className="text-lg font-bold text-white">
                      {sub.userName || "Unknown User"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#0a0f0c]/30 rounded-lg">
                  <div className="p-2 bg-[#38e07b]/10 rounded-full">
                    <Tag className="w-5 h-5 text-[#38e07b]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#9eb7a8]">
                      Category
                    </h3>
                    <p className="text-lg font-bold text-white capitalize">
                      {sub.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-[#0a0f0c]/30 rounded-lg">
                  <div className="p-2 bg-[#38e07b]/10 rounded-full">
                    <Calendar className="w-5 h-5 text-[#38e07b]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#9eb7a8]">
                      Expiration Date
                    </h3>
                    <p className="text-lg font-bold text-white">
                      {new Date(sub.expiresAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-[#9eb7a8]">
                      {new Date(sub.expiresAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#0a0f0c]/30 rounded-lg">
                  <div className="p-2 bg-[#38e07b]/10 rounded-full">
                    <CreditCard className="w-5 h-5 text-[#38e07b]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#9eb7a8]">
                      Subscription ID
                    </h3>
                    <p className="text-lg font-bold text-white font-mono">
                      {subscriptionId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicles Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 pb-2 border-b border-gray-700">
                <Car className="w-5 h-5 text-[#38e07b]" />
                Registered Vehicles ({sub.cars?.length || 0})
              </h4>

              {sub.cars && sub.cars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sub.cars.map((car: any, index: number) => (
                    <div
                      key={index}
                      className="bg-[#0a0f0c]/30 p-4 rounded-lg border border-[#29382f] hover:border-[#38e07b]/30 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-white text-lg">
                          {car.plate}
                        </div>
                        <div className="w-3 h-3 rounded-full bg-[#38e07b]"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-[#9eb7a8]">Brand</div>
                        <div className="text-white">{car.brand}</div>

                        <div className="text-[#9eb7a8]">Model</div>
                        <div className="text-white">{car.model}</div>

                        <div className="text-[#9eb7a8]">Color</div>
                        <div className="text-white capitalize">{car.color}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-[#9eb7a8] bg-[#0a0f0c]/30 rounded-lg">
                  No vehicles registered to this subscription
                </div>
              )}
            </div>

            {/* Current Check-ins Section */}
            {sub?.currentCheckins?.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 pb-2 border-b border-gray-700">
                  <Clock className="w-5 h-5 text-[#38e07b]" />
                  Active Check-ins ({sub.currentCheckins.length})
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {sub.currentCheckins.map((checkin: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-[#0a0f0c]/30 p-4 rounded-lg border border-[#29382f] hover:border-[#38e07b]/30 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="font-semibold text-white">
                          Ticket: {checkin.ticketId}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#38e07b] bg-[#38e07b]/10 px-2 py-1 rounded-full">
                          <MapPin className="w-3 h-3" />
                          Zone {checkin.zoneId}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="text-[#9eb7a8]">Check-in Time</div>
                        <div className="text-white">
                          {new Date(checkin.checkinAt).toLocaleString()}
                        </div>

                        <div className="text-[#9eb7a8]">Duration</div>
                        <div className="text-white">
                          {Math.floor(
                            (Date.now() -
                              new Date(checkin.checkinAt).getTime()) /
                              (1000 * 60 * 60)
                          )}{" "}
                          hours
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionDetail;
