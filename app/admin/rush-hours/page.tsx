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
import { useCreateRushHourMutation } from "@/app/src/services/api";

import { rushHourSchema, RushHourFormData } from "@/app/src/validations/adminSchema";

const RushHours = () => {
  const [createRushHour, { isLoading }] = useCreateRushHourMutation();

  const form = useForm<RushHourFormData>({
    resolver: zodResolver(rushHourSchema),
    defaultValues: { weekDay: 1, from: "08:00", to: "10:00" },
  });

  const onSubmit = async (values: RushHourFormData) => {
    try {
      await createRushHour(values).unwrap();
      toast.success("Rush Hour created successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to create Rush Hour");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg p-8 rounded-2xl bg-[#0a0f0c]/80 shadow-lg shadow-[#38e07b]/20">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Rush Hour
        </h2>

        <Form {...form}>
          {/* Weekday dropdown */}
          <FormField
            control={form.control}
            name="weekDay"
            render={({ field }) => (
              <FormItem className="mb-4">
                <Label className="text-[#9eb7a8]">Week Day</Label>
                <FormControl>
                  <select
                    {...field}
                    className="w-full px-3 py-2 rounded-lg border border-[#29382f] bg-[#0a0f0c]/50 text-white focus:ring-2 focus:ring-[#38e07b] focus:border-transparent transition"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value}
                  >
                    <option value={0}>Sunday</option>
                    <option value={1}>Monday</option>
                    <option value={2}>Tuesday</option>
                    <option value={3}>Wednesday</option>
                    <option value={4}>Thursday</option>
                    <option value={5}>Friday</option>
                    <option value={6}>Saturday</option>
                  </select>
                </FormControl>
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />

          {/* From Time */}
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="mb-4">
                <Label className="text-[#9eb7a8]">From</Label>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    className="w-full px-3 py-2 rounded-lg border border-[#29382f] bg-[#0a0f0c]/50 text-white focus:ring-2 focus:ring-[#38e07b] focus:border-transparent transition"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500 mt-1" />
              </FormItem>
            )}
          />

          {/* To Time */}
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="mb-6">
                <Label className="text-[#9eb7a8]">To</Label>
                <FormControl>
                  <Input
                    type="time"
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
            {isLoading ? "Creating..." : "Create Rush Hour"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RushHours;
