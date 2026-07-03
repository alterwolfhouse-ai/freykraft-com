import { NextResponse } from "next/server";
import {
  SubscriberProviderError,
  captureSubscriber,
  isValidEmail,
  normalizeEmail
} from "@/lib/subscribers";

export const runtime = "nodejs";

type SubscribePayload = {
  email?: unknown;
  source?: unknown;
  company?: unknown;
  utm?: unknown;
};

export async function POST(request: Request) {
  let payload: SubscribePayload;

  try {
    payload = (await request.json()) as SubscribePayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Send a valid JSON request." },
      { status: 400 }
    );
  }

  // Honeypot: bots can be ignored without revealing the filter.
  if (String(payload.company ?? "").trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = normalizeEmail(payload.email);

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Enter a valid email address." },
      { status: 400 }
    );
  }

  const subscriber = {
    email,
    source: String(payload.source ?? "prelaunch-home").slice(0, 80),
    consent: true,
    optedInAt: new Date().toISOString(),
    utm: readUtm(payload.utm)
  };

  try {
    const result = await captureSubscriber(subscriber);
    return NextResponse.json({
      ok: true,
      provider: result.provider,
      message: "You are on the early access list."
    });
  } catch (error) {
    if (error instanceof SubscriberProviderError) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { ok: false, message: "Email capture is temporarily unavailable." },
      { status: 500 }
    );
  }
}

function readUtm(value: unknown) {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const entries = Object.entries(value)
    .filter((entry): entry is [string, string] => typeof entry[1] === "string")
    .map(([key, entryValue]) => [key.slice(0, 40), entryValue.slice(0, 160)]);

  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
}
