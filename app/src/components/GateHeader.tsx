"use client";

import { Badge } from "@/components/ui/badge";
import { Shield, Wifi, WifiOff, Loader2, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface GateHeaderProps {
  gateNumber: string;
  gateName: string;
  gateId: string;
}

interface AuthUser {
  id: string;
  username: string;
  role: string;
}

const GateHeader = ({
  gateNumber,
  gateName,
  gateId,
}: GateHeaderProps) => {
  const { connectionState } = useWebSocket({ gateId });
  const [now, setNow] = useState<string>(new Date().toLocaleTimeString());
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadAuthData = () => {
      try {
        setIsLoading(true);
        
        // استرجاع بيانات المستخدم
        const rawUser = localStorage.getItem("user");
        let userData: AuthUser | null = null;
        
        if (rawUser) {
          try {
            const parsed = JSON.parse(rawUser);
            if (parsed && parsed.id && parsed.username) {
              userData = parsed;
            }
          } catch (e) {
            console.error("Error parsing user data:", e);
          }
        }
        
        // البحث عن التوكن باسم "token" مباشرة
        let tokenValue = localStorage.getItem("token");
        
        // إذا لم يوجد باسم "token"، نبحث عن أي مفتاح يبدأ بـ "token"
        if (!tokenValue) {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("token")) {
              tokenValue = localStorage.getItem(key);
              break;
            }
          }
        }
        
        setAuthUser(userData);
        setAuthToken(tokenValue);
        
        // Debug: عرض محتويات localStorage للمساعدة في التشخيص
        console.log("User data:", userData);
        console.log("Token found:", tokenValue ? "Yes" : "No");
        console.log("All localStorage keys:", Object.keys(localStorage));
        
      } catch (error) {
        console.error("Failed to load auth data:", error);
        setAuthUser(null);
        setAuthToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      loadAuthData();
      
      // الاستماع للتغييرات في localStorage
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "user" || e.key === "token" || e.key?.startsWith("token")) {
          loadAuthData();
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      
      // تنظيف جميع مفاتيح التوكن المحتملة
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("token")) {
          localStorage.removeItem(key);
        }
      }
        
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAuthUser(null);
      setAuthToken(null);
      router.push("/login");
    }
  };

  const isConnected = connectionState === "open";
  const isConnecting = connectionState === "connecting";

  if (isLoading) {
    return (
      <header className="bg-[#111714] border-b border-[#29382f] px-4 py-4 sm:px-6 sm:py-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <Skeleton className="h-8 w-8 rounded-md bg-[#1a1f1c]" />
            <div>
              <Skeleton className="h-6 w-32 mb-2 bg-[#1a1f1c]" />
              <Skeleton className="h-4 w-24 bg-[#1a1f1c]" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20 bg-[#1a1f1c]" />
            <Skeleton className="h-6 w-24 bg-[#1a1f1c]" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-[#111714] border-b border-[#29382f] px-4 py-4 sm:px-6 sm:py-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-[#38e07b]" />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-white">
                Gate {gateNumber}
              </h1>
              <p className="text-sm sm:text-base text-gray-400">{gateName}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-start sm:justify-end gap-2">
          {authUser && authToken ? (
            <div className="flex items-center gap-2 mr-2 text-xs sm:text-sm">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300 truncate max-w-[12rem]">{authUser.username}</span>
              <Badge className="bg-[#1a1f1c] text-gray-300 border border-[#29382f]">{authUser.role}</Badge>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-7 border-[#29382f] text-gray-200 hover:bg-[#1a1f1c] flex items-center gap-1"
                onClick={handleLogout}
              >
                <LogOut className="h-3 w-3" />
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login" className="mr-2">
              <Button 
                size="sm" 
                variant="default" 
                className="h-7 bg-[#38e07b] text-black hover:bg-[#38e07b]/90 transition-colors"
              >
                Login
              </Button>
            </Link>
          )}
          
          <div className="text-xs sm:text-sm text-gray-300 font-mono px-2 py-1 bg-[#0b120e] border border-[#29382f] rounded">
            {now}
          </div>
          
          {isConnected ? (
            <Badge className="bg-[#38e07b] text-black hover:bg-[#38e07b]/90 text-xs sm:text-sm transition-colors">
              <Wifi className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          ) : isConnecting ? (
            <Badge className="bg-[#1a1f1c] text-gray-300 border border-[#29382f] text-xs sm:text-sm">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Connecting
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-xs sm:text-sm">
              <WifiOff className="h-3 w-3 mr-1" />
              Disconnected
            </Badge>
          )}
        </div>
      </div>
    </header>
  );
};

export default GateHeader;