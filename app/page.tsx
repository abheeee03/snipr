import LandingPageClient from '@/components/LandingPageClient'

type PageProps = {
  searchParams?: {
    limit?: string | string[]
  }
}

export default function LandingPage({ searchParams }: PageProps) {
  const limitParam = Array.isArray(searchParams?.limit)
    ? searchParams?.limit[0]
    : searchParams?.limit

  const initialLimit = limitParam === 'anon' || limitParam === 'auth'
    ? limitParam
    : null

  return <LandingPageClient initialLimit={initialLimit} />
}




