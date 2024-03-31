import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function RaceSelecotor() {
  return (
    <Select>
      <SelectTrigger className="dark:border-white">
        <SelectValue placeholder="Select a race" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Races:</SelectLabel>
          <SelectItem value="skypian">Skypian</SelectItem>
          <SelectItem value="mink">Mink</SelectItem>
          <SelectItem value="fishman">Fishman</SelectItem>
          <SelectItem value="cyborg">Cyborg</SelectItem>
          <SelectItem value="human">Human</SelectItem>
          <SelectItem value="ghoul">Ghoul</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}