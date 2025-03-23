import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PhotoGallery } from "./PhotoGallery";
import { Sparkles, Heart, Camera } from "lucide-react";

export const PhotoMemories: React.FC = () => {
  const pageRef = React.useRef(null);

  useGSAP(
    () => {
      gsap.from(".memories-header", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".memories-subtitle", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });

      gsap.from(".memories-decoration", {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "elastic.out(1, 0.3)",
        delay: 0.5,
      });
    },
    { scope: pageRef }
  );

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 memories-decoration">
        <Heart className="w-12 h-12 text-pink-200" />
      </div>
      <div className="absolute top-40 right-16 memories-decoration">
        <Sparkles className="w-12 h-12 text-purple-200" />
      </div>
      <div className="absolute bottom-20 left-20 memories-decoration">
        <Sparkles className="w-10 h-10 text-pink-200" />
      </div>
      <div className="absolute bottom-40 right-12 memories-decoration">
        <Heart className="w-10 h-10 text-purple-200" />
      </div>

      <header className="text-center py-12 px-4 relative z-10">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Camera className="w-10 h-10 text-pink-500 memories-decoration" />
          <h1 className="text-4xl font-bold text-gray-800 memories-header">
            Photo Memories
          </h1>
          <Camera className="w-10 h-10 text-pink-500 memories-decoration" />
        </div>
        <p className="text-xl text-gray-600 mt-2 max-w-2xl mx-auto memories-subtitle">
          Our journey captured in moments, each picture telling a story of friendship, laughter, and cherished memories.
        </p>
      </header>

      <main className="container mx-auto px-4 relative z-10 pb-16">
        <PhotoGallery />
      </main>

      <footer className="text-center py-8 text-gray-600 relative z-10">
        <p>Made with ❤️ for a ms bestieeee</p>
      </footer>
    </div>
  );
}; 