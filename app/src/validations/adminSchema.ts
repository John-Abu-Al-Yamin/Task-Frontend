import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  rateNormal: z
    .number()
    .nonnegative("Normal rate must be non-negative")
    .max(1000, "Normal rate seems too high"),
  rateSpecial: z
    .number()
    .nonnegative("Special rate must be non-negative")
    .max(1000, "Special rate seems too high"),
});

export const rushHourSchema = z
  .object({
    weekDay: z
      .number()
      .int()
      .min(0, "Weekday must be between 0 (Sunday) and 6 (Saturday)")
      .max(6, "Weekday must be between 0 (Sunday) and 6 (Saturday)"),

    from: z.string().refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: "Time must be in HH:MM format",
    }),

    to: z.string().refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: "Time must be in HH:MM format",
    }),
  })
  .refine(
    (data) => {
      // Ensure 'from' is before 'to'
      const [fromHours, fromMinutes] = data.from.split(":").map(Number);
      const [toHours, toMinutes] = data.to.split(":").map(Number);
      return (
        fromHours < toHours ||
        (fromHours === toHours && fromMinutes < toMinutes)
      );
    },
    {
      message: "'From' time must be earlier than 'To' time",
      path: ["to"], // Show error on 'to' field
    }
  );
// Vacation Schema
export const vacationSchema = z
  .object({
    name: z
      .string()
      .min(2, "Vacation name must be at least 2 characters")
      .max(50, "Vacation name must be at most 50 characters"),
    from: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "From date must be in YYYY-MM-DD format",
    }),
    to: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "To date must be in YYYY-MM-DD format",
    }),
  })
  .refine((data) => new Date(data.from) <= new Date(data.to), {
    message: "'From' date must be before or equal to 'To' date",
    path: ["to"],
  });

export type VacationFormData = z.infer<typeof vacationSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type RushHourFormData = z.infer<typeof rushHourSchema>;
