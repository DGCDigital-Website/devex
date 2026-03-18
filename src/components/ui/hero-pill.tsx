'use client'
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowRight } from "@phosphor-icons/react"

interface HeroPillProps {
  href: string
  label: string
  announcement?: string
  className?: string
  isExternal?: boolean
}

export function HeroPill({
  href,
  label,
  announcement = "🌍 Work with DGC",
  className,
  isExternal = false,
}: HeroPillProps) {
  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      className={cn(
        "flex w-auto items-center space-x-2 rounded-full",
        "bg-dgc-blue-1/20 ring-1 ring-dgc-blue-1/30",
        "px-3 py-1.5 whitespace-pre",
        "hover:bg-dgc-blue-1/30 hover:ring-dgc-blue-1/50",
        "transition-all duration-300 cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onClick={() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }}
    >
      <div className={cn(
        "w-fit rounded-full bg-dgc-blue-1 px-2.5 py-0.5",
        "text-xs font-semibold text-white sm:text-sm",
        "text-center shadow-sm"
      )}>
        {announcement}
      </div>
      <p className="text-xs font-medium text-dgc-blue-1 sm:text-sm">
        {label}
      </p>
      <ArrowRight className="w-3 h-3 ml-1 text-dgc-blue-1" />
    </motion.a>
  )
}
