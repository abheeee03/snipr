"use client"
import { Button } from '@/components/ui/button'
import { DirectionAwareTabs } from '@/components/ui/direction-aware-tabs'
import { PageStateType, TranscriptResponse } from '@/lib/types'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import ReactPlayer from 'react-player'
import Spinner from '@/components/ui/spinner'
import ShimmerText from '@/components/kokonutui/shimmer-text'
import NavBar from '@/components/nav'
import Link from 'next/link'
import { FaGithub } from "react-icons/fa6";

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
  const [error, setError] = useState<string | null>(null)
  const [mounted, setmounted] = useState(false);
  const [pageState, setPageState] = useState<PageStateType>("loading_transcript")
  const { id } = useParams()
  const router = useRouter()
  const playerRef = useRef<HTMLVideoElement>(null)
  const setPlayerRef = useCallback((player: HTMLVideoElement) => {
    if (!player) return;
    playerRef.current = player;
    console.log(player);
  }, []);


  const fetchVideoDetails = async () => {
    try {
      const response = await axios.post(`/api/transcribe`, {
        videoId: id
      })
      const data = await response.data
      setTranscript(data.transcript)
      console.log("transcript data from api: ", data.transcript);
      const plainText = JSON.stringify(data.transcript.content);
      console.log("plain txt: ", plainText);
      if (data) {
        setPageState("loading_summary")
        const summaryData = await axios.post(`/api/summarize`, {
          text: plainText
        })
        setSummary(summaryData.data)
        console.log(summaryData.data);
        setPageState("ready")
      }
    } catch (err) {

      setPageState("error")
      console.log(err);
      setError("Failed to fetch the video details try again later.")
      toast.error("failed to fetch video details")
    }
  }


  const msToSeconds = (ms: number) => ms / 1000;

  function seekPlayer(time: string) {
    const timing = msToSeconds(Number(time))
    console.log(timing);
    if (!playerRef.current) { return }
    playerRef.current.currentTime = Number(timing);
  }

  useEffect(() => {
    setmounted(true)
    fetchVideoDetails()   
  }, [])

  if (!mounted) { return null }

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
      content: <div className="">
        <div className='px-4 py-4 bg-muted rounded-xl'>
          {
            transcript ? transcript.content.map((item, idx)=>{
              return <p key={idx}>{item.text}</p>
            }) : <div className="">Something went wrong...</div>
          }
        </div>
      </div>
    },
    {
      id: 2,
      label: "Ask AI",
      content: <div className="">
        <p className='px-4 py-4 bg-muted rounded-xl'>Comming Soon...</p>
      </div>
    }

  ]

  if (pageState == "ready" && summary) {
    return (
      <>
      <NavBar/>
      <div className='h-screen pt-15 px-8 w-full flex items-start justify-between gap-5'>
        <div className="w-full h-screen flex flex-col gap-3 overflow-y-auto scrollbar-hide">
          <DirectionAwareTabs
            tabs={items}
          />
        </div>
        <div className="h-full scrollbar-hide w-full overflow-y-auto">
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
                      console.log("raw time: ", clip.time);
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
        <div className="flex w-full items-center justify-between px-20">
          <h1 className='text-xl font-semibold'> 
             Snipr
          </h1>
          <div className="flex gap-3">
            <span>Support Us On</span>
            <Link href={'https://github.com/abheeee03/snipr'}>
              <FaGithub size={24}/>           
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default AnalyzeVideo