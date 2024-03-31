import React, { useState } from 'react'

export const ComboTypes = ["ALL", "PVP", "PVE", "Grind"];

export default function ComboFilter() {

    return (
        <ul className="items-center w-full text-sm font-medium border rounded-lg sm:flex bg-gray-900 border-gray-600 text-white mb-[20px]">
            {ComboTypes.map((type) => (
                <li key={type} className="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
                    <div className="flex items-center ps-3">
                        <input
                        id={`horizontal-list-radio-${type}`}
                        type="radio"
                        value={type}
                        name="list-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500"
                        />
                        <label htmlFor={`horizontal-list-radio-${type}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-300">{type}</label>
                    </div>
                </li>
            ))}
        </ul>
    )
}
