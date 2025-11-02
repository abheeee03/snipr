"use client"
import NavBar from '@/components/nav'
import Spinner from '@/components/ui/spinner'
import VideoCard from '@/components/VideoCard'
import { createClient } from '@/lib/supabase/client'
import { VideoData } from '@/lib/types'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { toast } from 'sonner'

type VideoResponse = {
    summary: string;
    fetched_at: string;
    videoID: string;
    videos: VideoData
}


function UserVideos() {

    const [user, setUser] = useState<User | null>(null)
    const [userVideos, setUserVideos] = useState<VideoResponse[] | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    const router = useRouter()

    const getUser = async() => {
        const {data: {user}} = await supabase.auth.getUser()
        if(!user){
            router.push("/")
            toast.error("please login to access your videos")
        }
        setUser(user)
        const { data, error } = await supabase
        .from("video_history")
        .select(`
            *,
            videos(*)
        `)
        .eq("userID", user?.id)
        setUserVideos(data)
        setLoading(false)
        

    }
    useEffect(() => {
        getUser()
    }, [])

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