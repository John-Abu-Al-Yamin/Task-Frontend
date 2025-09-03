"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useCreateVacationMutation } from "@/app/src/services/api";
import {
  vacationSchema,
  VacationFormData,
} from "@/app/src/validations/adminSchema";

const Vacations = () => {
  const [createVacation, { isLoading }] = useCreateVacationMutation();

  const form = useForm<VacationFormData>({
    resolver: zodResolver(vacationSchema),
    defaultValues: { name: "", from: "", to: "" },
  });

  const onSubmit = async (values: VacationFormData) => {
    try {
      await createVacation(values).unwrap();
      toast.success("Vacation created successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to create vacation");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg p-8 rounded-2xl bg-[#0a0f0c]/80 shadow-lg shadow-[#38e07b]/20">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Vacation
        </h2>

        <Form {...form}>
          {/* Vacation Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <Label className="text-[#9eb7a8]">Vacation Name</Label>
                <FormControl>
                  <Input
                    placeholder="E.g., Eid"
                    {...field}
                    className="w-full px-3 py-2 rounded-lg border border-[#29382f] bg-[#0a0f0c]/50 text-white focus:ring-2 focus:ring-[#38e07b] focus:border-transparent transition"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />

          {/* From Date */}
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="mb-4">
                <Label className="text-[#9eb7a8]">From</Label>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className="w-full px-3 py-2 rounded-lg border border-[#29382f] bg-[#0a0f0c]/50 text-white focus:ring-2 focus:ring-[#38e07b] focus:border-transparent transition"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />

          {/* To Date */}
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="mb-6">
                <Label className="text-[#9eb7a8]">To</Label>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className="w-full px-3 py-2 rounded-lg border border-[#29382f] bg-[#0a0f0c]/50 text-white focus:ring-2 focus:ring-[#38e07b] focus:border-transparent transition"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#38e07b] to-[#2dd968] text-black font-bold py-3 rounded-xl hover:scale-[1.02] hover:shadow-lg hover:shadow-[#38e07b]/25 transition-all duration-300"
          >
            {isLoading ? "Creating..." : "Create Vacation"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Vacations;
