import React, { useState, useEffect, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Heart, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

export const PhotoGallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const galleryRef = React.useRef<HTMLDivElement>(null);
  const fullscreenRef = React.useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // GSAP animations
  useGSAP(
    () => {
      gsap.from(".gallery-title", {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".gallery-grid-item", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    },
    { scope: galleryRef }
  );

  // Load images from the /you directory
  useEffect(() => {
    const imageFiles = [
      "photo_14_2025-01-31_14-07-44.jpg",
      "photo_11_2025-01-31_14-07-44.jpg",
      "photo_9_2025-01-31_14-07-44.jpg",
      "photo_4_2025-01-31_14-07-44.jpg",
      "WhatsApp Image 2024-12-14 at 14.09.55_7762d349.jpg",
      "WhatsApp Image 2024-10-03 at 21.48.29_1bb3f7fe.jpg",
      "photo_2024-09-15_01-16-21.jpg",
      "photo_2024-09-15_01-16-14.jpg",
      "IMG_20240612_133809.jpg",
      "Screenshot 2024-06-08 141515.png",
      "Screenshot 2024-03-31 182815.png",
      "WhatsApp Image 2024-03-23 at 12.28.27_6d14405a.jpg",
      "photo_2024-03-26_20-40-25.jpg",
      "Snapchat-1533574450.jpg",
      "WhatsApp Image 2023-12-31 at 13.24.05_30b999c6.jpg",
      "WhatsApp Image 2023-12-26 at 12.57.36_4228c5fa.jpg",
      "WhatsApp Image 2023-11-13 at 13.40.30_dbee68c4.jpg",
      "IMG-20231109-WA0269.jpg",
    ];

    setImages(imageFiles.map(file => `/you/${file}`));
  }, []);

  // Memoize the navigation functions to prevent unnecessary rerenders and dependency issues
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const openFullscreen = (index: number) => {
    setCurrentSlide(index);
    setIsFullscreen(true);
    setShowSwipeHint(true);
    // Add no-scroll class to body
    document.body.style.overflow = "hidden";

    // Hide swipe hint after 3 seconds
    setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    // Remove no-scroll class from body
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (isFullscreen && fullscreenRef.current) {
      gsap.from(fullscreenRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate the current slide image
      gsap.fromTo(
        ".fullscreen-image",
        { scale: 1.05, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }
      );
    }
  }, [isFullscreen, currentSlide]);

  // Auto-rotate slideshow in fullscreen mode
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isFullscreen) {
      interval = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [isFullscreen, currentSlide]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;

      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") closeFullscreen();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Handle touch events for mobile swiping
  useEffect(() => {
    if (!isFullscreen) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;

      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      // Swipe left (next slide)
      if (diff > 50) {
        nextSlide();
      }
      // Swipe right (previous slide)
      else if (diff < -50) {
        prevSlide();
      }

      touchStartX.current = null;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isFullscreen, nextSlide, prevSlide]);

  // Generate a random aspect ratio for each image to create masonry effect
  const getRandomAspectRatio = (index: number) => {
    // Using a deterministic approach so the same image always gets the same ratio
    const options = ["square", "portrait", "landscape", "tall"];
    return options[index % options.length];
  };

  // Get grid span class based on aspect ratio
  const getGridSpanClass = (ratio: string) => {
    switch (ratio) {
      case "landscape":
        return "col-span-2";
      case "tall":
        return "row-span-2";
      case "portrait":
        return "";
      default:
        return "";
    }
  };

  return (
    <div ref={galleryRef} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-pink-500" />
        <h2 className="gallery-title text-3xl font-bold text-gray-800 text-center">
          Memories Together
        </h2>
        <Heart className="w-8 h-8 text-pink-500" />
      </div>

      <div className="gallery-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[200px] gap-4">
        {images.map((src, index) => {
          const aspectRatio = getRandomAspectRatio(index);
          const spanClass = getGridSpanClass(aspectRatio);

          return (
            <div
              key={index}
              className={`gallery-grid-item overflow-hidden rounded-lg shadow-md relative group cursor-pointer ${spanClass}`}
              onClick={() => openFullscreen(index)}
            >
              <img
                src={src}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <Heart className="text-white w-4 h-4 fill-white" />
                    <span className="text-white text-sm font-medium">Memory {index + 1}</span>
                  </div>
                  <Expand className="text-white w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center h-[100vh]"
          onClick={(e) => {
            // Close when clicking background but not on controls or image
            if (e.target === e.currentTarget) {
              closeFullscreen();
            }
          }}
        >
          <div
            ref={fullscreenRef}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img
              src={images[currentSlide]}
              alt={`Fullscreen ${currentSlide + 1}`}
              className="fullscreen-image max-h-[90vh] max-w-[95vw] mx-auto rounded-lg shadow-2xl object-contain"
            />

            <button
              className="absolute top-4 right-4 bg-black/60 rounded-full p-2 text-white hover:bg-black/70 transition-colors z-30"
              onClick={closeFullscreen}
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-3 text-white hover:bg-black/70 transition-colors z-30 hidden sm:block"
              onClick={prevSlide}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-3 text-white hover:bg-black/70 transition-colors z-30 hidden sm:block"
              onClick={nextSlide}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Mobile swipe hint - only shown briefly */}
            {showSwipeHint && (
              <div className="absolute bottom-32 left-1/2 -translate-x-1/2 sm:hidden bg-black/60 text-white text-xs px-3 py-1.5 rounded-full transition-opacity duration-300">
                Swipe left/right to navigate
              </div>
            )}

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-2 max-w-full px-4 z-30">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentSlide ? "bg-white scale-125" : "bg-white/40"
                    }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full z-30">
              <p className="text-white text-sm">{currentSlide + 1} / {images.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 