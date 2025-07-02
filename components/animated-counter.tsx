"use client"

import { useCountUp } from "@/hooks/use-count-up"

interface AnimatedCounterProps {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function AnimatedCounter({
  end,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const { count, ref } = useCountUp({
    end,
    duration,
    decimals,
    prefix,
    suffix,
  })

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  )
}
