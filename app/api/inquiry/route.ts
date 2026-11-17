import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/inquiry";

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "The form could not be read." },
      { status: 400 },
    );
  }

  if (!input || typeof input !== "object") {
    return NextResponse.json(
      { ok: false, message: "The form could not be read." },
      { status: 400 },
    );
  }

  const { errors, honeypot, value } = validateInquiry(input);
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }
  if (!value) {
    return NextResponse.json(
      { ok: false, errors, message: "Check the highlighted fields." },
      { status: 422 },
    );
  }

  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "inquiries.ndjson"),
      JSON.stringify({ ...value, receivedAt: new Date().toISOString() }) + "\n",
      "utf8",
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "We couldn't save your message. Email info@wbdigitech.ae.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
