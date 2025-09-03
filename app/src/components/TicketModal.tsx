"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Ticket,
  MapPin,
  Clock,
  Hash,
  Printer,
  
  CheckCircle,
} from "lucide-react";

interface TicketModalProps {
  ticket: any | null;
  onClose: () => void;
}

const TicketModal = ({ ticket, onClose }: TicketModalProps) => {
  if (!ticket) return null;

  return (
    <Dialog open={!!ticket} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-[#111714] to-[#0f1611] text-white max-w-lg rounded-3xl p-0 border border-[#29382f]/50 shadow-2xl">
        {/* Header with close button */}
        <div className="relative p-6 pb-4">

          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-[#38e07b]/20 rounded-2xl">
                <Ticket className="h-6 w-6 text-[#38e07b]" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-white">
                  Parking Ticket
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-[#38e07b]" />
                  <span className="text-sm text-[#38e07b] font-medium">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Ticket Details */}
        <div className="px-6 pb-6">
          <div className="bg-[#1a1f1c] rounded-2xl p-5 border border-[#29382f]/30">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Ticket ID
                    </p>
                    <p className="text-sm font-mono font-medium text-white">
                      {ticket.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Gate
                    </p>
                    <p className="text-sm font-medium text-white">
                      {ticket.gateId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-[#38e07b]/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[#38e07b]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Zone
                    </p>
                    <p className="text-sm font-medium text-white">
                      {ticket.zoneId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Check-in
                    </p>
                    <p className="text-sm font-medium text-white">
                      {new Date(ticket.checkinAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Type Badge */}
            <div className="mt-4 pt-4 border-t border-[#29382f]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    Type
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ticket.type === "visitor"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-[#38e07b]/20 text-[#38e07b] border border-[#38e07b]/30"
                    }`}
                  >
                    {ticket.type === "visitor" ? "Visitor" : "Subscriber"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Valid until</p>
                  <p className="text-sm font-medium text-white">End of day</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              onClick={() => window.print()}
              className="flex-1 bg-[#38e07b] hover:bg-[#32c96b] text-black font-medium py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Ticket
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6 py-3 border-[#29382f] hover:bg-[#1a1f1c] text-gray-300 hover:text-white rounded-xl transition-all duration-200 bg-transparent"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
