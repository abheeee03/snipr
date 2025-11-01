export interface TranscriptItem {
  lang: string;        // "en"
  text: string;        // actual subtitle text
  offset: number;      // timestamp in ms
  duration: number;    // duration in ms
}

export interface TranscriptResponse {
  lang: string;                // main language
  availableLangs: string[];    // e.g. ["en"]
  content: TranscriptItem[];   // array of subtitle lines
}

export type PageStateType = "loading_summary" | "loading_transcript" | "error" | "ready"




// db items
export type VideoHistory = {
  id: string;
  userID: string;
  videoID: string;
  saved_at: string;
}

export type VideoData = {
  id: string;
  summary: string;
  suggested_clips: {
    title: string;
    time: string;
  }[];
  transcript: TranscriptResponse;
  fetched_at: string;
  videoID: string;
}