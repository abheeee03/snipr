"use client"

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { ArrowUpRight } from 'lucide-react'
import { BiLogoGoogle, BiSolidVideos } from 'react-icons/bi'
import { CiLogout } from 'react-icons/ci'
import { IoLogoYoutube } from 'react-icons/io'
import { toast } from 'sonner'

import AuthScreen from '@/components/AuthScreen'
import FooterComponent from '@/components/footer'
import LimitDialog from '@/components/LimitDialog'
import Logo from '@/components/logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Spinner from '@/components/ui/spinner'
import { createClient } from '@/lib/supabase/client'
import { checkUserLimit, extractVideoId, handelSignin, updateLimit } from '@/lib/utils'

type LandingPageClientProps = {
  initialLimit: 'anon' | 'auth' | null
}

export default function LandingPageClient({ initialLimit }: LandingPageClientProps) {
  const [url, setUrl] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [authScreen, setAuthScreen] = useState(false)
  const [limitAnonScreen, setLimitAnonScreen] = useState(initialLimit === 'anon')
  const [limitAuthScreen, setLimitAuthScreen] = useState(initialLimit === 'auth')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAccountLoading, setIsAccountLoading] = useState(true)

  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    let isActive = true

    const loadUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!isActive) return

      if (currentUser) {
        setUser(currentUser)
        setIsAccountLoading(false)
        return
      }

      const { data: { user: anonymousUser } } = await supabase.auth.signInAnonymously()
      if (!isActive) return

      setUser(anonymousUser)
      setIsAccountLoading(false)
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isActive) return
      setUser(session?.user ?? null)
      setIsAccountLoading(false)
    })

    return () => {
      isActive = false
      subscription.unsubscribe()
    }
  }, [supabase])

  const handleSummarizeVideo = async () => {
    const normalizedUrl = url.trim()
    if (!normalizedUrl) {
      toast.error('Please enter a YouTube URL')
      return
    }

    const extractedUrl = extractVideoId(normalizedUrl)
    if (!extractedUrl) {
      toast.error('Please enter a valid YouTube URL')
      return
    }

    setIsSubmitting(true)

    try {
      const isAllowed = await checkUserLimit()

      if (!isAllowed) {
        if (user?.is_anonymous ?? true) {
          setLimitAnonScreen(true)
        } else {
          setLimitAuthScreen(true)
        }
        return
      }

      await updateLimit()
      router.push(`/analyze/${extractedUrl}`)
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    const { data: { user: anonymousUser } } = await supabase.auth.signInAnonymously()
    setUser(anonymousUser)
    toast.success('Logged out successfully')
  }

  const disableSummarize = isSubmitting || !url.trim()

  return (
    <>
      <LimitDialog
        closeBtnVisible={false}
        onChange={setLimitAnonScreen}
        open={limitAnonScreen}
        content={
          <div className='flex flex-col gap-10'>
            <p>To increase your limit, sign in with your Google account.</p>
            <Button
              onClick={handelSignin}
              className='w-full'
            >
              Sign in with Google <BiLogoGoogle />
            </Button>
          </div>
        }
      />

      <LimitDialog
        content={
          <div className='flex flex-col'>
            <p>All daily credits are used. Please come back tomorrow for more summaries.</p>
          </div>
        }
        onChange={setLimitAuthScreen}
        open={limitAuthScreen}
      />

      <div className='fixed w-full px-5 md:px-10 py-4 flex items-center justify-between'>
        <div className='flex items-center justify-center gap-2'>
          <Logo size='lg' />
          <h1 className='text-2xl font-semibold'>Snipr</h1>
        </div>

        <div className='flex items-center justify-center gap-5 min-w-24'>
          {isAccountLoading ? (
            <Spinner />
          ) : !user || user.is_anonymous ? (
            <Button onClick={() => setAuthScreen(true)}>
              Sign in
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                className='cursor-pointer'
                asChild
              >
                <Avatar>
                  <AvatarImage src={user.user_metadata.picture} />
                  <AvatarFallback>
                    {user.user_metadata?.full_name?.charAt(0).toUpperCase() ?? 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      router.push('/your-videos')
                    }}
                    className='flex items-center justify-center gap-2'
                  >
                    <BiSolidVideos />
                    Summarized Videos
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={handleLogout}
                    className='flex items-center justify-center gap-2'
                  >
                    <CiLogout />
                    Log Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <AuthScreen
            open={authScreen}
            onOpenChange={setAuthScreen}
          />
        </div>
      </div>

      <div className='h-screen py-40 px-10 w-full bg-secondary flex flex-col items-center justify-start gap-15'>
        <div className='text-center max-w-3xl flex flex-col gap-3'>
          <h1 className='text-6xl font-semibold'>Snipr</h1>
          <p className='text-md max-w-lg'>
            Turn hour-long videos into quick, crystal-clear takeaways so you can learn faster without watching every second.
          </p>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <div className='shadow-lg px-2 py-1 rounded-lg flex items-center justify-start gap-3 bg-white border-t'>
            <IoLogoYoutube size={20} className='mx-1' />
            <input
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !disableSummarize) {
                  handleSummarizeVideo()
                }
              }}
              type='text'
              className='py-2 w-70 outline-none focus:outline-none focus:ring-0 focus:border-transparent'
              placeholder='Paste YouTube URL'
            />
            <Button
              disabled={disableSummarize}
              onClick={handleSummarizeVideo}
            >
              {isSubmitting ? <Spinner /> : <ArrowUpRight />}
            </Button>
          </div>
        </div>
      </div>

      <div className='bg-secondary py-5'>
        <FooterComponent />
      </div>
    </>
  )
}
