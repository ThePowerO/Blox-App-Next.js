"use client";

import React from "react";
import {
  MoreVertical,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCombo } from "@/lib/actions/comboActions";
import Link from "next/link";
import { useLocale } from "@/LocaleContext";
import { DeleteComboBtn } from "./SubmitButtons";

export default function MoreVerticalBtn({
  comboId,
  comboSlug,
  pathName,
}: {
  pathName: string;
  comboSlug: string;
  comboId: string;
}) {
  const { locale } = useLocale();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="hover:bg-slate-400 p-1 rounded-full transition-all">
            <MoreVertical width={18} height={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="p-1">
            <Button className="w-full flex gap-1" variant="outline">
              <Pencil width={18} height={18} />
              <Link href={`/${locale}/combos/${comboSlug}`}>View Combo</Link>
            </Button>
            <DropdownMenuSeparator />
            <form action={deleteCombo}>
              <>
                <input type="hidden" name="comboId" value={comboId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteComboBtn />
              </>
            </form>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}