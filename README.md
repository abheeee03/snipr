# 🎬 Snipr

> *Turn hour-long videos into 5 mins summary* 🧠

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e?logo=supabase)](https://supabase.com)

## 🔥 What's this about?

Tired of watching 2-hour YouTube videos just to get the main points? Same bestie, same. **Snipr** is here to rescue your attention span! 

Drop any YouTube URL and we'll:
- 📝 Generate crystal-clear summaries
- ⏰ Extract suggested clips with timestamps
- 🤖 chat with that video
- 🎯 Help you learn faster without the fluff

No cap, this will change how you consume content! 

## 🚀 Quick Start (it's giving efficiency)

```bash
# Clone 
git clone https://github.com/abheeee03/snipr.git
cd snipr

# Install (we're using pnpm because it hits different)
pnpm install

# start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Next.js 15**
- **TypeScript** 
- **Tailwind CSS**
- **Supabase** 
- **Shadcn/ui** 
- **Gemini API**
- **Upstash Redis**
- **SupData**

## 🎨 Features that go hard

- 🎥 **YouTube Integration** - Paste any YT link, we got you
- 📊 **Smart Summaries** - AI-powered content breakdown
- 🎯 **Timestamp Navigation** - Jump to the good parts instantly
- 🎯 **Chat With Video** - Talk with the Video Like Human
- 👤 **User Accounts** - Track your summarized videos
- 📱 **Responsive Design** - Looks fire on any device
- ⚡ **Rate Limiting** - Fair usage for everyone

## 🏗️ Project Structure (organized chaos)

```
snipr/
├── app/                    # Next.js App Router (the new hotness)
│   ├── analyze/[id]/      # Video analysis page
│   ├── your-videos/       # User's video history
│   └── api/               # Backend endpoints
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn components
│   └── kokonutui/        # Extra spicy animations
├── lib/                  # Utilities and helpers
└── public/               # Static assets
```

## 🎯 How to contribute 

1. Fork this repo
2. Create a branch (`git checkout -b feature/amazing-thing`)
3. Make your changes (make them count!)
4. Commit (`git commit -m "add: some fire feature"`)
5. Push (`git push origin feature/amazing-thing`)
6. Open a PR (we love good contributions!)

## 🌟 Roadmap (what's coming next)

- [ ] AI Chat with videos (in progress)
- [ ] Chrome extension
- [ ] More video platforms support

## 📝 Environment Variables (the secret sauce)

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI
OPENAI_API_KEY=your_openai_key
SUPDATA_API_KEY

# YouTube API (optional)
YOUTUBE_API_KEY=your_youtube_key

#redis
UPSTASH_REDIS_REST_TOKEN
UPSTASH_REDIS_REST_URL
```

## 🤝 Built with 💖 by

[@abheeee03](https://github.com/abheeee03) - Your friendly neighborhood developer

## 📄 License

MIT License - Use it, love it, make it better!

---

*Remember: Life's too short for long videos. Snipr it! 🎬✂️*
