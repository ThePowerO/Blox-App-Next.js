import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export const FilterTypes = ["Recent", "Old", "Top"];

export default function CommentFilter() {
  const SearchParams = useSearchParams();
  const selectedFilter = SearchParams.get("filter");
  return (
    <div className="mt-[20px] flex flex-col">
      <div className="flex w-full tinymax:px-[10px] px-[40px] py-2 items-center border rounded-xl dark:border-none dark:bg-[#212529]">
        <div className="flex tinymax:gap-1 gap-4 items-center text-sm">
          <p className="text-zinc-400">Filter by:</p>
          {FilterTypes.map((filterType) => (
            <Link
              key={filterType}
              href={`?${new URLSearchParams({
                filter: filterType,
              })}`}
              scroll={false}
              className={`cursor-pointer ${
                filterType === selectedFilter
                  ? "bg-zinc-500 text-white"
                  : "hover:bg-stone-200 dark:hover:bg-zinc-600"
              } text-center place-content-center w-[60px] p-1 rounded-sm`}
            >
              {filterType}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
