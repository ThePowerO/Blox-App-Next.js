import React from 'react'
import { Badge } from '../ui/badge';

interface Combo {
  mainStats: string
  race: string
  specialty: string
}

const ComboInformation = ({ mainStats, race, specialty }: Combo) => {

  const handleStats = (stats: string) => {
    if (stats === 'Main Gun') {
      return "gunmain"
    } else if (stats === 'Hybrid') {
      return "hybrid"
    } else if (stats === 'Main Sword') {
      return "swordmain"
    } else if (stats === 'Main Fruit') {
      return "fruitmain"
    }
  }

  const handleSpecialty = (specialty: string) => {
    if (specialty === "PVP") {
      return "pvp"
    } else if (specialty === "PVE") {
      return "pve"
    } else if (specialty === "Grind") {
      return "grind"
    }
  }

  const handleRace = (race: string) => {
    if (race === "Human") {
      return "human"
    } else if (race === "Ghoul") {
      return "ghoul"
    } else if (race === "Fishman") {
      return "fishman"
    } else if (race === "Cyborg") {
      return "cyborg"
    } else if (race === "Skypian") {
      return "skypian"
    } else if (race === "Mink") {
      return "mink"
    }
  }

  return (
    <>
      <div className='grid grid-cols-2 text-sm gap-y-[4px] p-1'>
        <div>Dificulty: Hard</div>
        <div>Stats: 
          <Badge variant={handleStats(mainStats as string) as any}>{mainStats}</Badge>
        </div>
        <div>Race: 
          <Badge variant={handleRace(race as string) as any}>{race}</Badge>
        </div>
        <div className=' bg-'>Specialty: 
          <Badge variant={handleSpecialty(specialty as string) as any}>{specialty}</Badge>
        </div>
      </div>
    </>
  )
}

export default ComboInformation
