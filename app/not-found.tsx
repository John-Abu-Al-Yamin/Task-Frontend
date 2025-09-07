import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f0c] via-[#0f1611] to-[#0a0f0c] flex items-center justify-center p-4">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-[#38e07b] to-[#2dd968] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#38e07b]/20">
          <Compass className="w-10 h-10 text-black" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Page not found</h1>
        <p className="text-[#9eb7a8] mb-8">The page you are looking for doesn’t exist or has been moved.</p>

        <div className="flex items-center justify-center gap-3">
          <Link href="/">
            <Button className="bg-gradient-to-r from-[#38e07b] to-[#2dd968] hover:from-[#2dd968] hover:to-[#38e07b] text-black font-semibold px-6">
              Go Home
            </Button>
          </Link>
          <Link href="/gate">
            <Button variant="outline" className="border-[#29382f] text-white hover:border-[#38e07b]/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to app
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


