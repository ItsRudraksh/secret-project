import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SecretGallery } from './SecretGallery';
import { Lock, Key, HeartHandshake } from 'lucide-react';

export const SecretPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // The password is just "loveyou" (but you can change this)
  const correctPassword = 'lalleee';

  useGSAP(() => {
    gsap.from('.lock-icon', {
      rotate: 15,
      transformOrigin: 'center center',
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'sine.inOut'
    });

    gsap.from('.secret-title', {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.secret-form', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out'
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.toLowerCase() === correctPassword) {
      gsap.to(formRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setIsAuthenticated(true);

          // Reset password after authenticated
          setPassword('');
        }
      });
    } else {
      setError('Incorrect password. Try again! 💔');

      // Shake animation for incorrect password
      gsap.to(formRef.current, {
        x: (i) => [0, -10, 10, -10, 10, 0][i] || 0,
        duration: 0.4,
        ease: 'power1.inOut'
      });
    }
  };

  if (isAuthenticated) {
    return <SecretGallery />;
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center px-4"
    >
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden p-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Lock className="w-16 h-16 text-pink-500 lock-icon" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 secret-title mb-2">
            Secret Content
          </h1>
          <p className="text-gray-600">Enter the password to access exclusive memories.</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="secret-form">
          <div className="mb-4">
            <div className="relative">
              <input
                type="password"
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors"
                placeholder="Enter secret password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-pink-200/50 transition-shadow"
          >
            Unlock Content
          </button>

          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-pink-500 text-sm hover:text-pink-700 transition-colors"
              onClick={() => setShowHint(!showHint)}
            >
              {showHint ? 'Hide hint' : 'Need a hint?'}
            </button>

            {showHint && (
              <div className="mt-2 p-3 bg-pink-50 rounded-lg text-sm text-gray-700 flex items-center gap-2">
                <HeartHandshake className="text-pink-500 w-4 h-4 flex-shrink-0" />
                <p>Its the word you love to call me starts with L and ends with E 💕</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}; 