'use client';

import Image from "next/image";
import Mammoth from "../../public/MammothFruit.webp";
import Leopard from "../../public/LeopardFruit.webp";
import Bomb from "../../public/BombFruit.webp";
import Ope from "../../public/ControlFruit.webp";
import gsap from 'gsap';
import React, { useEffect, useRef } from "react";

export default function LandingHeader() {
  const mammothRef = useRef(null);
  const leopardRef = useRef(null);
  const bombRef = useRef(null);
  const opeRef = useRef(null);
  const mobileOpeRef = useRef(null);
  

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(mammothRef.current, {
      duration: 4,
      rotation: 20,
      ease: "power1.inOut",
      transformOrigin: "center center",
    }, 0);
    tl.to(leopardRef.current, {
      duration: 4,
      rotation: -30,
      ease: "power1.inOut",
      transformOrigin: "center center",
    }, 0);
    tl.to(bombRef.current, {
      duration: 4,
      rotation: -13,
      ease: "power1.inOut",
      transformOrigin: "center center",
    }, 0);
    tl.to(opeRef.current, {
      duration: 4,
      rotation: -20,
      ease: "power1.inOut",
      transformOrigin: "center center",
    }, 0);
    tl.to(mobileOpeRef.current, {
      duration: 4,
      rotation: -20,
      ease: "power1.inOut",
      transformOrigin: "center center",
    }, 0);
  }, []);

  return (
    <>
      <div className="relative px-4 py-16 medium:py-24 sm:px-6 lg:flex lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right relative">
          <h1 className="text-3xl font-extrabold sm:text-5xl relative">
            <span className="relative">
              Build
              <Image
                ref={bombRef}
                src={Bomb}
                width={80}
                height={80}
                className="absolute top-[-60px] -left-[40px]"
                alt="Bomb"
              />
              <Image
                ref={mammothRef}
                src={Mammoth}
                width={80}
                height={80}
                className="hidden sm:block sm:absolute sm:top-[-100px] sm:left-[300px] lg:top-[-100px] lg:left-[500px]"
                alt="Bomb"
              />
              <Image
                ref={leopardRef}
                src={Leopard}
                width={80}
                height={80}
                className="hidden sm:block sm:absolute  sm:top-[170px] sm:left-[430px] md:left-[570px] lg:top-[100px] lg:left-[700px]"
                alt="Bomb"
              />
              <Image
                ref={opeRef}
                src={Ope}
                width={80}
                height={80}
                className="hidden sm:block sm:absolute sm:top-[260px] sm:left-[310px]"
                alt="Ope"
              />
            </span>{" "}
            your favorite Combo today!
            <strong className="block font-extrabold text-cyan-500">
              {" "}
              Become a
              <span className="relative">
                {" "}
                Hunter
                <Image
                  ref={mobileOpeRef}
                  src={Ope}
                  width={40}
                  height={40}
                  className="hidden petit:block petit:absolute petit:top-0 petit:left-[112px] sm:hidden"
                  alt="Ope"
                />
              </span>
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Build your favorite Combo and share it to the community of your
            kinds in just a few clicks.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <a
              href="#"
              className="block w-full rounded bg-cyan-500 px-12 py-3 text-sm font-medium text-white shadow duration-150 ease-in-out hover:bg-cyan-600 focus:outline-none focus:ring active:bg-cyan-500 sm:w-auto"
            >
              Get Started
            </a>

            <a
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-cyan-500 shadow hover:text-cyan-700 focus:outline-none focus:ring active:text-cyan-500 sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Image alt="" src={"/SquigleArrowShort.png"} width={60} height={60} />
      </div>
    </>
  );
}
