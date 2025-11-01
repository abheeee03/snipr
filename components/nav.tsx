"use client"
import Logo from './logo'
import { Button } from './ui/button'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { BiSolidVideos } from 'react-icons/bi'
import { CiLogout } from 'react-icons/ci'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import AuthScreen from './AuthScreen'
import { useRouter } from 'next/navigation'

function NavBar({isSigninButtonVisible = true}: {
    isSigninButtonVisible?: boolean
}) {


    const supabase = createClient()
    const [user, setuser] = useState<User | null>(null)
    const [authScreen, setAuthScreen] = useState<boolean>(false)
    const router = useRouter()
    const getUser = async ()=>{
        const {data: {user}} = await supabase.auth.getUser()
        setuser(user);
    }

    useEffect(() => {
      getUser()
    }, [])
    



  return (
    <div className='fixed z-50 w-full px-10 py-4 items-center justify-between flex'>
        <Link href={'/'}>
            <div className="flex items-center justify-center gap-2">
                <Logo size='sm'/>
                <h1 className='text-xl font-semibold'>Snipr</h1>
            </div>
        </Link>
            <div className="">
                {isSigninButtonVisible && (
                    <>
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
                    
                    </>
                )}
            </div>
    </div>
  )
}

export default NavBar