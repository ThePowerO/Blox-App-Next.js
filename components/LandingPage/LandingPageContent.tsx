import {
  Award,
  Globe,
  MessageCircleMore,
  PartyPopper,
  Search,
  Swords,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import TextGradient from "../HtmlComponents/TextGradient";

export default function LandingPageContent() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-24">
        <div className="p-3">
          <Image
            className={`rounded-lg light:hidden`}
            src="/Create-Combo-GUIDE-Dark.png"
            width={700}
            height={700}
            alt="combo guide"
          />
          <Image
            className={`rounded-lg dark:hidden`}
            src="/Create-Combo-GUIDE.png"
            width={700}
            height={700}
            alt="combo guide"
          />

        </div>
        <div className="mx-auto max-w-lg text-center">
          <strong className="text-3xl font-bold sm:text-4xl">
            Build a exquisite and fascinating <TextGradient from="from-blue-700" via="via-pink-700" to="to-pink-500" text="Combo" />
          </strong>
          <p className="mt-4 text-gray-300">
            Create a combo in just a few clicks and go enjoy very
            exciting features. Your combo your idea.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-24">
        <div className="mx-auto max-w-lg text-center">
          <strong className="text-3xl font-bold sm:text-4xl">
            Encounter new and exciting ways to play
          </strong>
          <p className="mt-4 text-gray-300">
            Pick a combo or create one, enjoy all kinds of features and learn
            how to win. Master how to pvp and pve by watching and playing.
          </p>
        </div>
        <div className="p-3">
          <Image
            className="rounded-lg"
            src="/BF-BG.png"
            width={600}
            height={600}
            alt="combo guide"
          />
        </div>
      </div>

      <div className="mx-auto max-w-lg text-center">
        <h3 className="text-3xl font-bold sm:text-4xl">
          Start your journey <span className="curved-underline">here</span>
        </h3>

        <p className="mt-4 text-gray-300">
          Begin your journey with Blox Fruits with a great experience and enjoy
          all kinds of features.
        </p>
      </div>
      <div className="grid p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
        <div className="border rounded-lg cursor-pointer hover:shadow-xl hover:border-cyan-800 hover:shadow-cyan-800 transition-all dureation-300 ">
          <div className="flex flex-col gap-2 p-5">
            <Globe className="size-12" />
            <span className="font-bold ">Join our community</span>
            <p>
              Be part of a community who loves Blox Fruits and share your ideas
              to those whose fits your personality and way of play.
            </p>
          </div>
        </div>
        <div className="border rounded-lg cursor-pointer hover:shadow-xl hover:border-cyan-800 hover:shadow-cyan-800 transition-all dureation-300">
          <div className="flex flex-col gap-2 p-5">
            <PartyPopper className="size-12" />
            <span className="font-bold ">Make Teams</span>
            <p>
              Find your team who has the same style of play and thinking as you
              and start your Hunting.
            </p>
          </div>
        </div>
        <div className="border rounded-lg cursor-pointer hover:shadow-xl hover:border-cyan-800 hover:shadow-cyan-800 transition-all dureation-300">
          <div className="flex flex-col gap-2 p-5">
            <Search className="size-12" />
            <span className="font-bold ">Combos</span>
            <p>
              Take a look at others combos and inspire yourself with them to
              tryout your new pvp style and battles.
            </p>
          </div>
        </div>
        <div className="border rounded-lg cursor-pointer hover:shadow-xl hover:border-cyan-800 hover:shadow-cyan-800 transition-all dureation-300">
          <div className="flex flex-col gap-2 p-5">
            <Swords className="size-12" />
            <span className="font-bold ">PVP</span>
            <p>
              Challenge people to fight a pvp or a battle fight with you or your
              team.
            </p>
          </div>
        </div>
        <div className="border rounded-lg cursor-pointer hover:shadow-xl hover:border-cyan-800 hover:shadow-cyan-800 transition-all dureation-300">
          <div className="flex flex-col gap-2 p-5">
            <Award className="size-12" />
            <span className="font-bold ">Highlight</span>
            <p>
              Find or Highlight combos to stand at the top of the leaderboard.
            </p>
          </div>
        </div>
        <div className="border rounded-lg cursor-pointer hover:shadow-xl hover:border-cyan-800 hover:shadow-cyan-800 transition-all dureation-300">
          <div className="flex flex-col gap-2 p-5">
            <MessageCircleMore className="size-12" />
            <span className="font-bold ">Comment</span>
            <p>
              Discuss with people about their combos and share your thoughts.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
