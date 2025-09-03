import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, Timer, DollarSign, MapPin } from "lucide-react";

interface InvoiceDetailsProps {
  invoiceData: {
    ticketId: string;
    durationHours: number;
    checkinAt: string | null;
    checkoutAt: string | null;
    amount: number;
    breakdown: Array<{
      from: string | null;
      to: string | null;
      hours: number;
      rateMode: string;
      rate: number;
      amount: number;
    }>;
    zoneState?: {
      id: string;
      name: string;
      occupied: number;
      totalSlots: number;
      free: number;
      rateNormal: number;
      rateSpecial: number;
      open: boolean;
    };
  } | null;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleString();
};

const formatCurrency = (amount: number) => {
  return `$${amount.toFixed(2)}`;
};

const formatDuration = (hours: number) => {
  if (hours < 1) {
    const minutes = Math.round(hours * 60);
    return `${minutes} min`;
  }
  return `${hours.toFixed(2)} hrs`;
};

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ invoiceData }) => {
  if (!invoiceData) {
    return null;
  }

  return (
    <div className="border-t border-[#29382f] pt-8">
      <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
        <Receipt className="w-5 h-5 text-[#38e07b]" />
        Invoice Details
      </h3>

      {/* Invoice Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
          <p className="text-[#9eb7a8] text-sm font-medium">
            Ticket ID
          </p>
          <p className="text-white font-semibold">
            {invoiceData.ticketId}
          </p>
        </Card>

        <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
          <p className="text-[#9eb7a8] text-sm font-medium">
            Duration
          </p>
          <p className="text-white font-semibold flex items-center gap-1">
            <Timer className="w-4 h-4 text-[#38e07b]" />
            {formatDuration(invoiceData.durationHours)}
          </p>
        </Card>

        <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
          <p className="text-[#9eb7a8] text-sm font-medium">
            Check-in
          </p>
          <p className="text-white font-semibold">
            {formatDate(invoiceData.checkinAt)}
          </p>
        </Card>

        <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
          <p className="text-[#9eb7a8] text-sm font-medium">
            Check-out
          </p>
          <p className="text-white font-semibold">
            {formatDate(invoiceData.checkoutAt)}
          </p>
        </Card>
      </div>

      {/* Billing Breakdown */}
      <div className="mb-6">
        <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#38e07b]" />
          Billing Breakdown
        </h4>
        <div className="space-y-3">
          {invoiceData.breakdown.map((item: any, index: number) => (
            <Card
              key={index}
              className="bg-[#0f1611]/50 border-[#29382f] p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="text-[#9eb7a8] text-xs font-medium">
                    Period
                  </p>
                  <p className="text-white text-sm font-semibold">
                    {formatDate(item.from)} - {formatDate(item.to)}
                  </p>
                </div>
                <div>
                  <p className="text-[#9eb7a8] text-xs font-medium">
                    Duration
                  </p>
                  <p className="text-white text-sm font-semibold">
                    {formatDuration(item.hours)}
                  </p>
                </div>
                <div>
                  <p className="text-[#9eb7a8] text-xs font-medium">
                    Rate Mode
                  </p>
                  <Badge
                    className={`${
                      item.rateMode === "normal"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                    }`}
                  >
                    {item.rateMode}
                  </Badge>
                </div>
                <div>
                  <p className="text-[#9eb7a8] text-xs font-medium">
                    Rate
                  </p>
                  <p className="text-white text-sm font-semibold">
                    {formatCurrency(item.rate)}/hr
                  </p>
                </div>
                <div>
                  <p className="text-[#9eb7a8] text-xs font-medium">
                    Amount
                  </p>
                  <p className="text-[#38e07b] text-lg font-bold">
                    {formatCurrency(item.amount)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Zone Information */}
      {invoiceData.zoneState && (
        <div className="mb-6">
          <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#38e07b]" />
            Zone Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
              <p className="text-[#9eb7a8] text-sm font-medium">
                Zone
              </p>
              <p className="text-white font-semibold">
                {invoiceData.zoneState.name}
              </p>
              <p className="text-[#9eb7a8] text-xs">
                ({invoiceData.zoneState.id})
              </p>
            </Card>

            <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
              <p className="text-[#9eb7a8] text-sm font-medium">
                Occupancy
              </p>
              <p className="text-white font-semibold">
                {invoiceData.zoneState.occupied}/
                {invoiceData.zoneState.totalSlots}
              </p>
              <p className="text-[#38e07b] text-xs">
                {invoiceData.zoneState.free} free slots
              </p>
            </Card>

            <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
              <p className="text-[#9eb7a8] text-sm font-medium">
                Rates
              </p>
              <p className="text-white font-semibold">
                Normal:{" "}
                {formatCurrency(invoiceData.zoneState.rateNormal)}
                /hr
              </p>
              <p className="text-[#9eb7a8] text-xs">
                Special:{" "}
                {formatCurrency(invoiceData.zoneState.rateSpecial)}
                /hr
              </p>
            </Card>

            <Card className="bg-[#0f1611]/50 border-[#29382f] p-4">
              <p className="text-[#9eb7a8] text-sm font-medium">
                Status
              </p>
              <Badge
                className={`${
                  invoiceData.zoneState.open
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-red-500/20 text-red-400 border-red-500/30"
                }`}
              >
                {invoiceData.zoneState.open ? "Open" : "Closed"}
              </Badge>
            </Card>
          </div>
        </div>
      )}

      {/* Total Amount */}
      <div className="border-t border-[#29382f] pt-6">
        <div className="flex items-center justify-between">
          <h4 className="text-white text-xl font-bold">
            Total Amount
          </h4>
          <div className="text-right">
            <p className="text-[#38e07b] text-3xl font-bold">
              {formatCurrency(invoiceData.amount)}
            </p>
            <p className="text-[#9eb7a8] text-sm">
              for {formatDuration(invoiceData.durationHours)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;