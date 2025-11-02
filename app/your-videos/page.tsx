"use client"
import NavBar from '@/components/nav'
import Spinner from '@/components/ui/spinner'
import VideoCard from '@/components/VideoCard'
import { createClient } from '@/lib/supabase/client'
import { VideoData } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type VideoResponse = {
    summary: string;
    fetched_at: string;
    videoID: string;
    videos: VideoData
}


function UserVideos() {
    const [userVideos, setUserVideos] = useState<VideoResponse[] | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const getUserData = async() => {
            const {data: {user}} = await supabase.auth.getUser()
            if(!user){
                router.push("/")
                toast.error("please login to access your videos")
            }
            const { data } = await supabase
            .from("video_history")
            .select(`
                *,
                videos(*)
            `)
            .eq("userID", user?.id)
            setUserVideos(data)
            setLoading(false)
            
    
        }
        getUserData()
    }, [router, supabase])

  return (
    <>
    <NavBar isSigninButtonVisible={false}/>
    <div className="px-10 pt-20 pb-8 gap-2 md:fixed">
    <h1 className='text-xl font-semibold'>Your Videos</h1>
    </div>
    {
        loading ? <div className="h-screen text-xl w-full flex items-center gap-2 justify-center">

                <Spinner/> Loading....

            </div> : 
        <div className='min-h-screen md:py-20 px-10 w-full flex flex-wrap gap-5 items-start justify-center'>
        {
            userVideos && userVideos.length != 0 ? userVideos.map((video, idx)=>{
                return <VideoCard
                key={idx}
                time={video.videos.fetched_at}
                videoID={video.videos.videoID}
                summary={video.videos.summary}
                />
            }) : <div className="text-center text-muted-foreground mt-20 text-xl">
                No History Found
            </div>
        }
    </div>
        }
    </>
  )
}

export default UserVideos