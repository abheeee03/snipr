"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { extractVideoId } from '@/lib/utils'
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
import { BiSolidVideos } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";

function LandingPage() {
  const [url, seturl] = useState("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [user, setuser] = useState<User | null>(null)
  const [authScreen, setAuthScreen] = useState<boolean>(false)
  const supabase = createClient()

  const getUser = async ()=>{
    const {data: {user}} = await supabase.auth.getUser()
    setuser(user)
  }

  useEffect(() => {
    setMounted(true)
    getUser()
  }, [])
  

  if(!mounted) return null;

  return (
    <>
    <div className="fixed w-full px-5 md:px-10 py-4 flex items-center justify-between">
      <div className="flex items-center justify-center gap-2">
      <Logo
      size='lg'
      />
      <h1 className='text-2xl font-semibold'>Snipr</h1>
      </div>
      <div className="flex items-center justify-center gap-5">
      <Button className='hidden md:flex' variant={"secondary"}>
        Download Chrome Extension
      </Button>
      {
        !user ?
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
            disabled={url.length != 0 ? false : true}
          onClick={()=>{
              const extractedUrl = extractVideoId(url)
              if(extractedUrl){
                router.push(`/analyze/${extractedUrl}`)
              } else {
                toast.error("Please Enter a valid YoutTube URL")
              }
          }}
          >
            <ArrowUpRight/>
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




