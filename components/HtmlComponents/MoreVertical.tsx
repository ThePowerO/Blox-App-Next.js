"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  Trash2,
  Pencil,
  LoaderIcon,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCombo } from "@/lib/actions/comboActions";
import Link from "next/link";
import { useLocale } from "@/LocaleContext";
import { useFormStatus } from "react-dom";
import { Comment } from "@/lib/types";
import { DeleteComboBtn } from "./SubmitButtons";
import { usePathname, useRouter } from "next/navigation";
import { DeleteCommentAction } from "@/lib/actions/commentActions";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

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

type Props = {
  comment: Comment;
  toggleEditing: (commentId: string) => void;
};

export function MoreHorizontallBtn({ comment, toggleEditing }: Props) {
  const pathName = usePathname();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="size-[16px]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="p-1">
            <Button onClick={() => toggleEditing(comment.id)} variant="outline" className="flex w-full items-center gap-1">
              <Pencil width={18} height={18} />
              <span>Edit Comment</span>
            </Button>
          </div>
          <form action={async (FormData) => {
            toast.success("Comment Deleted");
            setTimeout(() => {
              window.location.reload();
            }, 1000)
            await DeleteCommentAction(FormData);
          }} className="p-1">
            <input type="hidden" name="commentId" value={comment.id} />
            <input type="hidden" name="comboId" value={comment.comboId} />
            <input type="hidden" name="pathName" value={pathName} />
            <DeleteCommentBtn />
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function DeleteCommentBtn() {

  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} variant="destructive" className="flex w-full items-center gap-1">
      {pending ? (
        <>
          <LoaderIcon className="animate-spin" width={18} height={18} />
          <span>Deleting Comment...</span>
        </>
      ) : (
        <>

          <Trash2 width={18} height={18} />
          <span>Delete Comment</span>
        </>
      )}
    </Button>
  );
};

export function EditCommentBtn() {

  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} variant="outline" className="flex w-full items-center gap-1">
      {pending ? (
        <>
          <LoaderIcon className="animate-spin" width={18} height={18} />
          <span>Editing Comment...</span>
        </>
      ) : (
        <>
          <Pencil width={18} height={18} />
          <span>Edit Comment</span>
        </>
      )}
    </Button>
  );
};
