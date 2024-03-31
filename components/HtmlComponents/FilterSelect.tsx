'use client';

import React from 'react'

export default function FilterSelect() {
  return (
    <div
        id="dropdownHelperRadio"
        className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-60"
    >        
        <button id="dropdownHelperRadioButton" data-dropdown-toggle="dropdownHelperRadio" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" type="button">Dropdown radio <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
        </button>
        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHelperRadioButton"
        >
            <li>
                <div className="flex p-2 rounded hover:bg-gray-100">
                    <div className="flex items-center h-5">
                        <input
                            id="helper-radio-4"
                            name="helper-radio"
                            type="radio" value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
                            focus:ring-blue-500"
                        />
                    </div>
                    <div className="ms-2 text-sm">
                        <label htmlFor="helper-radio-4" className="font-medium text-gray-900">
                            <div>Individual</div>
                            <p id="helper-radio-text-4"
                                className="text-xs font-normal text-gray-500"
                            >
                                Some helpful instruction goes over here.
                            </p>
                        </label>
                    </div>
                </div>
            </li>
            <li>
                <div className="flex p-2 rounded hover:bg-gray-100">
                    <div className="flex items-center h-5">
                        <input id="helper-radio-5" name="helper-radio" type="radio" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-bl" />
                    </div>
                    <div className="ms-2 text-sm">
                        <label htmlFor="helper-radio-5" className="font-medium text-gray-900">
                            <div>Company</div>
                            <p id="helper-radio-text-5"
                                className="text-xs font-normal text-gray-500"
                            >
                                Some helpful instruction goes over here.
                            </p>
                        </label>
                    </div>
                </div>
            </li>
            <li>
                <div className="flex p-2 rounded hover:bg-gray-100">
                    <div className="flex items-center h-5">
                        <input
                            id="helper-radio-6"
                            name="helper-radio"
                            type="radio" value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
                            focus:ring-blue-500
                            "
                        />
                    </div>
                    <div className="ms-2 text-sm">
                        <label htmlFor="helper-radio-6" className="font-medium text-gray-900">
                            <div>Non profit</div>
                            <p id="helper-radio-text-6" 
                                className="text-xs font-normal text-gray-500"
                            >
                                Some helpful instruction goes over here.
                            </p>
                        </label>
                    </div>
                </div>
            </li>
        </ul>
    </div>
  )
}
