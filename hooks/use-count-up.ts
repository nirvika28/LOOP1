"use client"

import { useState, useEffect, useRef } from "react"

interface UseCountUpOptions {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
}

export function useCountUp({
  end,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
}: UseCountUpOptions) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = startValue + (end - startValue) * easeOutQuart

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  const formatNumber = (num: number) => {
    const rounded = decimals > 0 ? num.toFixed(decimals) : Math.floor(num).toString()
    const parts = rounded.split(".")

    // Add thousand separators
    if (separator && parts[0].length > 3) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    }

    const formatted = parts.join(".")
    return `${prefix}${formatted}${suffix}`
  }

  return {
    count: formatNumber(count),
    ref: elementRef,
  }
}
