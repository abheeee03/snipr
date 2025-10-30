"use client"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { extractVideoId } from '@/lib/utils'
import { toast } from 'sonner'

function LandingPage() {
  const [url, seturl] = useState("")
  const router = useRouter()

  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className="text-center max-w-3xl flex flex-col gap-3">
        <h1 className='text-4xl'>Snipr</h1>
        <p className='text-md'>Consume 1 hour video in 5 minutes</p>
        <div className="flex gap-3">

        <Input
        onChange={(e)=>seturl(e.target.value)}
        placeholder='Enter Youtube Link'
        />
        <Button
        onClick={()=>{
          const videoId = extractVideoId(url)          
          if(videoId){
            router.push(`/analyze/${videoId}`)

          } else {
            toast.error("Invalid Youtube URL Try Again")
          }
        }}
        >
          Generate
        </Button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage