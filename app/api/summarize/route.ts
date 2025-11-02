import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-2.5-flash-lite";
const API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text) {
    return new Response(JSON.stringify({ error: "Context is required" }), {
      status: 400,
    });
  }


  try {
    const genAI = new GoogleGenerativeAI(API_KEY);   

  const prompt = `
  You are an AI that receives a YouTube video transcript as input. Your task is to generate a single JSON object with the following structure:

  {
  "summary": "A concise and accurate summary of the full transcript. Maximum 4-6 sentences.",
  "suggestedClips": [
    {
      "title": "A short, descriptive title for the clip.",
      "time": "Timestamp in the format duration representing where the clip starts in the transcript."
    }
  ]
}

Additional rules:

You must output only valid JSON.
Do not include any extra text before or after the JSON.
"suggestedClips" should contain 1 to 4 clips maximum.
The "time" value must correspond to a meaningful key moment in the transcript (e.g., major point, insightful explanation, emotional highlight).
Do not add comments or explanations.
Do not include any markdown formatting.
The output must always be well-formed JSON only.
the time should in the same format as in the transcript, DONT NOT CHANGE IT JUST RETURN AS IS IT from transcript.
  Transcript:
  ${text}
  `;
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const result = await model.generateContent([
      prompt,
    ]);

    const response = result.response;
    const summary = response.text();
    return new Response(summary, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to summarize video" }), {
      status: 500,
    });
  }
}