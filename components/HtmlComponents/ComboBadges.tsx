import React from 'react'
import { Badge } from '../ui/badge';

type StatsBadgeProps = {
    stats: string;
}

type SpecialtyBadgeProps = {
    specialty: string;
}

type RaceBadgeProps = {
    race: string;
}

type DifficultyBadgeProps = {
    difficulty: string;
}

// BADGES
export const StatsBadge = ({ stats }: StatsBadgeProps) => {
    if (stats === 'Main Sword') {
        return (
            <Badge className='w-fit' variant="swordmain"><div className='flex gap-1'><p>Main</p><p>Sword</p></div></Badge>
        )
    } else if (stats === 'Main Fruit') {
        return (
            <Badge className='w-fit' variant="fruitmain"><div className='flex gap-1'><p>Main</p><p>Fruit</p></div></Badge>
        )
    } else if (stats === 'Hybrid') {
        return (
            <Badge className='w-fit' variant="hybrid">Hybrid</Badge>
        )
    } else if (stats === 'Main Gun') {
        return (
            <Badge className='w-fit' variant="gunmain"><div className='flex gap-1'><p>Main</p><p>Gun</p></div></Badge>
        )
    } else {
        return (
            <Badge className='w-fit' variant="default">None</Badge>
        )
    }
}

export const SpecialtyBadge = ({ specialty }: SpecialtyBadgeProps) => {
    if (specialty === 'PVP') {
        return (
            <Badge className='w-fit' variant="pvp">PVP</Badge>
        )
    } else if (specialty === 'PVE') {
        return (
            <Badge className='w-fit' variant="pve">PVE</Badge>
        )
    } else if (specialty === 'Grind') {
        return (
            <Badge className='w-fit' variant="grind">Grind</Badge>
        )
    } else {
        return (
            <Badge className='w-fit' variant="default">None</Badge>
        )
    }
}

export const RaceBadge = ({ race }: RaceBadgeProps) => {
    if (race === 'Human') {
        return (
            <Badge className='w-fit' variant="human">Human</Badge>
        )
    } else if (race === 'Ghoul') {
        return (
            <Badge className='w-fit' variant="ghoul">Ghoul</Badge>
        )
    } else if (race === 'Fishman') {
        return (
            <Badge className='w-fit' variant="fishman">Fishman</Badge>
        )
    } else if (race === 'Cyborg') {
        return (
            <Badge className='w-fit' variant="cyborg">Cyborg</Badge>
        )
    } else if (race === 'Skypian') {
        return (
            <Badge className='w-fit' variant="skypian">Skypian</Badge>
        )
    } else if (race === 'Mink') {
        return (
            <Badge className='w-fit' variant="mink">Mink</Badge>
        )
    } else {
        return (
            <Badge className='w-fit' variant="default">None</Badge>
        )
    }
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
    if (difficulty === 'No Skill') {
        return (
            <Badge className='w-fit' variant="noskill"><div className='flex gap-1'><p>No</p><p>Skill</p></div></Badge>
        )
    } else if (difficulty === 'Medium') {
        return (
            <Badge className='w-fit' variant="medium">Medium</Badge>
        )
    } else if (difficulty === 'Hard') {
        return (
            <Badge className='w-fit' variant="hard">Hard</Badge>
        )
    } else {
        return (
            <Badge className='w-fit' variant="default">None</Badge>
        )
    }
}