"use client";

import React from "react";
import { Award, DollarSign, MoreHorizontal } from "lucide-react";

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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function MoreHorizontalBtn({
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
        <DropdownMenuTrigger className="outline-none">
          <div className="hover:bg-slate-200 dark:hover:bg-stone-600 p-1 rounded-full transition-all">
            <MoreHorizontal width={18} height={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <div className="p-1">
            <Dialog>
              <DialogTrigger>
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 flex gap-1">
                  <Award width={18} height={18} />
                  <span>Highlight</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <Button
                    className="bg-green-600 text-white hover:bg-green-700"
                    type="button"
                  >
                    <DollarSign width={18} height={18} />
                    Pay
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
