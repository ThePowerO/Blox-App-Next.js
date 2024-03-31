'use client';

import { Heart, Star } from "lucide-react";
import { useFormStatus } from "react-dom"

export default function AddLikeButton() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <div className="mb-[6px]">
                   <Heart
                        className={`cursor-pointer`}
                        color='#d64343'
                        fill="#E21C49"
                        width={18}
                        height={18}
                    /> 
                </div>
            ) : (
                <button type="submit">
                    <Heart
                        className={`cursor-pointer`}
                        color='#d64343'
                        width={18}
                        height={18}
                    />
                </button>
            )}
        </>
    )
}

export function RemoveLikeButton() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <div className="mb-[6px]">
                   <Heart
                        className={`cursor-pointer`}
                        color='#d64343'
                        width={18}
                        height={18}
                    /> 
                </div>
            ) : (
                <button>
                    <Heart
                        className={`cursor-pointer`}
                        color='#d64343'
                        fill="#E21C49"
                        width={18}
                        height={18}
                    />
                </button>
            )}
        </>
    )
}

export function AddFavoriteButton() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <div className="mb-[6px]">
                   <Star
                        className={`cursor-pointer`}
                        color='#e0ec3d'
                        fill="#e0ec3d"
                        width={18}
                        height={18}
                    /> 
                </div>
            ) : (
                <button type="submit">
                    <Star
                        className={`cursor-pointer`}
                        color='#e0ec3d'
                        width={18}
                        height={18}
                    />
                </button>
            )}
        </>
    )
}

export function RemoveFavoriteButton() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <div className="mb-[6px]">
                   <Star
                        className={`cursor-pointer`}
                        color='#e0ec3d'
                        width={18}
                        height={18}
                    /> 
                </div>
            ) : (
                <button>
                    <Star
                        className={`cursor-pointer`}
                        color='#e0ec3d'
                        fill="#e0ec3d"
                        width={18}
                        height={18}
                    />
                </button>
            )}
        </>
    )
}