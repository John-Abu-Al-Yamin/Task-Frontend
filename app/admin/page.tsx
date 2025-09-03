"use client";
import { useState } from "react";
import { useGetParkingStateReportQuery } from "../src/services/api";
import { Card, CardContent } from "@/components/ui/card";
import {
  Car,
  Shield,
  Users,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";
import type { AdminZone } from "../src/types/types";
import Loading from "../src/components/Loading";
import { Input } from "@/components/ui/input";

const AdminDashboard = () => {
  const { data, error, isLoading } = useGetParkingStateReportQuery();
  const [search, setSearch] = useState("");

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f0c] via-[#0f1611] to-[#0a0f0c] flex items-center justify-center">
        <div className="text-red-500 text-center">
          <XCircle className="w-16 h-16 mx-auto mb-4" />
          <div className="text-xl">Error loading data</div>
          <div className="text-sm opacity-70 mt-2">
            Please try refreshing the page
          </div>
        </div>
      </div>
    );

  const zones = Array.isArray(data) ? data : data?.zones || [];

  // Filter zones by search
  const filteredZones = zones.filter((zone: AdminZone) =>
    zone.name.toLowerCase().includes(search.toLowerCase())
  );

  // Stats
  const totalZones = zones.length;
  const openZones = zones.filter((z) => z.open).length;
  const closedZones = zones.filter((z) => !z.open).length;
  const totalSlots = zones.reduce((acc, zone) => acc + zone.totalSlots, 0);
  const totalOccupied = zones.reduce((acc, zone) => acc + zone.occupied, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f0c] via-[#0f1611] to-[#0a0f0c] p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#38e07b] to-[#29d65c] bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9eb7a8] w-5 h-5" />
          <Input
            type="text"
            placeholder="Search by zone name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0a0f0c]/60 border border-[#29382f] rounded-lg py-2 pl-10 pr-4 text-white placeholder-[#9eb7a8] focus:outline-none focus:ring-2 focus:ring-[#38e07b]/50"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-[#0a0f0c]/60 backdrop-blur-sm border border-[#29382f] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#38e07b]">{totalZones}</div>
          <div className="text-sm text-[#9eb7a8]">Total Zones</div>
        </div>
        <div className="bg-[#0a0f0c]/60 backdrop-blur-sm border border-[#29382f] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{openZones}</div>
          <div className="text-sm text-[#9eb7a8]">Open</div>
        </div>
        <div className="bg-[#0a0f0c]/60 backdrop-blur-sm border border-[#29382f] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{closedZones}</div>
          <div className="text-sm text-[#9eb7a8]">Closed</div>
        </div>
        <div className="bg-[#0a0f0c]/60 backdrop-blur-sm border border-[#29382f] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{totalSlots}</div>
          <div className="text-sm text-[#9eb7a8]">Total Slots</div>
        </div>
        <div className="bg-[#0a0f0c]/60 backdrop-blur-sm border border-[#29382f] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-400">
            {totalOccupied}
          </div>
          <div className="text-sm text-[#9eb7a8]">Occupied</div>
        </div>
      </div>

      {/* Zone Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredZones.length > 0 ? (
          filteredZones.map((zone: AdminZone, index) => {
            const occupancyRate =
              zone.totalSlots > 0 ? (zone.occupied / zone.totalSlots) * 100 : 0;

            return (
              <Card
                key={index}
                className={`group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                  zone.open
                    ? "bg-[#0a0f0c]/80 border-[#29382f] hover:border-[#38e07b]/50"
                    : "bg-red-900/30 border-red-700/50 hover:border-red-500"
                } backdrop-blur-sm`}
              >
                {/* Status Badge */}
                <div
                  className={`absolute top-4 right-4 flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
                    zone.open
                      ? "bg-green-600/90 text-white shadow-lg shadow-green-600/25"
                      : "bg-red-500/90 text-white shadow-lg shadow-red-500/25"
                  }`}
                >
                  {zone.open ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  {zone.open ? "Open" : "Closed"}
                </div>

                {/* Occupancy Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700/50">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      occupancyRate > 80
                        ? "bg-red-500"
                        : occupancyRate > 60
                        ? "bg-yellow-500"
                        : "bg-[#38e07b]"
                    }`}
                    style={{ width: `${occupancyRate}%` }}
                  />
                </div>

                <CardContent className="p-6">
                  {/* Zone Icon and Name */}
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110 ${
                        zone.open
                          ? "bg-[#38e07b]/20 group-hover:bg-[#38e07b]/30"
                          : "bg-red-500/20 group-hover:bg-red-500/30"
                      }`}
                    >
                      {zone.id === "zone_vip" ? (
                        <Shield
                          className={`w-6 h-6 ${
                            zone.open ? "text-[#38e07b]" : "text-red-400"
                          }`}
                        />
                      ) : (
                        <Car
                          className={`w-6 h-6 ${
                            zone.open ? "text-[#38e07b]" : "text-red-400"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white truncate mb-1">
                        {zone.name}
                      </h3>
                      <div className="flex items-center text-xs text-[#9eb7a8]">
                        <MapPin className="w-3 h-3 mr-1" />
                        Zone ID: {zone.id}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-16">
            <Car className="w-16 h-16 text-[#9eb7a8] mx-auto mb-4 opacity-50" />
            <p className="text-xl text-white mb-2">No zones found</p>
            <p className="text-sm text-[#9eb7a8]">
              Try searching with a different name
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
