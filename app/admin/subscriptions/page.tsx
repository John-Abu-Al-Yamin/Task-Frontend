"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Loading from "@/app/src/components/Loading";
import {
  Car,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Tag,
  Search,
  Clock,
} from "lucide-react";
import { useGetSubscriptionsQuery } from "@/app/src/services/api";
import Link from "next/link";

const Subscriptions = () => {
  const { data: subscriptions = [], isLoading } = useGetSubscriptionsQuery();
  const [filter, setFilter] = useState("all"); // all, active, inactive
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <Loading />;

  // Filter and search logic
  const filteredData = subscriptions.filter((sub: any) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && sub.active) ||
      (filter === "inactive" && !sub.active);

    const matchesSearch =
      sub.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.cars?.some((car: any) =>
        car.plate.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesFilter && matchesSearch;
  });

  if (subscriptions.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No subscriptions found
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0a0f0c] via-[#0f1611] to-[#0a0f0c]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-[#38e07b] to-[#29d65c] bg-clip-text text-transparent">
          Subscriptions
        </h1>
        <p className="text-center text-[#9eb7a8] mb-8">
          Manage and view all subscription details
        </p>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9eb7a8] w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or plate..."
              className="w-full pl-10 pr-4 py-2 bg-[#0a0f0c]/50 border border-[#29382f] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#38e07b]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-[#38e07b] text-white"
                  : "bg-[#0a0f0c]/50 text-[#9eb7a8] border border-[#29382f]"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                filter === "active"
                  ? "bg-[#38e07b] text-white"
                  : "bg-[#0a0f0c]/50 text-[#9eb7a8] border border-[#29382f]"
              }`}
              onClick={() => setFilter("active")}
            >
              <CheckCircle className="w-4 h-4" /> Active
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                filter === "inactive"
                  ? "bg-red-500 text-white"
                  : "bg-[#0a0f0c]/50 text-[#9eb7a8] border border-[#29382f]"
              }`}
              onClick={() => setFilter("inactive")}
            >
              <XCircle className="w-4 h-4" /> Inactive
            </button>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-12 text-[#9eb7a8]">
            No subscriptions match your search criteria
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((sub: any) => (
              <Link href={`/admin/subscriptions/${sub.id}`} key={sub.id}>
                <Card
                  key={sub.id}
                  className={`group relative overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl backdrop-blur-sm border ${
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

                  <CardContent className="p-6 space-y-5">
                    {/* User Info */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 mt-0.5 text-[#38e07b] flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {sub.userName || "Unknown User"}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-[#9eb7a8]">
                            <Tag className="w-4 h-4" />
                            <span>Category: {sub.category}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#9eb7a8] bg-[#0a0f0c]/30 p-2 rounded-lg">
                        <Calendar className="w-4 h-4 text-[#38e07b]" />
                        <span>
                          Valid until:{" "}
                          {new Date(sub.expiresAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <hr className="border-gray-700" />

                    {/* Vehicles */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        Vehicles ({sub.cars?.length || 0})
                      </h4>
                      <ul className="space-y-3">
                        {(sub.cars || []).map((car: any, index: number) => (
                          <li
                            key={index}
                            className="text-sm text-[#9eb7a8] bg-[#0a0f0c]/30 p-3 rounded-lg"
                          >
                            <div className="font-semibold text-white mb-1">
                              {car.plate}
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              <span>
                                {car.brand} {car.model}
                              </span>
                              <span>{car.color}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Current Check-ins */}
                    {sub.currentCheckins?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <Clock className="w-4 h-4" /> Current Check-ins
                        </h4>
                        <ul className="space-y-2">
                          {sub.currentCheckins.map(
                            (checkin: any, idx: number) => (
                              <li
                                key={idx}
                                className="text-sm text-[#9eb7a8] bg-[#0a0f0c]/30 p-2 rounded-lg"
                              >
                                Ticket: {checkin.ticketId} <br />
                                Zone: {checkin.zoneId} <br />
                                At:{" "}
                                {new Date(checkin.checkinAt).toLocaleString()}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
