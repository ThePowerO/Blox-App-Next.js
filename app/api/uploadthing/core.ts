import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
 
const f = createUploadthing();
 
const auth = async ()  => {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const userName = session?.user.name;
    if (!userId) throw new UploadThingError("Unauthorized user (id)")
    return { userId, userName };
}
 
export const ourFileRouter = {
  comboVideo: f({ video: { maxFileSize: "2GB", maxFileCount: 1 } })
    .middleware(() => auth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file: ", file.url)
      return { uploadedBy: metadata.userName };
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;