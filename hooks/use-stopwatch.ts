"use client"

import { useState, useEffect, useRef } from "react"

interface UseStopwatchOptions {
  startTime?: string | null
  isActive?: boolean
}

export function useStopwatch({ startTime, isActive = false }: UseStopwatchOptions) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive && startTime) {
      const start = new Date(startTime).getTime()

      const updateElapsed = () => {
        const now = new Date().getTime()
        const elapsed = Math.floor((now - start) / 1000)
        setElapsedTime(elapsed)
      }

      // Update immediately
      updateElapsed()

      // Then update every second
      intervalRef.current = setInterval(updateElapsed, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setElapsedTime(0)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [startTime, isActive])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return {
    elapsedTime,
    formattedTime: formatTime(elapsedTime),
  }
}
