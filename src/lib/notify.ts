import "server-only";
import type { EnquiryInput } from "./enquiry";

/** Optional new-enquiry email via Resend. Fully behind an env flag:
 *  notifications only fire when ENQUIRY_NOTIFICATIONS_ENABLED === "true" AND a
 *  RESEND_API_KEY is present. Missing config is a no-op, never an error, and we
 *  never block (or fail) a submission on the email. No key => no email, ever. */

export function notificationsEnabled(): boolean {
  return (
    process.env.ENQUIRY_NOTIFICATIONS_ENABLED === "true" &&
    Boolean(process.env.RESEND_API_KEY)
  );
}

export async function sendEnquiryNotification(enquiry: EnquiryInput): Promise<void> {
  if (!notificationsEnabled()) return;

  const apiKey = process.env.RESEND_API_KEY!;
  const to = process.env.ENQUIRY_NOTIFICATION_TO ?? "hello@chefpskitchen.co.uk";
  const from = process.env.ENQUIRY_NOTIFICATION_FROM ?? "enquiries@chefpskitchen.co.uk";

  const lines = [
    `New enquiry from ${enquiry.name}`,
    "",
    `Email: ${enquiry.email}`,
    enquiry.phone ? `Phone: ${enquiry.phone}` : null,
    `Event type: ${enquiry.eventType}`,
    enquiry.eventDate ? `Date: ${enquiry.eventDate}` : null,
    enquiry.guestCount ? `Guests: ${enquiry.guestCount}` : null,
    enquiry.location ? `Location: ${enquiry.location}` : null,
    "",
    "Message:",
    enquiry.message,
  ].filter(Boolean);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: enquiry.email,
        subject: `New enquiry — ${enquiry.eventType} — ${enquiry.name}`,
        text: lines.join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("Enquiry notification failed:", res.status, await res.text());
    }
  } catch (err) {
    // Never let the email path break the submission.
    console.error("Enquiry notification threw:", err);
  }
}
