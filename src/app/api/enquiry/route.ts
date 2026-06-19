import { NextResponse } from "next/server";
import { enquirySchema, flattenFieldErrors } from "@/lib/enquiry";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-server";
import { sendEnquiryNotification } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Re-validate on the server. Never trust the client.
  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, fieldErrors: flattenFieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot tripped — pretend success so bots get no signal.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "The enquiry service is not configured yet. Please email hello@chefpskitchen.co.uk in the meantime.",
      },
      { status: 503 },
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("enquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      event_type: data.eventType,
      event_date: data.eventDate || null,
      guest_count: typeof data.guestCount === "number" ? data.guestCount : null,
      location: data.location || null,
      message: data.message,
      source: "website",
    });

    if (error) {
      console.error("Supabase insert failed:", error);
      return NextResponse.json(
        { ok: false, error: "Something went wrong saving your enquiry. Please try again." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Enquiry handler threw:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong saving your enquiry. Please try again." },
      { status: 500 },
    );
  }

  // Fire-and-forget; email never blocks or fails the response.
  await sendEnquiryNotification(data);

  return NextResponse.json({ ok: true });
}
