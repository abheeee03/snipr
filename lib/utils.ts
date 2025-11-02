import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TranscriptItem, TranscriptResponse } from "./types";
import { createClient } from "./supabase/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function transcriptToString(transcript: TranscriptResponse) {
  return transcript.content
    .map((line: TranscriptItem) => line.text.trim())
    .join(" ");
}


export async function checkUserLimit() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    await supabase.auth.signInAnonymously()
  }

  const today = new Date().toISOString().split("T")[0];

  const { count, error } = await supabase
    .from("chat_usage_log")
    .select("*", { count: "exact", head: true })
    .eq("userID", user!.id)
    .gte("created_at", today);

  if (error) {
    console.error("Usage check failed:", error);
    return true; // fail open to avoid UX block
  }

  const usageCount = count ?? 0;

  // Anonymous users get 1 per day
  if (user!.is_anonymous) {
    return usageCount < 1;
  }

  // Logged-in users get 5 per day
  return usageCount < 5;
}

export const updateLimit = async ()=>{
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error("No user found for updating limit");
    return;
  }

  const { error } = await supabase
    .from("chat_usage_log")
    .insert([{ userID: user.id }]);

  if (error) {
    console.error("Failed to update usage log:", error);
  }
}


export const handelSignin = async () => {
  const supabase = createClient()
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
}