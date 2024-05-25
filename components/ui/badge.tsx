import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        hybrid: "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 dark:text-black",
        fruitmain: "bg-gradient-to-r from-amber-800 via-amber-500 to-amber-700 text-white",
        swordmain: "bg-gradient-to-r from-indigo-950 via-cyan-700 to-violet-950 text-white",
        gunmain: "bg-gradient-to-r from-indigo-950 via-indigo-700 to-indigo-900 text-white",
        pvp: "bg-gradient-to-r from-rose-800 via-rose-900 to-black text-white",
        pve: "bg-gradient-to-r from-violet-700 via-purple-800 to-pink-900 text-white",
        grind: "bg-gradient-to-r from-fuchsia-900 via-fuchsia-600 to-fuchsia-800 text-white",
        human: "bg-gradient-to-r from-red-400 via-orange-500 to-pink-500 text-white",
        ghoul: "bg-gradient-to-r from-blue-900 via-gray-700 to-blue-900 text-white",
        fishman: "bg-gradient-to-r from-indigo-700 via-sky-500 to-blue-800 text-white",
        cyborg: "bg-gradient-to-r from-indigo-700 via-rose-500 to-purple-500 text-white",
        skypian: "bg-gradient-to-r from-neutral-400 via-neutral-300 to-neutral-400 text-black",
        mink: "bg-gradient-to-r from-gray-300 via-indigo-300 to-sky-200 text-white",
        hard: "bg-gradient-to-r from-slate-600 via-gray-400 to-zinc-900 text-white",
        medium: "bg-gradient-to-r from-cyan-700 via-yellow-500 to-rose-600 text-white",
        noskill: "bg-gradient-to-r from-emerald-600 via-gray-700 to-gray-800 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }