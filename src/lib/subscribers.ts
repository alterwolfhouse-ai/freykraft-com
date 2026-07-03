import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

export type SubscriberInput = {
  email: string;
  source: string;
  consent: boolean;
  optedInAt: string;
  utm?: Record<string, string>;
};

export class SubscriberProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SubscriberProviderError";
  }
}

export function normalizeEmail(value: unknown) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function captureSubscriber(input: SubscriberInput) {
  const webhookUrl = process.env.EMAIL_CAPTURE_WEBHOOK_URL;

  if (webhookUrl) {
    await postSubscriberToWebhook(webhookUrl, input);
    return { provider: "webhook" as const };
  }

  const allowLocalStore =
    process.env.NODE_ENV !== "production" ||
    process.env.EMAIL_CAPTURE_ALLOW_LOCAL_STORE === "true";

  if (!allowLocalStore) {
    throw new SubscriberProviderError(
      "Email capture provider is not configured."
    );
  }

  await appendSubscriberLocally(input);
  return { provider: "local-dev" as const };
}

async function postSubscriberToWebhook(
  webhookUrl: string,
  input: SubscriberInput
) {
  const headers: Record<string, string> = {
    "content-type": "application/json"
  };

  if (process.env.EMAIL_CAPTURE_WEBHOOK_SECRET) {
    headers.authorization = `Bearer ${process.env.EMAIL_CAPTURE_WEBHOOK_SECRET}`;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    throw new SubscriberProviderError(
      `Email capture provider returned ${response.status}.`
    );
  }
}

async function appendSubscriberLocally(input: SubscriberInput) {
  const directory = path.join(process.cwd(), ".local");
  await mkdir(directory, { recursive: true });
  await appendFile(
    path.join(directory, "email-subscribers.jsonl"),
    `${JSON.stringify(input)}\n`,
    "utf8"
  );
}
