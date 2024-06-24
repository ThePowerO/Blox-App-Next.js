"use client";

import React from "react";
import AddLikeButton, {
  AddFavoriteButton,
} from "../HtmlComponents/SubmitButtons";
import { Heart, Star } from "lucide-react";

export default function NoSessionLikeFav() {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex items-center gap-[5px]"
    >
      <button type="submit">
        <Star
          className={`cursor-pointer`}
          color="#e0ec3d"
          onMouseOver={(e) => (e.currentTarget.style.fill = "#e0ec3d")}
          onMouseOut={(e) => (e.currentTarget.style.fill = "")}
          width={22}
          height={22}
        />
      </button>
      <button type="submit" className="">
        <Heart
          className={`cursor-pointer`}
          color="#d64343"
          fillRule="inherit"
          onMouseOver={(e) => (e.currentTarget.style.fill = "#E21C49")}
          onMouseOut={(e) => (e.currentTarget.style.fill = "")}
          width={22}
          height={22}
        />
      </button>
    </div>
  );
}
