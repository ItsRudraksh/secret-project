import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Countdown } from "./components/Countdown";
import { DailyQuote } from "./components/DailyQuote";
import { GiftWishlist } from "./components/GiftWishlist";
import { BirthdayEffects } from "./components/BirthdayEffects";
import { FloatingElements } from "./components/FloatingElements";
import { Gift, Heart, Sparkles } from "lucide-react";

export default function App() {
  const birthdayDate = new Date("2025-03-28");
  const appRef = React.useRef(null);

  useGSAP(
    () => {
      gsap.from(".header", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".name", {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
        delay: 0.5,
      });
    },
    { scope: appRef }
  );

  return (
    <div
      ref={appRef}
      className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 relative overflow-hidden"
    >
      <FloatingElements />
      <BirthdayEffects targetDate={birthdayDate} />

      <header className="header text-center py-12 px-4 relative z-10">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Gift className="w-10 h-10 text-pink-500" />
          <h1 className="text-4xl font-bold text-gray-800">
            Birthday Countdown
          </h1>
          <Heart className="w-10 h-10 text-pink-500" />
        </div>
        <div className="name flex items-center justify-center gap-2 text-2xl text-pink-600 font-bold">
          <Sparkles className="w-6 h-6" />
          <span>Rudrry</span>
          <Heart className="w-6 h-6 text-red-500" />
          <Sparkles className="w-6 h-6" />
        </div>
        <p className="text-xl text-gray-600 mt-2">
          Counting down to your special day!
        </p>
      </header>

      <main className="container mx-auto px-4 relative z-10">
        <Countdown targetDate={birthdayDate} />
        <div className="my-12">
          <DailyQuote />
        </div>
        <GiftWishlist />
      </main>

      <footer className="text-center py-8 text-gray-600 relative z-10">
        <p>Made with ❤️ for ms bestiee</p>
      </footer>
    </div>
  );
}
