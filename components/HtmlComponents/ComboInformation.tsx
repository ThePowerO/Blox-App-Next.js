import React from 'react'
import { Badge } from '../ui/badge';
import { DifficultyBadge, RaceBadge, SpecialtyBadge, StatsBadge } from './ComboBadges';

interface Combo {
  mainStats: string
  race: string
  specialty: string
  difficulty: string
}

const ComboInformation = ({ mainStats, race, specialty, difficulty }: Combo) => {
  return (
    <>
      <div className='grid grid-cols-2 text-sm gap-y-[4px] p-1'>
        <div>Dificulty: 
          <DifficultyBadge difficulty={difficulty || ""} />
        </div>
        <div>Stats: 
          <StatsBadge stats={mainStats || ""} />
        </div>
        <div>Race: 
          <RaceBadge race={race || ""} />
        </div>
        <div className=''>Specialty: 
          <SpecialtyBadge specialty={specialty || ""} />
        </div>
      </div>
    </>
  )
}

export default ComboInformation

