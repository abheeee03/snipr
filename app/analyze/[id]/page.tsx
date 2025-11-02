"use client"
import { Button } from '@/components/ui/button'
import { DirectionAwareTabs } from '@/components/ui/direction-aware-tabs'
import { PageStateType, TranscriptResponse } from '@/lib/types'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { toast } from 'sonner'
import ReactPlayer from 'react-player'
import Spinner from '@/components/ui/spinner'
import ShimmerText from '@/components/kokonutui/shimmer-text'
import NavBar from '@/components/nav'
import FooterComponent from '@/components/footer'
import { createClient } from '@/lib/supabase/client'
import Chat from '@/components/Chat'

type SummaryResponseType = {
  summary: string;
  suggestedClips?: Array<{
    title: string;
    time: string;
  }>
}

function AnalyzeVideo() {
  const [transcript, setTranscript] = useState<TranscriptResponse | null>(null)
  const [summary, setSummary] = useState<SummaryResponseType | null>(null)
  const [mounted, setmounted] = useState(false)
  const [pageState, setPageState] = useState<PageStateType>("loading_transcript")

  const supabase = useMemo(() => createClient(), [])

  const {id} = useParams()
  const router = useRouter()

  const playerRef = useRef<HTMLVideoElement>(null)
  const setPlayerRef = useCallback((player: HTMLVideoElement) => {
    if (!player) return
    playerRef.current = player
  }, [])

  const saveVideoToDB = useCallback(
    async (
    summaryProp: SummaryResponseType,
    transcriptProp: TranscriptResponse,
    userID: string
  ) => {
    const { data, error } = await supabase
      .from('videos')
      .insert([
        {
          videoID: id,
          transcript: JSON.stringify(transcriptProp),
          summary: summaryProp.summary,
          suggested_clips: JSON.stringify(summaryProp.suggestedClips)
        }
      ])
      .select()
      
      if (error) {
        console.log("Error saving video:", error)
        return
      }
      
      
      if (userID && data?.length > 0) {
        await supabase
        .from("video_history")
        .insert([
          {
            userID,
            videoID: data[0].id
          }
        ])
        .select()
      }
    }
    , [supabase, id])
    
  const fetchVideoDetails = useCallback(
    async (userID: string) => {
      try {
      const response = await axios.post(`/api/transcribe`, { videoId: id })
      const data = response.data

      setTranscript(data.transcript)

      setPageState("loading_summary")

      const plainText = JSON.stringify(data.transcript.content)
      const summaryData = await axios.post(`/api/summarize`, { text: plainText })

      setSummary(summaryData.data)

      await saveVideoToDB(summaryData.data, data.transcript, userID)
      
      setPageState("ready")
    } catch {
      setPageState("error")
      toast.error("Failed to fetch video details")
    }
  }
  , [id, saveVideoToDB])

  
  useEffect(() => {
    const handleLoadVideo = async () => {
      setmounted(true)
      const userSession = await supabase.auth.getUser()
      const currentUser = userSession.data.user 
  
      const { data: DBVideoData } = await supabase
        .from('videos')
        .select('*')
        .eq('videoID', id)
  
      if (DBVideoData && DBVideoData.length > 0) {
        setSummary({
          summary: DBVideoData[0].summary,
          suggestedClips: JSON.parse(DBVideoData[0].suggested_clips)
        })
        setTranscript(JSON.parse(DBVideoData[0].transcript))
        setPageState("ready")
        return
      }
  
      await fetchVideoDetails(currentUser?.id as string)
    }
    handleLoadVideo()
  }, [router, id, supabase, fetchVideoDetails])

  if(!mounted) return null;

    const seekPlayer = (time: string) => {
        const seconds = Number(time) / 1000
        if (!playerRef.current) return
        playerRef.current.currentTime = seconds
        playerRef.current.play()
    }

  if (pageState == "loading_transcript") {
    return <div className="h-screen w-full text-center flex items-center justify-center gap-3">
      <Spinner />
      <ShimmerText
      className='text-2xl'
      text="Fetching the Video...."
      />
    </div>
  }

  if (pageState == "loading_summary") {
    return <div className="h-screen w-full text-center flex items-center justify-center gap-3">
      <Spinner />
      <ShimmerText
      text='Watching Video in 10000x'
      className='text-2xl'
      />
    </div>
  }

  if (pageState == "error") {
    return <div className="h-screen w-full text-center flex items-center justify-center flex-col gap-5">
      <h1 className='text-3xl'>something failed, try again later</h1>
      <Button
        onClick={() => {
          router.push('/')
        }}
      >
        Back to Home
      </Button>
    </div>
  }

  const items = [
    {
      id: 0,
      label: "Summary",
      content: <div className="">
        <p className='px-4 py-4 bg-muted rounded-xl'>{summary?.summary}</p>
      </div>
    },
    {
      id: 1,
      label: "Transcript",
      content:<div className="px-4 py-4 bg-muted rounded-xl h-full">
                <div className="h-100 overflow-y-auto scrollbar-hide space-y-2">
                    {transcript
                    ? transcript.content.map((item, idx) => (
                        <p key={idx}>{item.text}</p>
                        ))
                    : <div>Something went wrong...</div>
                    }
                </div>
            </div>
    },
    {
      id: 2,
      label: "Ask AI",
      content: <div className="h-[500px]">
        <Chat transcript={transcript} />
      </div>
    }

  ]

  if (pageState == "ready" && summary) {
    return (
      <>
      <NavBar/>
      <div className='md:h-screen min-h-screen pt-15 px-8 w-full flex md:flex-row flex-col items-start justify-between gap-5'>
        <div className="w-full">
          <DirectionAwareTabs
            tabs={items}
          />
        </div>
        <div className="h-full scrollbar-hide w-full md:overflow-y-auto">
          <div className="rounded-xl h-100">
            <ReactPlayer
              ref={setPlayerRef}
              src={`youtube.com/watch?v=${id}`}
              controls
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="px-2 mt-3">
            <h3 className='text-right text-xl font-semibold mb-3'>Suggested Clips</h3>
            <div className="flex flex-col items-end justify-end gap-4">
              {
                summary.suggestedClips && summary.suggestedClips.map((clip, index) => {
                  return <Button
                    variant={"secondary"}
                    key={index}
                    onClick={() => {
                      seekPlayer(clip.time)
                    }}
                    className="">

                    {clip.title}
                  </Button>

                })
              }
            </div>
          </div>
        </div>
      </div>
      <div className="py-5">
      <FooterComponent/>
      </div>
      </>
    )
  }
}

export default AnalyzeVideo