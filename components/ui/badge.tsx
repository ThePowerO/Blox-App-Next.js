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
        hybrid: "border-transparent bg-fuchsia-700 text-white hover:bg-fuchsia-900/80",
        fruitmain: "border-transparent bg-emerald-700 text-white hover:bg-emerald-700/80",
        swordmain: "border-transparent bg-violet-900 text-white hover:bg-violet-900/80",
        gunmain: "border-transparent bg-zinc-700 text-white hover:bg-zinc-700/80",
        pvp: "border-transparent bg-red-700 text-white hover:bg-red-900/80",
        pve: "border-transparent bg-amber-900 text-white hover:bg-amber-900/80",
        grind: "border-transparent bg-teal-500 text-white hover:bg-teal-500/80",
        human: "border-transparent bg-indigo-700 text-white hover:bg-indigo-900/80",
        ghoul: "border-transparent bg-rose-900 text-white hover:bg-rose-900/80",
        fishman: "border-transparent bg-blue-900 text-white hover:bg-blue-900/80",
        cyborg: "border-transparent bg-indigo-700 text-white hover:bg-indigo-900/80",
        skypian: "border-transparent bg-sky-500 text-white hover:bg-sky-500/80",
        mink: "border-transparent bg-rose-300 text-white hover:bg-rose-300/80",
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
