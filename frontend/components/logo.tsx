import { cn } from "@/lib/utils"
import Link from "next/link"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  }

  const groupSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <Link href="/" className={cn("inline-flex items-start", className)}>
      <div className="flex items-center space-x-1">
      <h1 className={cn("font-extrabold text-4xl sm:text-5xl text-gray-900 dark:text-white animate-pulse", sizes[size])}>
      <span className="text-red-600 animate-pulse">A</span><span>EGIS</span>
    </h1>

    {/* Small GROUP positioned on the right */}
    <span className={cn("text-red-600 dark:text-red-400 underline decoration-2 decoration-red-600 animate-pulse", groupSizes[size])}>
      GROUP
    </span>
      </div>
    </Link>
  )
}

