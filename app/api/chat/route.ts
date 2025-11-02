import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-2.5-flash-lite";
const API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: Request) {
  const { message, transcript } = await req.json();

  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required" }), {
      status: 400,
    });
  }

  if (!transcript) {
    return new Response(JSON.stringify({ error: "Transcript is required" }), {
      status: 400,
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Convert transcript array to plain text
    const transcriptText = transcript.content
      .map((item: { text: string }) => item.text.trim())
      .join(" ");

    const prompt = `You are an AI assistant created by Snipr helping users understand a YouTube video based on its transcript. 
    
The user will ask you questions about the video content, and you should answer based solely on the transcript provided below.

Guidelines:
- Answer questions accurately based on the transcript
- If the answer cannot be found in the transcript, politely say Sorry Did not found the context
- Be concise and helpful - keep answers under 200 words when possible
- You can reference specific topics, concepts, or key points mentioned in the video
- Keep your answers conversational and friendly
- IMPORTANT: Keep responses brief and focused. Avoid lengthy explanations unless specifically asked for detailed information.

Video Transcript:
${transcriptText}

User Question: ${message}

Please provide a helpful answer based on the transcript:`;

    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      generationConfig: {
        maxOutputTokens: 500, // Limit to ~375-400 words (roughly 500 tokens)
        temperature: 0.7,
      },
    });

    const result = await model.generateContent([prompt]);

    const response = result.response;
    const answer = response.text();
    
    // Additional safety check: truncate if still too long (shouldn't happen with token limit)
    const truncatedAnswer = answer.length > 800 ? answer.substring(0, 800) + '...' : answer;
    
    return new Response(JSON.stringify({ answer: truncatedAnswer }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
    });
  }
}
