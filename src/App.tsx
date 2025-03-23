import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Countdown } from "./components/Countdown";
import { DailyQuote } from "./components/DailyQuote";
import { GiftWishlist } from "./components/GiftWishlist";
import { BirthdayEffects } from "./components/BirthdayEffects";
import { FloatingElements } from "./components/FloatingElements";
import { PhotoMemories } from "./components/PhotoMemories";
import { SecretPage } from "./components/SecretPage";
import { Gift, Heart, Sparkles, Camera, Home, Lock } from "lucide-react";

type PageType = 'home' | 'photos' | 'secret';

export default function App() {
  const birthdayDate = new Date("2025-03-28");
  const appRef = React.useRef(null);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [pageTransition, setPageTransition] = useState(false);

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

      // Animate navigation button
      gsap.from(".nav-button", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "back.out",
        delay: 1,
      });
    },
    { scope: appRef, dependencies: [currentPage] }
  );

  // Navigation functions with transition effect
  const goToPage = (page: PageType) => {
    if (page === currentPage) return;

    setPageTransition(true);

    gsap.to("#app-container", {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        setCurrentPage(page);

        setTimeout(() => {
          gsap.to("#app-container", {
            opacity: 1,
            y: 0,
            duration: 0.3,
            onComplete: () => {
              setPageTransition(false);
            }
          });
        }, 100);
      }
    });
  };

  // Render navigation bar
  const renderNavBar = () => (
    <nav className="fixed top-4 right-4 z-50 flex gap-2">
      {currentPage !== 'home' && (
        <button
          onClick={() => goToPage('home')}
          className="nav-button flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-pink-200/50 transition-shadow duration-300"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Home</span>
        </button>
      )}

      {currentPage !== 'photos' && (
        <button
          onClick={() => goToPage('photos')}
          className="nav-button flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-pink-200/50 transition-shadow duration-300"
        >
          <Camera className="w-5 h-5" />
          <span className="font-medium">Photos</span>
        </button>
      )}

      {currentPage !== 'secret' && (
        <button
          onClick={() => goToPage('secret')}
          className="nav-button flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-pink-200/50 transition-shadow duration-300"
        >
          <Lock className="w-5 h-5" />
          <span className="font-medium">Secret</span>
        </button>
      )}
    </nav>
  );

  // Render the current page content
  const renderContent = () => {
    if (currentPage === 'photos') {
      return <PhotoMemories />;
    }

    if (currentPage === 'secret') {
      return <SecretPage />;
    }

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
  };

  return (
    <>
      {renderNavBar()}
      <div id="app-container" className={`transition-opacity ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
        {renderContent()}
      </div>
    </>
  );
}
