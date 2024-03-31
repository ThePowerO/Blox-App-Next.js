import noAvatar from "@/public/Icons/noavatar.png"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

  //<AvatarImage src={noAvatar as any} alt={`@${userNickName}`} />
  
  export function AvatarDemo({ userImg, userNickName }: any) {
    return (
      <Avatar>
        <AvatarImage src={userImg} alt={`@${userNickName}`} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    )
  }
  