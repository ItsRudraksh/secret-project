import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Heart, Lock, Unlock, ShieldCheck, ArrowRight, X, Maximize, ChevronLeft, ChevronRight, AlertCircle, MessageSquare } from "lucide-react";

enum QuestionStep {
  INITIAL = "initial",
  QUESTION_1 = "question_1",
  QUESTION_2 = "question_2",
  QUESTION_3 = "question_3",
  COMPLETE = "complete",
}

interface QuestionAnswer {
  question1: string;
  question2: string;
  question3: string;
}

export const SecretGallery: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<QuestionStep>(QuestionStep.INITIAL);
  const [answers, setAnswers] = useState<QuestionAnswer>({
    question1: "",
    question2: "",
    question3: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showFailDialog, setShowFailDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [styleReloadCount, setStyleReloadCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const unlockRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  // Load images from explicit-content directory
  useEffect(() => {
    const imageFiles = [
      "image.png",
      "Screenshot 2025-02-22 224555.png",
      "Screenshot 2025-01-27 214000.png",
      "Screenshot 2025-01-25 134335.png",
      "Screenshot 2025-01-25 134232.png",
      "Screenshot 2025-01-17 215757.png",
      "kundli.jpg",
      "lol.jpg",
      "meme-1.jpg",
      "meme-2.jpg"
    ];

    setImages(imageFiles.map(file => `/explicit-content/${file}`));
  }, [currentStep, animationComplete]);

  // Animations
  useGSAP(() => {
    if (currentStep === QuestionStep.COMPLETE && unlockRef.current) {
      // Create unlock animation sequence
      const tl = gsap.timeline({
        onComplete: () => {
          // Force clear images first
          setImages([]);
          // Then set animation complete to trigger re-fetching
          setAnimationComplete(true);

          // Force reload images after a small delay
          setTimeout(() => {
            const imageFiles = [
              "image.png",
              "Screenshot 2025-02-22 224555.png",
              "Screenshot 2025-01-27 214000.png",
              "Screenshot 2025-01-25 134335.png",
              "Screenshot 2025-01-25 134232.png",
              "Screenshot 2025-01-17 215757.png",
              "kundli.jpg",
              "lol.jpg",
              "meme-1.jpg",
              "meme-2.jpg"
            ];
            setImages(imageFiles.map(file => `/explicit-content/${file}`));
          }, 300);
        }
      });

      tl.to(unlockRef.current, {
        scale: 1.5,
        duration: 0.5,
        ease: "power2.out",
      })
        .to(unlockRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        })
        .fromTo(".secret-gallery-item", {
          scale: 0,
          opacity: 0,
        }, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        });
    }
  }, [currentStep]);

  // Add expected answers
  const expectedAnswers = {
    question1: "Kappooo",
    question2: "10",
    question3: "Everything",
  };

  // Modify the handleSubmit function to validate answers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    switch (currentStep) {
      case QuestionStep.INITIAL:
        setCurrentStep(QuestionStep.QUESTION_1);
        break;

      case QuestionStep.QUESTION_1:
        // Check that answer is not empty
        if (!answers.question1.trim()) {
          setError("Please provide an answer ❤️");
          return;
        }
        setCurrentStep(QuestionStep.QUESTION_2);
        break;

      case QuestionStep.QUESTION_2:
        const rating = parseInt(answers.question2);
        if (isNaN(rating) || rating < 1 || rating > 10) {
          setError("Please provide a rating between 1 and 10");
          return;
        }
        setCurrentStep(QuestionStep.QUESTION_3);
        break;

      case QuestionStep.QUESTION_3:
        if (!answers.question3.trim()) {
          setError("Please provide an answer ❤️");
          return;
        }

        // Check if all answers match expected values
        if (
          answers.question1.trim().toLowerCase() === expectedAnswers.question1.toLowerCase() &&
          answers.question2 === expectedAnswers.question2 &&
          answers.question3.trim().toLowerCase() === expectedAnswers.question3.toLowerCase()
        ) {
          setCurrentStep(QuestionStep.COMPLETE);
        } else {
          // Increment attempts
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);

          if (newAttempts >= 5) {
            setShowFailDialog(true);
          } else {
            setError(`Incorrect answers. Try again! (${newAttempts}/5 attempts)`);

            // Reset back to question 1
            setCurrentStep(QuestionStep.QUESTION_1);
          }
        }
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const openFullscreen = (src: string, index: number) => {
    setFullscreenImage(src);
    setCurrentImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Effect for fullscreen image transitions
  useEffect(() => {
    if (fullscreenImage && fullscreenRef.current) {
      gsap.fromTo(
        fullscreenRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [fullscreenImage, currentImageIndex]);

  // Effect to update fullscreen image when index changes
  useEffect(() => {
    if (fullscreenImage && images.length > 0) {
      setFullscreenImage(images[currentImageIndex]);
    }
  }, [currentImageIndex]);

  // Add keyboard navigation for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!fullscreenImage) return;

      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeFullscreen();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImage]);

  // Also add a useEffect to ensure images are visible after animation completes
  useEffect(() => {
    if (animationComplete && galleryRef.current) {
      // Force refresh the gallery visibility
      gsap.to(galleryRef.current, {
        opacity: 0,
        duration: 0,
        onComplete: () => {
          gsap.to(galleryRef.current, {
            opacity: 1,
            duration: 0.3,
          });
        }
      });
    }
  }, [animationComplete]);

  // Add this new useEffect for handling style reloads
  useEffect(() => {
    // Only run for the first 2 times after animation completes
    if (animationComplete && styleReloadCount < 1) {
      // Force reload the images again with a delay between each reload
      const timer = setTimeout(() => {
        console.log(`Reloading styles (${styleReloadCount + 1}/2)...`);

        // Force reload images
        const imageFiles = [
          "image.png",
          "Screenshot 2025-02-22 224555.png",
          "Screenshot 2025-01-27 214000.png",
          "Screenshot 2025-01-25 134335.png",
          "Screenshot 2025-01-25 134232.png",
          "Screenshot 2025-01-17 215757.png",
          "kundli.jpg",
          "lol.jpg",
          "meme-1.jpg",
          "meme-2.jpg"
        ];

        // Force a re-render by clearing and setting images
        setImages([]);
        setTimeout(() => {
          setImages(imageFiles.map(file => `/explicit-content/${file}`));

          // Also force a refresh on the gallery element
          if (galleryRef.current) {
            gsap.set(galleryRef.current, { clearProps: "all" });
            gsap.to(galleryRef.current, {
              opacity: 0,
              duration: 0.1,
              onComplete: () => {
                gsap.to(galleryRef.current, {
                  opacity: 1,
                  duration: 0.2
                });
              }
            });
          }

          // Update style reload counter
          setStyleReloadCount(prev => prev + 1);
        }, 100);
      }, 500 + (styleReloadCount * 500)); // Increase delay with each attempt

      return () => clearTimeout(timer);
    }
  }, [animationComplete, styleReloadCount]);

  const renderQuestion = () => {
    switch (currentStep) {
      case QuestionStep.INITIAL:
        return (
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <Lock className="w-20 h-20 text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Secret Content</h2>
            <p className="text-gray-600 mb-8">Answer a few questions to unlock this special content.</p>
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-pink-200/50 transition-shadow"
            >
              Begin <ArrowRight className="inline ml-2 w-4 h-4" />
            </button>
          </div>
        );

      case QuestionStep.QUESTION_1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Question 1 of 3</h2>
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-3">
                Who is your favorite person for real? 💖
              </label>
              <input
                type="text"
                name="question1"
                value={answers.question1}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors"
                placeholder="Enter their name..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-pink-200/50 transition-shadow"
            >
              Next <ArrowRight className="inline ml-2 w-4 h-4" />
            </button>
          </div>
        );

      case QuestionStep.QUESTION_2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Question 2 of 3</h2>
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-3">
                On a scale of 1-10, how much do you like this person? 💕
              </label>
              <input
                type="number"
                name="question2"
                min="1"
                max="10"
                value={answers.question2}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors"
                placeholder="Enter a number from 1 to 10..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-pink-200/50 transition-shadow"
            >
              Next <ArrowRight className="inline ml-2 w-4 h-4" />
            </button>
          </div>
        );

      case QuestionStep.QUESTION_3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Question 3 of 3</h2>
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-3">
                What's one thing you both enjoy doing together? 👫
              </label>
              <textarea
                name="question3"
                value={answers.question3}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors"
                placeholder="Share something special..."
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-pink-200/50 transition-shadow"
            >
              Unlock <Unlock className="inline ml-2 w-4 h-4" />
            </button>
          </div>
        );

      case QuestionStep.COMPLETE:
        if (!animationComplete) {
          return (
            <div ref={unlockRef} className="text-center">
              <div className="mb-8 flex justify-center">
                <Unlock className="w-20 h-20 text-pink-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Unlocking...</h2>
              <p className="text-gray-600">Preparing your special content...</p>
            </div>
          );
        }

        console.log("Gallery ready - images:", images);

        return (
          <div ref={galleryRef} className="w-full opacity-100">
            <div className="flex items-center justify-between mb-8 border-b pb-4 border-pink-100">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <ShieldCheck className="w-7 h-7 text-pink-500" />
                Exclusive Content
              </h2>
              <p className="text-sm text-pink-500 italic font-medium">Just for you ❤️</p>
            </div>

            {images.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-700">Loading your special images...</p>
              </div>
            ) : (
              <div
                key={`grid-${styleReloadCount}`}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-scroll"
              >
                {images.map((src, index) => {
                  // Create varied heights for a masonry effect
                  const isLarge = index % 3 === 0;
                  return (
                    <div
                      key={index}
                      className={`secret-gallery-item overflow-hidden rounded-xl shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${isLarge ? 'md:row-span-2' : ''
                        }`}
                      onClick={() => openFullscreen(src, index)}
                    >
                      <div className="relative">
                        <img
                          src={src}
                          alt={`Special moment ${index + 1}`}
                          className={`w-full object-cover ${isLarge ? 'h-96' : 'h-64'}`}
                          onLoad={() => console.log(`Image ${index} loaded:`, src)}
                          onError={(e) => console.error(`Image ${index} error:`, src, e)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
                          <p className="text-white text-base font-medium">Special moment {index + 1}</p>
                          <div className="bg-pink-500/80 p-2 rounded-full">
                            <Maximize className="text-white w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden p-6 relative">
        {error && (
          <div className="absolute top-4 right-4 left-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-center justify-between animate-bounce-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className={`mt-${error ? '12' : '2'}`}>
          {renderQuestion()}
        </form>
      </div>

      {showFailDialog && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full animate-bounce-in">
            <div className="flex items-center gap-3 mb-4 text-red-500">
              <AlertCircle className="w-8 h-8 flex-shrink-0" />
              <h3 className="text-xl font-bold">Why failing 😭 huhhh !!</h3>
            </div>

            <p className="text-gray-700 mb-6">
              You've made too many incorrect attempts. Please make sure you're entering the correct answers.
            </p>

            {!messageSent ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-pink-500" />
                      <span>Drop a message on my whatsapp</span>
                    </div>
                  </label>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setShowFailDialog(false);
                      setAttempts(0);
                      setCurrentStep(QuestionStep.QUESTION_1);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full transition-colors"
                  >
                    Try Again 😭
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <Heart className="w-16 h-16 text-pink-500 animate-pulse" />
                </div>
                <p className="text-gray-700 mb-6">
                  Message sent! Thank you for your feedback. ❤️
                </p>
                <button
                  onClick={() => {
                    setShowFailDialog(false);
                    setAttempts(0);
                    setMessage("");
                    setMessageSent(false);
                    setCurrentStep(QuestionStep.QUESTION_1);
                  }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full hover:shadow-pink-200/50 hover:shadow-lg transition-all"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center h-[100vh]"
          onClick={(e) => {
            // Close when clicking background but not on controls or image
            if (e.target === e.currentTarget) closeFullscreen();
          }}
        >
          <div
            ref={fullscreenRef}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img
              src={fullscreenImage}
              alt={`Fullscreen special moment`}
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
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-3 text-white hover:bg-black/70 transition-colors z-30 hidden sm:block"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-2 max-w-full px-4 z-30">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentImageIndex ? "bg-white scale-125" : "bg-white/40"
                    }`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full z-30">
              <p className="text-white text-sm">{currentImageIndex + 1} / {images.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 