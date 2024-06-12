"use client";

import { UploadButton } from "@/lib/uploadthing";
import { Separator } from "@radix-ui/react-menu";
import { Check, Pencil, PlusCircle, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { isWebUri } from "valid-url";
import ReactPlayer from "react-player";
import ComboVideo from "../HtmlComponents/ComboVideo";
import { DeleteComboVideo, UpdateComboVideoAction } from "@/lib/actions/editComboActions";
import { Combo } from "@/lib/types";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

const FormSchama = z.object({
  comboId: z.string(),
  comboVideo: z.string(),
  pathName: z.string(),
});

type InputType = z.infer<typeof FormSchama>;

export default function ChangeOrAddVideo({ combo }: { combo: Combo }) {
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [isSavingVideo, setIsSavingVideo] = useState(false);
  const [comboVideo, setComboVideo] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isWMV, setIsWMV] = useState(false);
  const pathName = usePathname();

  const { data: session } = useSession();
  const currentUser = session?.user as User;

  const form = useForm<InputType>({
    resolver: zodResolver(FormSchama),
    defaultValues: {
      comboId: combo.id,
      comboVideo: combo.comboVideo,
      pathName: pathName,
    },
  });

  const handleVideoUpload = (url: string) => {
    if (isWebUri(videoUrl)) {
      setIsValidUrl(true);
      form.setValue("comboVideo", url);
      setComboVideo(url);
      setIsEditingVideo(false);
      setIsSavingVideo(true);
      setVideoUrl(url);
    } else {
      setIsValidUrl(false);
      return; // Don't proceed if URL is invalid
    }
  };

  const UpdateComboVideo: SubmitHandler<InputType> = async (FormData) => {
    if (combo?.user.id !== currentUser.id) {
      return null;
    }
    await UpdateComboVideoAction(FormData);
    setIsEditingVideo(false);
    setIsSavingVideo(false);
    setComboVideo("");
    setVideoUrl("");
    setIsWMV(false);
  };

  return (
    <>
      <div>
        <div className="flex mb-6 items-center gap-2">
          <h2 className="font-bold">Combo Video</h2>
          {combo.comboVideo || comboVideo ? (
            <>
              {isEditingVideo ? (
                <button
                  onClick={() => setIsEditingVideo(false)}
                  type="button"
                  className="ml-2 hover:underline text-sm flex items-center gap-1"
                >
                  <XCircleIcon className="cursor-pointer" size={16} />
                  Cancel change
                </button>
              ) : (
                <>
                <button
                  onClick={() => setIsEditingVideo(true)}
                  type="button"
                  className="ml-2 hover:underline text-sm flex items-center gap-1"
                >
                  <Pencil className="cursor-pointer" size={16} />
                  Change video
                </button>
                {isSavingVideo && (
                  <form onSubmit={form.handleSubmit(UpdateComboVideo)}>
                    <input type="hidden" name="comboId" value={combo.id} />
                    <input type="hidden" name="pathName" value={pathName} />
                    <input type="hidden" name="comboVideo" value={form.getValues("pathName")} />
                    <button
                      type={form.formState.isSubmitting ? "button" : "submit"}
                      className={`${form.formState.isSubmitting ? "cursor-not-allowed bg-slate-400" : ""}
                      ml-2 p-1 border border-green-500
                      hover:bg-slate-200 rounded-full cursor-pointer`}
                    >
                      <Check className="text-green-500" size={18} />
                    </button>
                  </form>
                )}
                {combo.comboVideo && (
                  <form action={async (FormData) => {
                    await DeleteComboVideo(FormData);
                    setIsEditingVideo(false);
                    setIsSavingVideo(false);
                    setComboVideo("");
                    setVideoUrl("");
                    setIsWMV(false);
                    form.reset();
                  }}>
                    <input type="hidden" name="comboId" value={combo.id} />
                    <input type="hidden" name="pathName" value={pathName} />
                    <input type="hidden" name="comboVideo" value={""} />
                    <Button variant="destructive" className="ml-2" type="submit">
                      Delete video
                    </Button>
                  </form>
                )}
                </>
              )}
            </>
          ) : (
            <>
              {isEditingVideo ? (
                <button
                  onClick={() => setIsEditingVideo(false)}
                  type="button"
                  className="ml-2 hover:underline text-sm flex items-center gap-1"
                >
                  <XCircleIcon className="cursor-pointer" size={16} />
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingVideo(true)}
                  type="button"
                  className="ml-2 hover:underline text-sm flex items-center gap-1"
                >
                  <PlusCircle className="cursor-pointer" size={16} />
                  Add video here
                </button>
              )}
            </>
          )}

        </div>
        {form.getValues("comboVideo") && !isEditingVideo && (
          <ComboVideo comboVideo={form.getValues("comboVideo")} />
        )}
        {isEditingVideo && (
          <div className="border border-input rounded-lg p-2 dark:border-white">
            <UploadButton
              endpoint="comboVideo"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                if (res[0].url.endsWith(".wmv")) {
                  setIsWMV(true);
                  return;
                }
                setIsWMV(false);
                setIsSavingVideo(true);
                setIsEditingVideo(false);
                setComboVideo(res[0].url);
                form.setValue("comboVideo", res[0].url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                toast.error(`error uploading video`);
              }}
            />
            {isWMV && (
              <p className="text-sm text-red-500">Note: WMV videos are not supported.</p>
            )}
            <Separator className="my-2 border" />
            <p className="text-sm">Or by URL:</p>
            <div className="flex gap-[5px] items-center">
              <Input
                className="border dark:border-white"
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Enter YouTube video URL"
              />
              <Button type="button" onClick={() => handleVideoUpload(videoUrl)}>
                Play
              </Button>
            </div>
            {isValidUrl === false && (
              <p className="text-red-500 text-sm">Please enter a valid URL.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
