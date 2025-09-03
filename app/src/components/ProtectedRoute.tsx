"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface User {
  id: string;
  username: string;
  role: "admin" | "employee";
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "employee")[];
  redirectTo?: string; // default redirect for unauthorized
  checkLoggedIn?: boolean; // true لو عايزين نمنع الوصول لل login
}

export default function ProtectedRoute({
  children,
  allowedRoles = [],
  redirectTo = "/login",
  checkLoggedIn = false,
}: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        if (!token || !userStr) {
          if (checkLoggedIn) {
            // المستخدم مش مسجل دخول، مسموح له بالوصول
            setIsAuthorized(true);
          } else {
            router.replace(redirectTo);
          }
          return;
        }

        const user: User = JSON.parse(userStr);

        if (checkLoggedIn) {
          // المستخدم مسجل دخول بالفعل، مش مسموح له يدخل صفحة login
          if (user.role === "admin") router.replace("/admin");
          else if (user.role === "employee") router.replace("/checkpoint");
          return;
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
          // لو الـ role مش مسموح له، نعمل redirect حسب دوره
          switch (user.role) {
            case "admin":
              router.replace("/admin");
              break;
            case "employee":
              router.replace("/checkpoint");
              break;
            default:
              router.replace(redirectTo);
          }
          return;
        }

        // لو Admin والـ allowedRoles فيها "admin" => يسمح له بالدخول
        // لو Employee والـ allowedRoles فيها "employee" => يسمح له بالدخول
        setIsAuthorized(true);
      } catch (error) {
        console.log("Auth check failed:", error);
        router.replace(redirectTo);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, allowedRoles, redirectTo, checkLoggedIn]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#38e07b]" />
      </div>
    );
  }

  if (!isAuthorized) return null;

  return <>{children}</>;
}
