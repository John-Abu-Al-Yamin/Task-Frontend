"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Users, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f0c] via-[#0f1611] to-[#0a0f0c] flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-[#38e07b] to-[#2dd968] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#38e07b]/20">
            <Car className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Parking System
          </h1>
          <p className="text-xl text-[#9eb7a8] max-w-2xl mx-auto">
            Complete parking reservation and management system with real-time
            updates
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/gate">
            <Card className="bg-[#0a0f0c]/80 border-[#29382f] backdrop-blur-sm hover:border-[#38e07b]/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#38e07b]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-[#38e07b]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Gate Check-in
                </h3>
                <p className="text-[#9eb7a8] text-sm">
                  Visitor and subscriber check-in with real-time zone
                  availability
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/checkpoint">
            <Card className="bg-[#0a0f0c]/80 border-[#29382f] backdrop-blur-sm hover:border-[#38e07b]/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#38e07b]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Car className="w-6 h-6 text-[#38e07b]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Checkpoint
                </h3>
                <p className="text-[#9eb7a8] text-sm">
                  Employee portal for ticket checkout and payment processing
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin">
            <Card className="bg-[#0a0f0c]/80 border-[#29382f] backdrop-blur-sm hover:border-[#38e07b]/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#38e07b]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-[#38e07b]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Admin Panel
                </h3>
                <p className="text-[#9eb7a8] text-sm">
                  Complete system management and reporting dashboard
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* CTA Button */}
        <Link href="/gate">
          <Button
            onClick={() => router.push("/login")}
            className="bg-gradient-to-r from-[#38e07b] to-[#2dd968] hover:from-[#2dd968] hover:to-[#38e07b] text-black font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#38e07b]/25"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
