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
            <Badge variant="swordmain">Main Sword</Badge>
        )
    } else if (stats === 'Main Fruit') {
        return (
            <Badge variant="fruitmain">Main Fruit</Badge>
        )
    } else if (stats === 'Hybrid') {
        return (
            <Badge variant="hybrid">Hybrid</Badge>
        )
    } else if (stats === 'Main Gun') {
        return (
            <Badge variant="gunmain">Main Gun</Badge>
        )
    } else {
        return (
            <Badge variant="default">None</Badge>
        )
    }
}

export const SpecialtyBadge = ({ specialty }: SpecialtyBadgeProps) => {
    if (specialty === 'PVP') {
        return (
            <Badge variant="pvp">PVP</Badge>
        )
    } else if (specialty === 'PVE') {
        return (
            <Badge variant="pve">PVE</Badge>
        )
    } else if (specialty === 'Grind') {
        return (
            <Badge variant="grind">Grind</Badge>
        )
    } else {
        return (
            <Badge variant="default">None</Badge>
        )
    }
}

export const RaceBadge = ({ race }: RaceBadgeProps) => {
    if (race === 'Human') {
        return (
            <Badge variant="human">Human</Badge>
        )
    } else if (race === 'Ghoul') {
        return (
            <Badge variant="ghoul">Ghoul</Badge>
        )
    } else if (race === 'Fishman') {
        return (
            <Badge variant="fishman">Fishman</Badge>
        )
    } else if (race === 'Cyborg') {
        return (
            <Badge variant="cyborg">Cyborg</Badge>
        )
    } else if (race === 'Skypian') {
        return (
            <Badge variant="skypian">Skypian</Badge>
        )
    } else if (race === 'Mink') {
        return (
            <Badge variant="mink">Mink</Badge>
        )
    } else {
        return (
            <Badge variant="default">None</Badge>
        )
    }
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
    if (difficulty === 'No Skill') {
        return (
            <Badge variant="noskill">No Skill</Badge>
        )
    } else if (difficulty === 'Medium') {
        return (
            <Badge variant="medium">Medium</Badge>
        )
    } else if (difficulty === 'Hard') {
        return (
            <Badge variant="hard">Hard</Badge>
        )
    } else {
        return (
            <Badge variant="default">None</Badge>
        )
    }
}