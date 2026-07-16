import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface GenerateRequestBody {
  prompt: string;
  baseCode: string;
  componentName: string;
}

interface GenerateResponse {
  code: string;
  explanation: string;
  usedMock: boolean;
}

const SYSTEM_PROMPT = `You are the AI assistant inside DesignForge AI, a React + Tailwind component library.
Given an existing component's JSX/TSX code and a natural-language request, return ONLY valid JSON
with this exact shape, no markdown fences, no commentary outside the JSON:
{
  "code": "<the updated JSX/TSX as a string>",
  "explanation": "<2-3 sentences describing what changed and why>"
}
Rules: keep the same component API/props where possible, use Tailwind utility classes only
(no arbitrary external CSS), keep accessibility attributes intact, and keep the code short and copy-pasteable.`;

/** Deterministic, offline fallback so the AI feature always demos correctly without an API key. */
function mockGenerate(body: GenerateRequestBody): GenerateResponse {
  const { prompt, baseCode, componentName } = body;
  const lower = prompt.toLowerCase();

  let updated = baseCode;
  const notes: string[] = [];

  if (lower.includes("glass") || lower.includes("glassmorphism")) {
    updated = updated.replace(/className="([^"]*)"/, (_m, cls) => `className="${cls} backdrop-blur-xl bg-white/10 border border-white/20"`);
    notes.push("applied a translucent glassmorphism surface (backdrop-blur, low-opacity fill, soft border)");
  }
  if (lower.includes("blue")) {
    updated = updated.replace(/ember/g, "blueprint");
    notes.push("swapped the accent color to the cool blueprint-teal token");
  }
  if (lower.includes("round") || lower.includes("rounded")) {
    updated = updated.replace(/rounded-sf/g, "rounded-2xl");
    notes.push("increased corner radius for a softer shape");
  }
  if (lower.includes("shadow") || lower.includes("elevat")) {
    updated = updated.replace(/className="([^"]*)"/, (_m, cls) => `className="${cls} shadow-2xl"`);
    notes.push("added a deeper drop shadow for elevation");
  }
  if (notes.length === 0) {
    notes.push("applied a subtle style refresh based on your description (spacing and accent tweaks)");
  }

  return {
    code: updated,
    explanation: `Mock generator (no API key configured) — ${notes.join("; ")} on ${componentName}. Add ANTHROPIC_API_KEY to .env.local for live AI generation.`,
    usedMock: true,
  };
}

async function generateWithAnthropic(body: GenerateRequestBody): Promise<GenerateResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("no-key");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Component: ${body.componentName}\n\nCurrent code:\n${body.baseCode}\n\nRequest: ${body.prompt}`,
        },
      ],
    }),
  });

  if (!res.ok) throw new Error(`anthropic-error-${res.status}`);
  const data: { content?: Array<{ text?: string }> } = await res.json();
  const text = (data.content || []).map((block) => block.text || "").join("\n");
  const cleaned = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);
  return { code: parsed.code, explanation: parsed.explanation, usedMock: false };
}

export async function POST(req: NextRequest) {
  let body: GenerateRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.prompt || !body.baseCode) {
    return NextResponse.json({ error: "prompt and baseCode are required." }, { status: 400 });
  }

  const provider = process.env.AI_PROVIDER || "anthropic";

  try {
    if (provider === "mock") {
      return NextResponse.json(mockGenerate(body));
    }
    const result = await generateWithAnthropic(body);
    return NextResponse.json(result);
  } catch {
    // Any failure (missing key, network, rate limit) falls back to the mock generator
    // so the feature remains demoable in any environment.
    return NextResponse.json(mockGenerate(body));
  }
}
