"use client";

import { ArrowRight, CheckCircle2, Mail, TriangleAlert } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    FREYKRAFT_CONFIG?: {
      emailCaptureEndpoint?: string;
      contactEmail?: string;
      mode?: string;
    };
  }
}

export function EmailCaptureForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  const utm = useMemo(() => {
    if (typeof window === "undefined") {
      return {};
    }

    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
        .map((key) => [key, params.get(key)])
        .filter((entry): entry is [string, string] => Boolean(entry[1])),
    );
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const endpoint = getCaptureEndpoint();

    if (!endpoint) {
      openEmailFallback(email, utm);
      setState("success");
      setMessage("Opening your email client for early access.");
      return;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        company,
        source: "prelaunch-home",
        utm,
      }),
    });

    const result = (await response.json()) as {
      ok?: boolean;
      message?: string;
    };

    if (!response.ok || !result.ok) {
      setState("error");
      setMessage(result.message ?? "Email capture is temporarily unavailable.");
      return;
    }

    setState("success");
    setMessage(result.message ?? "You are on the early access list.");
    setEmail("");
  }

  return (
    <form className="w-full max-w-[620px]" onSubmit={onSubmit}>
      <div className="flex min-h-14 flex-col sm:flex-row">
        <label className="sr-only" htmlFor="email">
          Email address
        </label>
        <div className="relative flex-1">
          <Mail
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-taupe"
          />
          <input
            id="email"
            name="email"
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email for early access"
            className="h-14 w-full border border-hairline bg-transparent pl-12 pr-4 text-base font-light text-ink outline-none placeholder:text-muted focus:border-muted"
          />
        </div>
        <input
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          aria-hidden="true"
          name="company"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex h-14 min-w-[174px] items-center justify-center gap-2 bg-forest px-6 text-[12px] font-medium uppercase tracking-[0.16em] text-sand transition hover:bg-forest-dark disabled:cursor-wait disabled:opacity-70"
        >
          {state === "submitting" ? "Joining" : "Join the List"}
          <ArrowRight aria-hidden="true" className="size-5" />
        </button>
      </div>
      <p
        className={[
          "mt-3 flex min-h-6 items-center justify-center gap-2 text-sm lg:justify-start",
          state === "error" ? "text-terracotta-dark" : "text-olive",
        ].join(" ")}
        role={state === "error" ? "alert" : "status"}
      >
        {state === "success" && (
          <CheckCircle2 aria-hidden="true" className="size-4" />
        )}
        {state === "error" && (
          <TriangleAlert aria-hidden="true" className="size-4" />
        )}
        {message ||
          "Early access includes launch updates and first collection notes."}
      </p>
    </form>
  );
}

function getCaptureEndpoint() {
  if (typeof window !== "undefined") {
    const configuredEndpoint =
      window.FREYKRAFT_CONFIG?.emailCaptureEndpoint?.trim();

    if (configuredEndpoint && !isPlaceholderEndpoint(configuredEndpoint)) {
      return configuredEndpoint;
    }
  }

  if (
    process.env.NEXT_PUBLIC_EMAIL_CAPTURE_ENDPOINT &&
    !isPlaceholderEndpoint(process.env.NEXT_PUBLIC_EMAIL_CAPTURE_ENDPOINT)
  ) {
    return process.env.NEXT_PUBLIC_EMAIL_CAPTURE_ENDPOINT;
  }

  return process.env.NEXT_PUBLIC_STATIC_EXPORT === "true"
    ? ""
    : "/api/subscribe";
}

function isPlaceholderEndpoint(endpoint: string) {
  return endpoint.includes("YOUR_ENDPOINT_ID");
}

function openEmailFallback(email: string, utm: Record<string, string>) {
  if (typeof window === "undefined") {
    return;
  }

  const contactEmail =
    window.FREYKRAFT_CONFIG?.contactEmail?.trim() || "hello@freykraft.com";
  const utmText = Object.entries(utm)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  const body = [
    "Hello Freykraft studio,",
    "",
    "Please add me to early access.",
    "",
    `Email: ${email}`,
    utmText ? `\nCampaign:\n${utmText}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
    "Freykraft early access",
  )}&body=${encodeURIComponent(body)}`;
}
