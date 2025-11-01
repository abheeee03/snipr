import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'

const MAX_SUMMARY_LENGTH = 220

function truncateSummary(summary: string) {
  if (summary.length <= MAX_SUMMARY_LENGTH) {
    return summary
  }

  return `${summary.slice(0, MAX_SUMMARY_LENGTH).trim()}…`
}

function formatDate(timestamp: string) {
  return new Date(timestamp).toLocaleString()
}

function VideoCard({
  videoID,
  summary,
  time,
}: {
  videoID: string
  summary: string
  time: string
}) {
  return (
    <Link href={`/analyze/${videoID}`} className="w-full max-w-3xl">
      <Card className="flex w-full flex-col overflow-hidden transition hover:shadow-md sm:flex-row">
        <div className="relative h-48 w-full sm:h-auto sm:w-60 md:w-72 mx-3">
          <Image
            fill
            className="h-full w-full object-cover rounded-lg"
            src={`https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`}
            alt={summary}
            sizes="(max-width: 640px) 100vw, 400px"
            priority={false}
          />
        </div>
        <CardContent className="flex flex-1 flex-col justify-between gap-4 p-4">
          <p className="text-sm text-muted-foreground sm:text-base">
            {truncateSummary(summary)}
          </p>
          <div className="text-left text-xs text-muted-foreground sm:text-right sm:text-sm">
            {formatDate(time)}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default VideoCard