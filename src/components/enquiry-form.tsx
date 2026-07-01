"use client";

import { useMemo, useRef, useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import {
  EVENT_TYPE_OPTIONS,
  enquirySchema,
  flattenFieldErrors,
  type EnquiryFieldErrors,
  type EnquiryInput,
} from "@/lib/enquiry";
import { Button } from "@/components/ui";
import { SwooshDivider } from "@/components/brand";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";

type Values = Record<keyof EnquiryInput, string>;

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  guestCount: "",
  location: "",
  message: "",
  company: "",
};

// Order used to focus the first invalid field after a failed submit.
const FIELD_ORDER: (keyof EnquiryInput)[] = [
  "name",
  "email",
  "phone",
  "eventType",
  "eventDate",
  "guestCount",
  "location",
  "message",
];

const inputClass =
  "min-h-11 w-full rounded-md border bg-surface px-3.5 py-2.5 text-ink placeholder:text-ink-muted/60 " +
  "transition-[border-color,box-shadow] duration-150 [transition-timing-function:var(--ease-out)] " +
  "focus-visible:outline-none focus-visible:border-terracotta focus-visible:ring-2 focus-visible:ring-ring/40";

export function EnquiryForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const refs = useRef<Partial<Record<keyof Values, HTMLElement | null>>>({});

  // Live client-side validation (display gated by `touched`).
  const clientErrors: EnquiryFieldErrors = useMemo(() => {
    const parsed = enquirySchema.safeParse(values);
    return parsed.success ? {} : flattenFieldErrors(parsed.error);
  }, [values]);

  function errorFor(field: keyof EnquiryInput): string | undefined {
    return touched[field] ? clientErrors[field] : undefined;
  }

  function set(field: keyof Values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function blur(field: keyof Values) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      const errs = flattenFieldErrors(parsed.error);
      setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])));
      const first = FIELD_ORDER.find((f) => errs[f]);
      if (first) refs.current[first]?.focus();
      return;
    }

    // Honeypot tripped — pretend success so bots get no signal.
    if (parsed.data.company) {
      setStatus("success");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setServerError(
        `The enquiry form isn't connected yet. Please email ${SITE.email} and we'll get right back to you.`,
      );
      setStatus("error");
      return;
    }

    const d = parsed.data;
    setStatus("submitting");
    try {
      // Web3Forms requires client-side submission on the free plan. The access
      // key is public by design; spam is handled by the honeypots below + any
      // captcha enabled in the Web3Forms dashboard.
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New enquiry — ${d.eventType} — ${d.name}`,
          from_name: "Chef P's Kitchen website",
          name: d.name,
          email: d.email,
          phone: d.phone || "Not given",
          event_type: d.eventType,
          event_date: d.eventDate || "Not given",
          guest_count: typeof d.guestCount === "number" ? d.guestCount : "Not given",
          location: d.location || "Not given",
          message: d.message,
          botcheck: "", // Web3Forms' own honeypot
        }),
      });
      const result = await res.json().catch(() => ({}));

      if (res.ok && result.success) {
        setStatus("success");
        return;
      }
      setServerError(
        `Something went wrong sending your enquiry. Please try again, or email ${SITE.email}.`,
      );
      setStatus("error");
    } catch {
      setServerError(
        `We couldn't reach the server. Please check your connection and try again, or email ${SITE.email}.`,
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-5 rounded-xl border border-border bg-surface-raised px-6 py-14 text-center"
      >
        <span className="inline-grid size-14 place-items-center rounded-full bg-gold/20 text-accent-text">
          <Heart className="size-6" aria-hidden />
        </span>
        <h2 className="text-3xl">Thank you, your enquiry is in.</h2>
        <SwooshDivider width={120} />
        <p className="max-w-md text-lg leading-relaxed text-ink-muted">
          A real person will read it and come back to you within{" "}
          {/* TODO: confirm real lead time */}a couple of days with ideas for your event. In the
          meantime, you can reply to our email any time at {SITE.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {/* honeypot — visually hidden, off-screen, not announced to AT */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave this blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" required error={errorFor("name")}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={inputClass}
            aria-invalid={!!errorFor("name")}
            aria-describedby={errorFor("name") ? "name-error" : undefined}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            ref={(el) => { refs.current.name = el; }}
          />
        </Field>

        <Field
          label="Email"
          name="email"
          required
          error={errorFor("email")}
        >
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            className={inputClass}
            aria-invalid={!!errorFor("email")}
            aria-describedby={errorFor("email") ? "email-error" : undefined}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            ref={(el) => { refs.current.email = el; }}
          />
        </Field>

        <Field label="Phone" name="phone" hint="Optional" error={errorFor("phone")}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={inputClass}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => blur("phone")}
            ref={(el) => { refs.current.phone = el; }}
          />
        </Field>

        <Field label="Type of event" name="eventType" required error={errorFor("eventType")}>
          <select
            id="eventType"
            name="eventType"
            required
            className={cn(inputClass, "cursor-pointer pr-9")}
            aria-invalid={!!errorFor("eventType")}
            aria-describedby={errorFor("eventType") ? "eventType-error" : undefined}
            value={values.eventType}
            onChange={(e) => set("eventType", e.target.value)}
            onBlur={() => blur("eventType")}
            ref={(el) => { refs.current.eventType = el; }}
          >
            <option value="" disabled>
              Choose one…
            </option>
            {EVENT_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Event date" name="eventDate" hint="Optional" error={errorFor("eventDate")}>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            className={inputClass}
            value={values.eventDate}
            onChange={(e) => set("eventDate", e.target.value)}
            onBlur={() => blur("eventDate")}
            ref={(el) => { refs.current.eventDate = el; }}
          />
        </Field>

        <Field label="Guest count" name="guestCount" hint="Optional" error={errorFor("guestCount")}>
          <input
            id="guestCount"
            name="guestCount"
            type="number"
            inputMode="numeric"
            min={1}
            className={inputClass}
            aria-invalid={!!errorFor("guestCount")}
            aria-describedby={errorFor("guestCount") ? "guestCount-error" : undefined}
            value={values.guestCount}
            onChange={(e) => set("guestCount", e.target.value)}
            onBlur={() => blur("guestCount")}
            ref={(el) => { refs.current.guestCount = el; }}
          />
        </Field>
      </div>

      <Field label="Location or postcode" name="location" hint="Optional" error={errorFor("location")}>
        <input
          id="location"
          name="location"
          type="text"
          autoComplete="postal-code"
          placeholder="Where is your event?"
          className={inputClass}
          value={values.location}
          onChange={(e) => set("location", e.target.value)}
          onBlur={() => blur("location")}
          ref={(el) => { refs.current.location = el; }}
        />
      </Field>

      <Field
        label="Tell us about your event"
        name="message"
        required
        error={errorFor("message")}
      >
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="The occasion, rough numbers, any dishes you're dreaming of, anything we should know."
          className={cn(inputClass, "min-h-32 resize-y")}
          aria-invalid={!!errorFor("message")}
          aria-describedby={errorFor("message") ? "message-error" : undefined}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          onBlur={() => blur("message")}
          ref={(el) => { refs.current.message = el; }}
        />
      </Field>

      {serverError ? (
        <p role="alert" className="rounded-md border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-accent-text">
          {serverError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </Button>
        <p className="text-sm text-ink-muted">
          We'll only use your details to reply about your event.
        </p>
      </div>
    </form>
  );
}

/* Field wrapper — label above input, error beneath, consistent spacing. */
function Field({
  label,
  name,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="flex items-baseline justify-between text-sm font-medium text-ink">
        <span>
          {label}
          {required ? <span className="text-accent-text"> *</span> : null}
        </span>
        {hint ? <span className="text-xs font-normal text-ink-muted">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="text-sm text-accent-text">
          {error}
        </p>
      ) : null}
    </div>
  );
}
