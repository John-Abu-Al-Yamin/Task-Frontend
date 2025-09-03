import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";

interface TicketInputProps {
  ticketInput: string;
  setTicketInput: (value: string) => void;
  onFetch: () => void;
  isLoading: boolean;
}

const TicketInput: React.FC<TicketInputProps> = ({
  ticketInput,
  setTicketInput,
  onFetch,
  isLoading
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
      <div className="md:col-span-2 space-y-2">
        <Label
          htmlFor="ticket-id"
          className="text-sm font-medium text-gray-300 flex items-center gap-2"
        >
          <Users className="w-4 h-4 text-[#38e07b]" />
          Ticket ID
        </Label>
        <Input
          id="ticket-id"
          placeholder="Enter Ticket ID"
          value={ticketInput}
          onChange={(e) => setTicketInput(e.target.value)}
          className="bg-[#0a0f0c]/50 border-[#29382f] text-white placeholder:text-[#9eb7a8]/70 focus-visible:ring-[#38e07b] focus-visible:border-[#38e07b] transition-all duration-200 h-12"
        />
      </div>
      <Button
        onClick={onFetch}
        disabled={!ticketInput}
        className="w-full bg-gradient-to-r from-[#38e07b] to-[#2dd968] hover:from-[#2dd968] hover:to-[#38e07b] text-black font-bold h-12 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#38e07b]/25"
      >
        {isLoading ? "Loading..." : "Fetch Ticket"}
      </Button>
    </div>
  );
};

export default TicketInput;