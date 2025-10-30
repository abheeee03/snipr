import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TranscriptItem, TranscriptResponse } from "./types";

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