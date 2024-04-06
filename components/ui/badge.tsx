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
        hybrid: "border-transparent bg-stone-900 text-white hover:bg-stone-900/80",
        fruitmain: "border-transparent bg-amber-700 text-white hover:bg-amber-700/80",
        swordmain: "border-transparent bg-cyan-950 text-white hover:bg-cyan-950/80",
        gunmain: "border-transparent bg-zinc-700 text-white hover:bg-zinc-700/80",
        pvp: "border-transparent bg-red-700 text-white hover:bg-red-900/80",
        pve: "border-transparent bg-violet-400 text-white hover:bg-violet-400/80",
        grind: "border-transparent bg-fuchsia-400 text-white hover:bg-fuchsia-400/80",
        human: "border-transparent bg-destructive text-white hover:bg-destructive/80",
        ghoul: "border-transparent bg-rose-900 text-white hover:bg-rose-900/80",
        fishman: "border-transparent bg-sky-700 text-white hover:bg-sky-700/80",
        cyborg: "border-transparent bg-violet-900 text-white hover:bg-violet-900/80",
        skypian: "border-transparent bg-zinc-400 text-white hover:bg-zinc-400/80",
        mink: "border-transparent bg-lime-500 text-white hover:bg-lime-500/80",
        hard: "border-transparent bg-black text-white",
        medium: "border-transparent bg-cyan-500 text-white hover:bg-cyan-500/80",
        noskill: "border-transparent bg-emerald-700 text-white hover:bg-emerald-700/80",
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