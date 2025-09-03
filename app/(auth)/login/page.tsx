"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, User, Lock, Sparkles, Loader2 } from "lucide-react";

import { loginSchema, LoginFormData } from "@/app/src/validations/authSchema";
import { useLoginMutation } from "@/app/src/services/api";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/src/components/ProtectedRoute";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login(data).unwrap();
      console.log("Login success:", res);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success(`Welcome ${res.user.username}!`);

      if (res.user.role === "admin") {
        router.replace("/admin");
      } else if (res.user.role === "employee") {
        router.replace("/checkpoint");
      }
    } catch (err: any) {
      console.log("Login failed:", err?.data?.message || err);

      toast.error(err?.data?.message || "Login failed");
    }
  };
  return (
    <ProtectedRoute checkLoggedIn={true}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-transparent overflow-hidden">
          <CardHeader className="text-center space-y-4 pb-6 relative">
            <div className="mx-auto w-14 h-14 bg-gradient-to-br from-[#38e07b] to-[#2dd968] rounded-2xl flex items-center justify-center mb-2 shadow-lg shadow-[#38e07b]/20">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <CardTitle className="text-3xl font-bold text-white tracking-tight">
              Welcome Back
            </CardTitle>
            <p className="text-[#9eb7a8] text-sm leading-relaxed max-w-xs mx-auto">
              Sign in to access your dashboard — whether you're an{" "}
              <span className="font-semibold text-[#38e07b]">Admin</span> or an{" "}
              <span className="font-semibold text-[#38e07b]">Employee</span>.
            </p>
          </CardHeader>

          <CardContent className="space-y-6 relative">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-300 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-[#38e07b]" />
                  Username
                </Label>
                <Input
                  id="username"
                  {...register("username")}
                  placeholder="Enter your username"
                  className="bg-[#0a0f0c]/50 border-[#29382f] text-white placeholder:text-[#9eb7a8]/70 focus-visible:ring-[#38e07b] focus-visible:border-[#38e07b] transition-all duration-200 h-12 pl-4"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#38e07b]" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Enter your password"
                    className="bg-[#0a0f0c]/50 border-[#29382f] text-white placeholder:text-[#9eb7a8]/70 focus-visible:ring-[#38e07b] focus-visible:border-[#38e07b] transition-all duration-200 h-12 pl-4 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9eb7a8] hover:text-[#38e07b] transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#38e07b] to-[#2dd968] hover:from-[#2dd968] hover:to-[#38e07b] text-black font-bold h-12 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#38e07b]/25"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default Login;
