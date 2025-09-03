"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Car,
  Users,
  DollarSign,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  XCircle,
  MapPin,
} from "lucide-react";

const DataRow = ({
  label,
  value,
  color = "font-medium",
}: {
  label: string;
  value: string | number;
  color?: string;
}) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-400">{label}</span>
    <span className={color}>{value}</span>
  </div>
);

interface ZoneCardProps {
  zone: any;
  isActive: boolean;
  onToggle: () => void;
  onCheckIn: () => void;
  isLoading: boolean;
}

const ZoneCard: React.FC<ZoneCardProps> = ({
  zone,
  isActive,
  onToggle,
  onCheckIn,
  isLoading,
}) => {
  const occupancyRate =
    zone.totalSlots > 0 ? (zone.occupied / zone.totalSlots) * 100 : 0;
  const occupancyColor =
    occupancyRate > 80
      ? "bg-red-500"
      : occupancyRate > 60
      ? "bg-yellow-500"
      : "bg-[#38e07b]";

  return (
    <Card className="bg-[#111714] border-[#29382f] hover:border-[#38e07b]/30 transition-colors">
      <CardHeader
        className="cursor-pointer hover:bg-[#1a1f1c] transition-colors p-4 sm:p-6"
        onClick={onToggle}
      >
        <div className="space-y-3 sm:space-y-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              {isActive ? (
                <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-[#38e07b] flex-shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
              )}
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-[#38e07b] flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <CardTitle className="text-white text-base sm:text-lg truncate">
                  {zone.name}
                </CardTitle>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  {zone.occupied}/{zone.totalSlots} spaces occupied
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 sm:hidden">
              <Badge
                variant={zone.open ? "default" : "destructive"}
                className={`text-xs ${
                  zone.open
                    ? "bg-[#38e07b] text-black hover:bg-[#38e07b]/90"
                    : ""
                }`}
              >
                {zone.open ? (
                  <>
                    <CheckCircle className="h-2 w-2 mr-1" /> Open
                  </>
                ) : (
                  <>
                    <XCircle className="h-2 w-2 mr-1" /> Closed
                  </>
                )}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-full sm:w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${occupancyColor}`}
                  style={{ width: `${occupancyRate}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {Math.round(occupancyRate)}%
              </span>
            </div>

            <div className="hidden sm:block">
              <Badge
                variant={zone.open ? "default" : "destructive"}
                className={
                  zone.open
                    ? "bg-[#38e07b] text-black hover:bg-[#38e07b]/90"
                    : ""
                }
              >
                {zone.open ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" /> Open
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3 mr-1" /> Closed
                  </>
                )}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      {isActive && (
        <CardContent className="border-t border-[#29382f] pt-4 sm:pt-6 p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-[#38e07b] flex items-center gap-2 text-sm sm:text-base">
                <Car className="h-3 w-3 sm:h-4 sm:w-4" /> Capacity
              </h4>
              <div className="space-y-2 sm:space-y-3">
                <DataRow label="Total Slots" value={zone.totalSlots} />
                <DataRow
                  label="Available"
                  value={zone.free}
                  color="font-medium text-[#38e07b]"
                />
                <DataRow
                  label="Occupied"
                  value={zone.occupied}
                  color="font-medium text-orange-400"
                />
                <DataRow
                  label="Reserved"
                  value={zone.reserved}
                  color="font-medium text-blue-400"
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-[#38e07b] flex items-center gap-2 text-sm sm:text-base">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" /> Access
              </h4>
              <div className="space-y-2 sm:space-y-3">
                <DataRow
                  label="Visitor Slots"
                  value={zone.availableForVisitors}
                />
                <DataRow
                  label="Subscriber Slots"
                  value={zone.availableForSubscribers}
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
              <h4 className="font-semibold text-[#38e07b] flex items-center gap-2 text-sm sm:text-base">
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" /> Rates
              </h4>
              <div className="space-y-2 sm:space-y-3">
                <DataRow label="Normal Rate" value={`$${zone.rateNormal}`} />
                <DataRow label="Special Rate" value={`$${zone.rateSpecial}`} />
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#29382f] flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">Zone ID: {zone.id}</span>
            </div>
            {zone.gateIds?.length > 0 && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">
                  Gates: {zone.gateIds.join(", ")}
                </span>
              </div>
            )}
          </div>
          {zone?.open && (
            <div className="flex justify-center items-center mt-4">
              <Button
                onClick={onCheckIn}
                disabled={isLoading}
                className="text-center bg-gradient-to-r from-[#38e07b] to-[#2dd968] 
        hover:from-[#2dd968] hover:to-[#38e07b] text-black font-bold 
        px-16 py-4 rounded-lg transition-all duration-200 shadow-lg 
        hover:shadow-[#38e07b]/25 disabled:from-gray-600 disabled:to-gray-700 
        disabled:text-gray-400 disabled:shadow-none"
              >
                {isLoading ? "Checking in..." : "Check In"}
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default ZoneCard;
