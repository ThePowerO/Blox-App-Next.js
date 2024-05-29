'use client';

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function StopEditingLink() {
  const router = useRouter();
  
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex text-sm hover:underline cursor-pointer items-center gap-[5px] mr-[10px]"
    >
      <MoveLeft size={15} />
      Stop Editing
    </button>
  );
}
