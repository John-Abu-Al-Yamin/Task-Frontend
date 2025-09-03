"use client";
import GateHeader from "../src/components/GateHeader";
import { useGetGatesQuery } from "../src/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield } from "lucide-react";
import Link from "next/link";
import Loading from "../src/components/Loading";

const Gate = () => {
  const { data, isLoading, isError } = useGetGatesQuery();

  if (isLoading)
    return (
      <Loading />
    );
  if (isError)
    return (
      <div className="min-h-screen bg-[#0f1611] flex items-center justify-center text-red-400">
        Error fetching gates
      </div>
    );
  return (
    <div className="min-h-screen ">
      <GateHeader
        gateNumber="N/A"
        gateName="N/A"
        connectionStatus="connected"
      />

      <main className="p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Gate Management System
          </h2>
          <p className="text-gray-400">
            Monitor and control parking gate operations in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((gate: any) => (
            <Link key={gate.id} href={`/gate/${gate.id}`}>
              <Card className="bg-[#111714] border-[#29382f] hover:border-[#38e07b]/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg font-semibold flex items-center gap-2">
                      <Shield className="h-5 w-5 text-[#38e07b]" />
                      {gate.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="h-4 w-4 text-[#38e07b]" />
                      <span className="text-sm">{gate.location}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Access Zones:</p>
                    <div className="flex flex-wrap gap-1">
                      {gate.zoneIds.map((zoneId: string) => (
                        <Badge
                          key={zoneId}
                          variant="outline"
                          className="text-xs border-[#38e07b]/30 text-[#38e07b] bg-[#38e07b]/10"
                        >
                          {zoneId.replace("_", " ").toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#29382f]">
                    <p className="text-xs text-gray-500">Gate ID: {gate.id}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Gate;
