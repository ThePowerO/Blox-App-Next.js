import { MessageCircleMore, TrendingUp, Trophy, User } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";

export default function SideBarElements() {
  const locale = useLocale();
  const SideBarElements = [
    {
      name: "Top Combos",
      icon: <Trophy size={20} />,
      url: "TopCombos"
    },
    {
      name: "Top Comments",
      icon: <MessageCircleMore size={20} />,
      url: "TopComments"
    },
    {
      name: "Relevant",
      icon: <TrendingUp size={20} />,
      url: "Relevant"
    },
  ]
  
  return (
    <>
      {SideBarElements.map((Element) => {
        return (
          <li key={Element.name} className="apperance-none">
            <Link
              href={`?${new URLSearchParams({
                filter: `${Element.url}`,
              })}`}
              className="flex hover:underline cursor-pointer items-center gap-2"
            >
              {Element.icon}
              {Element.name}
            </Link>
          </li>
        );
      })}
    </>
  );
}
