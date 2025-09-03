import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car } from "lucide-react";

interface SubscriptionDetailsProps {
  subscription:
    | {
        id: string;
        userId: string;
        type: string;
        status: string;
        active: boolean;
        validUntil: string;
        vehicles: {
          id: string;
          plateNumber: string;
          model?: string;
          color?: string;
        }[];
      }
    | null
    | undefined;
  ticketPlateNumber?: string;
  isSubscriptionLoading: boolean;
  isSubscriptionError: boolean;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleString();
};

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  subscription,
  ticketPlateNumber,
  isSubscriptionLoading,
  isSubscriptionError,
}) => {
  if (isSubscriptionLoading) {
    return (
      <div className="border-t border-[#29382f] pt-8">
        <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
          <Car className="w-5 h-5 text-[#38e07b]" />
          Subscription Details
        </h3>
        <div className="text-[#9eb7a8] text-center py-4">
          Loading subscription details...
        </div>
      </div>
    );
  }

  if (isSubscriptionError) {
    return (
      <div className="border-t border-[#29382f] pt-8">
        <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
          <Car className="w-5 h-5 text-[#38e07b]" />
          Subscription Details
        </h3>
        <div className="text-red-400 text-center py-4">
          Failed to load subscription details
        </div>
      </div>
    );
  }

  if (!subscription) {
    return null;
  }

  return (
    <div className="border-t border-[#29382f] pt-8">
      <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
        <Car className="w-5 h-5 text-[#38e07b]" />
        Subscription Details
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
            <p className="text-[#9eb7a8] text-sm font-medium">
              Subscription Type
            </p>
            <p className="text-white font-semibold">{subscription.type}</p>
          </Card>

          <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
            <p className="text-[#9eb7a8] text-sm font-medium">Status</p>
            <Badge
              className={`${
                subscription.active
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-red-500/20 text-red-400 border-red-500/30"
              }`}
            >
              {subscription.active ? "Active" : "Inactive"}
            </Badge>
          </Card>

          <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
            <p className="text-[#9eb7a8] text-sm font-medium">Valid Until</p>
            <p className="text-white font-semibold">
              {formatDate(subscription.validUntil)}
            </p>
          </Card>
        </div>

        {/* Subscription Vehicles */}
        {subscription.vehicles && subscription.vehicles.length > 0 && (
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Registered Vehicles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subscription.vehicles.map((vehicle: any, index: number) => (
                <Card
                  key={index}
                  className={`bg-[#0f1611]/50 border-[#29382f] p-4 ${
                    vehicle.plateNumber === ticketPlateNumber
                      ? "ring-2 ring-[#38e07b] bg-[#38e07b]/10"
                      : ""
                  }`}
                >
                  <p className="text-[#9eb7a8] text-sm font-medium">
                    Plate Number
                  </p>
                  <p className="text-white font-semibold">
                    {vehicle.plateNumber}
                  </p>
                  {vehicle.plateNumber === ticketPlateNumber && (
                    <Badge className="mt-2 bg-[#38e07b]/20 text-[#38e07b] border-[#38e07b]/30">
                      Current Vehicle
                    </Badge>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionDetails;
