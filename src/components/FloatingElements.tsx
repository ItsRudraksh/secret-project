import React, { useEffect, useRef } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';
import gsap from 'gsap';

export const FloatingElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.children;
    
    Array.from(elements).forEach((element) => {
      gsap.to(element, {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        rotation: 'random(-15, 15)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {[...Array(10)].map((_, i) => (
        <Heart
          key={`heart-${i}`}
          className="absolute text-pink-400 opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `scale(${0.5 + Math.random() * 0.5})`,
          }}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <Sparkles
          key={`sparkle-${i}`}
          className="absolute text-yellow-400 opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `scale(${0.5 + Math.random() * 0.5})`,
          }}
        />
      ))}
      {[...Array(6)].map((_, i) => (
        <Star
          key={`star-${i}`}
          className="absolute text-purple-400 opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `scale(${0.5 + Math.random() * 0.5})`,
          }}
        />
      ))}
    </div>
  );
};