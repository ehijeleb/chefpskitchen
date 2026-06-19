import { NextResponse } from "next/server";
import { enquirySchema, flattenFieldErrors } from "@/lib/enquiry";

export const runtime = "nodejs";

/** Enquiry handler. Validates server-side, then forwards to Web3Forms, which
 *  emails the enquiry to the inbox tied to WEB3FORMS_ACCESS_KEY. No database.
 *  The key is read server-side so the client never has to carry it, and we get
 *  our own validation, honeypot and response shape on top of Web3Forms. */

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

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

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
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
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New enquiry — ${data.eventType} — ${data.name}`,
        from_name: "Chef P's Kitchen website",
        // Web3Forms uses the `email` field as the reply-to address.
        name: data.name,
        email: data.email,
        phone: data.phone || "Not given",
        event_type: data.eventType,
        event_date: data.eventDate || "Not given",
        guest_count: typeof data.guestCount === "number" ? data.guestCount : "Not given",
        location: data.location || "Not given",
        message: data.message,
        // Web3Forms' own honeypot, in addition to ours.
        botcheck: "",
      }),
    });

    const result = await res.json().catch(() => ({}));
    if (!res.ok || !result.success) {
      console.error("Web3Forms submit failed:", res.status, result);
      return NextResponse.json(
        { ok: false, error: "Something went wrong sending your enquiry. Please try again." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Enquiry handler threw:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your enquiry. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
