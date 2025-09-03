import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket } from "lucide-react";

interface TicketDetailsProps {
  ticket: {
    id: string;
    type: string;
    zoneId: string;
    gateId: string;
    checkinAt: string | null;
    checkoutAt: string | null;
    subscriptionId?: string;
    plateNumber?: string;
  };
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleString();
};

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  return (
    <div className="border-t border-[#29382f] pt-8">
      <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
        <Ticket className="w-5 h-5 text-[#38e07b]" />
        Ticket Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Ticket ID */}
        <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
          <p className="text-[#9eb7a8] text-sm font-medium">
            Ticket ID
          </p>
          <p className="text-white font-semibold">{ticket.id}</p>
        </Card>

        {/* Type */}
        <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
          <p className="text-[#9eb7a8] text-sm font-medium">
            Type
          </p>
          <Badge className="bg-blue-500/20 text-white border-blue-500/30 w-32 h-10 flex items-center justify-center text-lg font-bold">
            {ticket.type}
          </Badge>
        </Card>

        {/* Zone */}
        <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
          <p className="text-[#9eb7a8] text-sm font-medium">
            Zone
          </p>
          <p className="text-white font-semibold">
            {ticket.zoneId}
          </p>
        </Card>

        {/* Gate */}
        <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
          <p className="text-[#9eb7a8] text-sm font-medium">
            Gate
          </p>
          <p className="text-white font-semibold">
            {ticket.gateId}
          </p>
        </Card>

        {/* Check-in */}
        <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
          <p className="text-[#9eb7a8] text-sm font-medium">
            Check-in Time
          </p>
          <p className="text-white font-semibold">
            {formatDate(ticket.checkinAt)}
          </p>
        </Card>

        {/* Check-out */}
        <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
          <p className="text-[#9eb7a8] text-sm font-medium">
            Check-out Time
          </p>
          <p className="text-white font-semibold">
            {formatDate(ticket.checkoutAt)}
          </p>
        </Card>

        {/* Subscription ID */}
        {ticket.subscriptionId && (
          <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
            <p className="text-[#9eb7a8] text-sm font-medium">
              Subscription ID
            </p>
            <p className="text-white font-semibold">
              {ticket.subscriptionId}
            </p>
          </Card>
        )}

        {/* Plate Number */}
        {ticket.plateNumber && (
          <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
            <p className="text-[#9eb7a8] text-sm font-medium">
              Plate Number
            </p>
            <p className="text-white font-semibold">
              {ticket.plateNumber}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TicketDetails