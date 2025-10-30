"use client"

import { ReactNode, useMemo, useState } from "react"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import useMeasure from "react-use-measure"

import { cn } from "@/lib/utils"

type Tab = {
  id: number
  label: string
  content: ReactNode
}

interface OgImageSectionProps {
  tabs: Tab[]
  className?: string
  rounded?: string
  onChange?: () => void
}

function DirectionAwareTabs({
  tabs,
  className,
  rounded,
  onChange,
}: OgImageSectionProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [ref, bounds] = useMeasure()

  const content = useMemo(() => {
    return tabs.find((tab) => tab.id === activeTab)?.content ?? null
  }, [activeTab, tabs])

  const handleTabClick = (newTabId: number) => {
    if (newTabId !== activeTab && !isAnimating) {
      setDirection(newTabId > activeTab ? 1 : -1)
      setActiveTab(newTabId)
      onChange?.()
    }
  }

  const variants = {
    initial: (direction: number) => ({
      x: 300 * direction,
      opacity: 0,
      filter: "blur(4px)",
    }),
    active: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      x: -300 * direction,
      opacity: 0,
      filter: "blur(4px)",
    }),
  }

  return (
    <div className="flex flex-col w-full items-start">
      <div
        className={cn(
          "flex border fixed z-10 border-none rounded-full bg-muted px-[3px] py-[3.2px] shadow-inner-shadow",
          className,
          rounded
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "relative rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition flex gap-2 items-center cursor-pointer",
              activeTab === tab.id
                ? "text-white"
                : "text-black hover:text-black/60",
              "relative z-10", // ensure text stays above bubble
              rounded
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 bg-blue-600 shadow-inner-shadow border border-white/10 z-0" // bubble below text
                style={rounded ? { borderRadius: 9 } : { borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.19, duration: 0.4 }}
              />
            )}
            {/* Text label always above */}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* content */}
      <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}>
        <motion.div
          className="relative w-full overflow-hidden mt-10"
          initial={false}
          animate={{ height: bounds.height }}
        >
          <div className="p-1" ref={ref}>
            <AnimatePresence
              custom={direction}
              mode="popLayout"
              onExitComplete={() => setIsAnimating(false)}
            >
              <motion.div
                key={activeTab}
                variants={variants}
                initial="initial"
                animate="active"
                exit="exit"
                custom={direction}
                onAnimationStart={() => setIsAnimating(true)}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  )
}

export { DirectionAwareTabs }
