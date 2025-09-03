"use client";

import {
  useGetZoneQuery,
  useDeleteZoneMutation,
  useToggleZoneMutation,
} from "@/app/src/services/api";
import Loading from "@/app/src/components/Loading";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Car,
  Shield,
  MapPin,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Power,
  Plus,
} from "lucide-react";
import React, { useState } from "react";

const Zones = () => {
  const { data, isLoading, error } = useGetZoneQuery();
  const [search, setSearch] = useState("");
  const [deleteZone] = useDeleteZoneMutation();
  const [toggleZone] = useToggleZoneMutation();

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading zones
      </div>
    );

  const zones = Array.isArray(data) ? data : [];

  const filteredZones = zones.filter((zone) =>
    zone.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🗑️ Delete Zone Logic with toast confirm
  // const handleDelete = (id: string) => {
  //   toast.warning("Are you sure you want to delete this zone?", {
  //     action: {
  //       label: "Delete",
  //       onClick: async () => {
  //         try {
  //           await deleteZone(id).unwrap();
  //           toast.success("Zone deleted successfully ✅");
  //         } catch (err) {
  //           console.log(err);
  //           toast.error( "Failed to delete zone ❌");
  //         }
  //       },
  //     },
  //   });
  // };

  // 🔄 Toggle Zone Logic
  const handleToggle = async (id: string, open: boolean) => {
    try {
      await toggleZone({ id, open: !open }).unwrap();
      toast.success(`Zone ${open ? "closed" : "opened"} successfully`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update zone status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f0c] via-[#0f1611] to-[#0a0f0c] p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#38e07b] to-[#29d65c] bg-clip-text text-transparent">
          Zones
        </h1>

      </div>

      {/* 🔎 Search Input */}
      <div className="max-w-md mx-auto mb-8 w-full">
        <Input
          type="text"
          placeholder="Search zones..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#0f1611] border-[#29382f] text-white placeholder:text-[#9eb7a8]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredZones.map((zone) => {
          const occupancyRate =
            zone.totalSlots > 0 ? (zone.occupied / zone.totalSlots) * 100 : 0;

          return (
            <Card
              key={zone.id}
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

                {/* Slots Info */}
                <div className="grid grid-cols-2 gap-2 text-sm text-[#9eb7a8] mb-4">
                  <div>Total: {zone.totalSlots}</div>
                  <div>Occupied: {zone.occupied}</div>
                  <div>Free: {zone.free}</div>
                  <div>Reserved: {zone.reserved}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2">
                  {/* <Link
                    href={`/admin/zones/${zone.id}/edit`}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-[#069840] rounded-xl  text-white hover:bg-[#38e00b]/90 transition-colors duration-300"
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600/20"
                    onClick={() => handleDelete(zone.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button> */}
                  <Button
                    size="sm"
                    variant="outline"
                    className={`${
                      zone.open
                        ? "border-red-600 text-red-400 hover:bg-red-600/20"
                        : "border-green-600 text-green-400 hover:bg-green-600/20"
                    }`}
                    onClick={() => handleToggle(zone.id, zone?.open)}
                  >
                    <Power className="w-4 h-4 mr-1" />{" "}
                    {zone.open ? "Close" : "Open"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Zones;
