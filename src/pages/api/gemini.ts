import type { APIRoute } from "astro";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { PromptFeedback } from "@google/generative-ai";

// ---

const genAI = new GoogleGenerativeAI(import.meta.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig: {},
  safetySettings: [],
});
const generationConfig = {
  temperature: 0.2,
  topK: 2,
  topP: 0.2,
  maxOutputTokens: 1800,
};

// ---

const sanitizeInput = (input: string) => {
  return input.replace(/API_KEY/g, "");
};

const validateInput = (
  input: any
): { valid: false; reason: string } | { valid: true; prompt: string } => {
  const PROMPT_MAX_LENGTH = 703; // template 653 chars + concept 50 chars

  if (!input?.prompt || input.prompt.length > PROMPT_MAX_LENGTH) {
    return {
      valid: false,
      reason: "Prompt empty, invalid, or exceed character limit.",
    };
  }
  return {
    valid: true,
    prompt: sanitizeInput(input.prompt),
  };
};

// ---

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  const validated = validateInput(data);
  if (!validated.valid) {
    return new Response(JSON.stringify(validated.reason), {
      status: 400,
    });
  }

  const headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "origin",
  });

  // const response = (await model.generateContent(validated.prompt)).response;
  const response = (
    await model.generateContent({
      contents: [{ role: "user", parts: [{ text: validated.prompt }] }],
      generationConfig,
    })
  ).response;

  try {
    const resText = response.text();
    return new Response(JSON.stringify({ response: resText }), { headers });
  } catch (err) {
    // @ts-ignore
    if (err instanceof Error && err.response?.promptFeedback?.blockReason) {
      const resObj = {
        response: err.message,
        // @ts-ignore
        promptFeedback: err.response.promptFeedback as PromptFeedback,
      };
      return new Response(JSON.stringify(resObj), { headers });
    }
    return new Response(
      JSON.stringify(err instanceof Error ? err.message : err),
      { status: 500 }
    );
  }
};
