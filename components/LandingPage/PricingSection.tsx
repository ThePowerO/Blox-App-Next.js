import React from "react";

type PricingPack = {
  packname: string;
  description: string;
  price: string;
  timestopay?: string;
  features: string[];
  notIncluded?: string[];
};

export default function PricingSection({
  packname,
  description,
  price,
  features,
  notIncluded,
  timestopay,
}: PricingPack) {
  return (
    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm mt-7">
      <div className="p-6 sm:px-8">
        <div className="flex items-center justify-between">
          <h2 className="p-2 bg-cyan-400 rounded-full w-fit text-sm font-medium">
            {packname}
            <span className="sr-only">Plan</span>
          </h2>
          {timestopay && <span className="p-2 text-white bg-gray-600 rounded-full w-fit text-sm font-medium">{timestopay}</span>}
        </div>

        <p className="mt-2 ">{description}</p>

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold sm:text-4xl"> ${price} </strong>

          <span className="text-sm font-medium ">/month</span>
        </p>

        <button className="mt-4 w-full block rounded border border-cyan-300 bg-cyan-300 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-cyan-300 focus:outline-none focus:ring active:text-cyan-300 sm:mt-6">
          Get Started
        </button>
      </div>

      <div className="p-6 sm:px-8">
        <p className="text-lg font-medium sm:text-xl">What's included:</p>

        <ul className="mt-2 space-y-2 sm:mt-4">
          {features.map((feature) => (
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-cyan-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="">{feature}</span>
            </li>
          ))}
          {notIncluded?.map((feature) => (
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5 text-red-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

              <span className="text-gray-400">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
