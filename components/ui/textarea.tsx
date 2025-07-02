import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A plain textarea with shadcn-like styling.
 *
 * Usage:
 * <Textarea placeholder="Write something…" rows={4} />
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2",
        "text-sm text-foreground shadow-sm placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
)
Textarea.displayName = "Textarea"
