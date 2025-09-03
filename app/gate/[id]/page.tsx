"use client";

import { useParams } from "next/navigation";
import GateHeader from "@/app/src/components/GateHeader";
import {
  useCheckInMutation,
  useGetGatesQuery,
  useGetZonesQuery,
} from "@/app/src/services/api";
import { MapPin, Shield, Car, XCircle, CarTaxiFront, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "@/app/src/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ZoneCard from "@/app/src/components/ZoneCard";
import { toast } from "sonner";
import TicketModal from "@/app/src/components/TicketModal";

const STORAGE_KEY = "user_tickets";

const GateId = () => {
  const params = useParams() as { id: string };
  const { id } = params;
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"visitor" | "subscriber">(
    "visitor"
  );
  const [subscriptionId, setSubscriptionId] = useState("");
  const [ticket, setTicket] = useState<any | null>(null);
  const [allTickets, setAllTickets] = useState<any[]>([]);
  const [showTickets, setShowTickets] = useState(false);

  const [checkin, { isLoading }] = useCheckInMutation();

  // Load saved tickets on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setAllTickets(JSON.parse(saved));
    }
  }, []);

  // Save tickets to localStorage when updated
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allTickets));
  }, [allTickets]);

  const handleCheckin = async () => {
    if (!activeZone) {
      toast.error("Please select a zone before check-in.");
      return;
    }

    if (activeTab === "subscriber" && !subscriptionId.trim()) {
      toast.error("Please enter a valid subscriber ID before check-in.");
      return;
    }

    try {
      const res = await checkin({
        gateId: id,
        zoneId: activeZone,
        type: activeTab === "visitor" ? "visitor" : "subscriber",
        subscriptionId: activeTab === "subscriber" ? subscriptionId : undefined,
      }).unwrap();

      setTicket(res.ticket );
      setAllTickets((prev) => [...prev, res.ticket]); // save ticket

      toast.success(res.message  || "Check-in successful!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Check-in failed. Please try again.");
    }
  };

  const {
    data: gates,
    isLoading: gatesLoading,
    isError: gatesError,
  } = useGetGatesQuery();
  const gate = gates?.find((g: any) => g.id === id);
  const {
    data: zones,
    isLoading: zonesLoading,
    isError: zonesError,
  } = useGetZonesQuery({ gateId: id });

  if (gatesLoading || zonesLoading) {
    return <Loading />;
  }

  if (gatesError || zonesError || !gate) {
    return (
      <div className="min-h-screen bg-[#0f1611] flex items-center justify-center text-center space-y-4">
        <XCircle className="h-16 w-16 text-red-400 mx-auto" />
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Unable to Load Gate
          </h2>
          <p className="text-red-400">
            Error loading gate details. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1611] text-white">
      <GateHeader
        gateNumber={gate.id.replace("gate_", "")}
        gateName={gate.name}
        gateId={id}
      />

      <main className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-start sm:items-center gap-3 mb-2">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-[#38e07b] flex-shrink-0 mt-1 sm:mt-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-3xl font-bold text-balance leading-tight">
                {gate.name}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-sm sm:text-base truncate">
                {gate.location}
              </span>
            </div>
            {/* زرار عرض التذاكر */}
            <Button
              variant="outline"
              onClick={() => setShowTickets(true)}
              className="ml-4 border-[#29382f] hover:bg-[#1a1f1c] text-gray-300 hover:text-white"
            >
              <Ticket className="h-4 w-4 mr-2" />
              My Tickets
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-[#111714] border border-[#29382f] rounded-lg p-1 inline-flex">
            <Button
              variant="ghost"
              onClick={() => setActiveTab("visitor")}
              className={`px-6 py-2 rounded-md transition-all duration-300 ease-in-out relative transform ${
                activeTab === "visitor"
                  ? "bg-[#38e07b] text-black hover:bg-[#38e07b]/90 shadow-sm scale-105"
                  : "text-gray-400 hover:text-white hover:bg-[#1a1f1c] hover:scale-102"
              }`}
            >
              <Shield
                className={`h-4 w-4 mr-2 transition-transform duration-300 ${
                  activeTab === "visitor" ? "rotate-12" : ""
                }`}
              />
              Visitor
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("subscriber")}
              className={`px-6 py-2 rounded-md transition-all duration-300 ease-in-out relative transform ${
                activeTab === "subscriber"
                  ? "bg-[#38e07b] text-black hover:bg-[#38e07b]/90 shadow-sm scale-105"
                  : "text-gray-400 hover:text-white hover:bg-[#1a1f1c] hover:scale-102"
              }`}
            >
              <CarTaxiFront
                className={`h-4 w-4 mr-2 transition-transform duration-300 ${
                  activeTab === "subscriber" ? "rotate-12" : ""
                }`}
              />
              Subscriber
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative overflow-hidden">
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              activeTab === "subscriber"
                ? "opacity-100 translate-x-0 "
                : "opacity-0 -translate-x-4  absolute inset-0 pointer-events-none"
            }`}
          >
            {activeTab === "subscriber" && (
              <div className="flex justify-center items-center w-full animate-in fade-in-0 py-2 slide-in-from-bottom-4 duration-500">
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="subscriber">Code Subscriber Id</Label>
                  <Input
                    type="text"
                    id="subscriber"
                    placeholder="code-subscriber-id"
                    value={subscriptionId}
                    onChange={(e) => setSubscriptionId(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
            <Car className="h-4 w-4 sm:h-5 sm:w-5 text-[#38e07b]" />
            <span>Parking Zones ({zones?.length || 0})</span>
          </h2>

          <div className="grid gap-3 sm:gap-4">
            {zones?.map((zone: any) => (
              <ZoneCard
                key={zone.id}
                zone={zone}
                isActive={activeZone === zone.id}
                onToggle={() =>
                  setActiveZone(activeZone === zone.id ? null : zone.id)
                }
                onCheckIn={handleCheckin}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </main>

      {/* عرض تذكرة جديدة */}
      <TicketModal ticket={ticket} onClose={() => setTicket(null)} />

      {/* عرض كل التذاكر المحفوظة */}
      {showTickets &&
        allTickets.map((t, i) => (
          <TicketModal
            key={i}
            ticket={t}
            onClose={() => setShowTickets(false)}
          />
        ))}
    </div>
  );
};

export default GateId;
