import { z } from "zod";

/** Shared enquiry schema — used for client-side validation AND re-validated on
 *  the server. Never trust the client; the route handler parses this again. */

export const EVENT_TYPE_OPTIONS = [
  "Private dining",
  "Corporate",
  "Wedding / celebration",
  "Pop-up / market",
  "Other",
] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(120),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  eventType: z.enum(EVENT_TYPE_OPTIONS, {
    errorMap: () => ({ message: "Please choose the kind of event." }),
  }),
  eventDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please use the date picker.")
    .optional()
    .or(z.literal("")),
  guestCount: z
    .union([z.coerce.number().int().min(1, "At least one guest.").max(100000), z.literal("")])
    .optional(),
  location: z.string().trim().max(160).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two about your event helps us help you.")
    .max(4000),
  // honeypot — must stay empty. Real users never see this field.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/** Field-level error map keyed by field name, as returned to the client. */
export type EnquiryFieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export function flattenFieldErrors(error: z.ZodError<EnquiryInput>): EnquiryFieldErrors {
  const out: EnquiryFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof EnquiryInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
