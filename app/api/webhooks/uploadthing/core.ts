import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "next-auth";
 
const f = createUploadthing();
 
const auth = async ()  => {
    const session = await getServerSession();
    const userEmail = session?.user?.email;
    if (!userEmail) throw new Error("Unauthorized Email")
    return { userEmail }
}
 
export const ourFileRouter = {
  comboVideo: f({ video: { maxFileSize: "2GB", maxFileCount: 1 } })
    .middleware(() => auth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userEmail);
      console.log("file: ", file.url)
      return { uploadedBy: metadata.userEmail };
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;