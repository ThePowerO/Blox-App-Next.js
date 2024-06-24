import noAvatar from "@/public/Icons/noavatar.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//<AvatarImage src={noAvatar as any} alt={`@${userNickName}`} />

export function AvatarDemo({ userImg, userNickName }: any) {
  return (
    <Avatar className=" flex-none">
      <AvatarImage className="border border-black rounded-full" src={userImg} alt={`@${userNickName}`} />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
}

