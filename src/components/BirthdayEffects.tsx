import React, { useEffect, useCallback, memo } from 'react';
import confetti from 'canvas-confetti';
import { Howl } from 'howler';
import { isToday } from '../utils/timeUtils';

const birthdaySound = new Howl({
  src: ['https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'],
  volume: 0.5,
});

interface BirthdayEffectsProps {
  targetDate: Date;
}

export const BirthdayEffects: React.FC<BirthdayEffectsProps> = memo(({ targetDate }) => {
  const shootConfetti = useCallback(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  }, []);

  useEffect(() => {
    // Check if today is the birthday using our utility
    if (isToday(targetDate)) {
      shootConfetti();
      birthdaySound.play();
    }
  }, [targetDate, shootConfetti]);

  return null;
});