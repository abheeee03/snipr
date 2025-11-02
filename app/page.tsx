"use client"
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { checkUserLimit, extractVideoId, updateLimit } from '@/lib/utils'
import { toast } from 'sonner'
import Logo from '@/components/logo'
import { ArrowUpRight } from 'lucide-react'
import { IoLogoYoutube } from 'react-icons/io'
import FooterComponent from '@/components/footer'
import AuthScreen from '@/components/AuthScreen'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BiLogoGoogle, BiSolidVideos } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import LimitDialog from '@/components/LimitDialog'
import Spinner from '@/components/ui/spinner'

function LandingPage() {
  const [url, seturl] = useState("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [user, setuser] = useState<User | null>(null)
  const [authScreen, setAuthScreen] = useState<boolean>(false)
  const [limitAnonScreen, setLimitAnonScreen] = useState(false)
  const [limitAuthScreen, setLimitAuthScreen] = useState(false)
  const [loading, setloading] = useState(false)
  const supabase = createClient()
  const searchParams = useSearchParams()



  useEffect(() => {
    const getUser = async ()=>{
    setMounted(true)
    const {data: {user}} = await supabase.auth.getUser()
    if(user){
      setuser(user)
    } else {
      const {data: {user: AnonUser}} = await supabase.auth.signInAnonymously()
      setuser(AnonUser)   
    }
  }
    getUser()
    function checkModalFromParams(){

      if(searchParams.get('limit') === 'anon'){
        setLimitAnonScreen(true)
      }
      if(searchParams.get('limit') === 'auth'){
        setLimitAuthScreen(true)
      }
    }
    checkModalFromParams()
  }, [searchParams, supabase.auth])

  const handelSummarizeVideo = async ()=>{
    setloading(true)
    const extractedUrl = extractVideoId(url)
    if(!extractedUrl){
      toast.error("Please enter a valid Youtube URL")
      setloading(false)
      return
    }
    const isAllowed = await checkUserLimit()

    if(!isAllowed && user?.is_anonymous){
      setLimitAnonScreen(true)
      setloading(false)
      return
    }

    if(!isAllowed && !user?.is_anonymous){
      setLimitAuthScreen(true)
      setloading(false)
      return
    }

    await updateLimit()
    setloading(false)
    router.push(`/analyze/${extractedUrl}`)


  }

  

  if(!mounted) return null;

  return (
    <>
    <LimitDialog
    closeBtnVisible={false}
    onChange={setLimitAnonScreen}
    open={limitAnonScreen}
    content={
      <div className='flex flex-col gap-10'>
        <p>To increase your limit please signin with Google Account</p>
        <Button className='w-full'>
          Signin with Google <BiLogoGoogle/>
        </Button>
      </div>
    }
    />
    <LimitDialog
    content={
      <div>
        <div className='flex flex-col '>
          <p>We Pay Servers for this and You have used All your credits come back tomorrow for more..</p>
      </div>
      </div>
    }
    onChange={setLimitAuthScreen}
    open={limitAuthScreen}
    />
    <div className="fixed w-full px-5 md:px-10 py-4 flex items-center justify-between">
      <div className="flex items-center justify-center gap-2">
      <Logo
      size='lg'
      />
      <h1 className='text-2xl font-semibold'>Snipr</h1>
      </div>
      <div className="flex items-center justify-center gap-5">
      {
        !user || user.is_anonymous ?
        <Button
        onClick={()=>{
          setAuthScreen(!authScreen)
        }}
        >
        Signin
      </Button> : <DropdownMenu>
        <DropdownMenuTrigger 
        className='cursor-pointer'
        asChild>
          <Avatar>
            <AvatarImage
            src={user.user_metadata.picture}
            />
            <AvatarFallback>
              {user.user_metadata?.full_name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={"end"}>
          <DropdownMenuItem>
            <button 
            onClick={()=>{
              router.push('/your-videos')
            }}
            className='flex items-center justify-center gap-2'>
            <BiSolidVideos />
            Summarized Videos
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button 
            onClick={async()=>{
              await supabase.auth.signOut()
              setuser(null)
              toast.success("Logged Out Successfully")
            }}
            className='flex items-center justify-center gap-2'>
            <CiLogout />
            Log Out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      }
      <AuthScreen
      open={authScreen}
      onOpenChange={setAuthScreen}
      />
      </div>
    </div>
    <div className='h-screen py-40 px-10 w-full bg-secondary flex flex-col items-center justify-start gap-15'>
      <div className="text-center max-w-3xl flex flex-col gap-3">
        <h1 className='text-6xl font-semibold'>Snipr</h1>
        <p className='text-md max-w-lg'>Turn hour-long videos into quick, crystal-clear takeaways so you can learn faster without watching every second.</p>
      </div>
        <div className="flex gap-3">
            <div className="shadow-lg px-2 py-1 rounded-lg flex items-center justify-start gap-3 bg-white border-t">
            <IoLogoYoutube size={20} className='mx-1'/>
            <input
            onChange={(e)=>{
              seturl(e.target.value)
            }}
              type="text"
              className="py-2 w-70 outline-none focus:outline-none focus:ring-0 focus:border-transparent"
              placeholder="Enter Youtube URL"
            />
            <Button
            disabled={loading}
          onClick={handelSummarizeVideo}
          >
            {
              loading ? <Spinner/> :
              <ArrowUpRight/>
            }
          </Button>
            </div>
        </div>
    </div>
    <div className="bg-secondary py-5">
      <FooterComponent/>
    </div>
        </>
  )
}

export default LandingPage




