import React from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Gift, Heart, Clock, Star } from 'lucide-react';

interface CountdownProps {
  targetDate: Date;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const containerRef = React.useRef(null);

  useGSAP(() => {
    gsap.from('.countdown-item', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'back.out'
    });
  }, { scope: containerRef });

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      
      setTimeLeft({
        days: differenceInDays(targetDate, now),
        hours: differenceInHours(targetDate, now) % 24,
        minutes: differenceInMinutes(targetDate, now) % 60,
        seconds: differenceInSeconds(targetDate, now) % 60
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div ref={containerRef} className="flex flex-wrap justify-center gap-8 p-8">
      <div className="countdown-item flex flex-col items-center bg-pink-100 p-6 rounded-lg shadow-lg">
        <Clock className="w-8 h-8 text-pink-500 mb-2" />
        <span className="text-4xl font-bold text-pink-600">{timeLeft.days}</span>
        <span className="text-pink-400">Days</span>
      </div>
      <div className="countdown-item flex flex-col items-center bg-purple-100 p-6 rounded-lg shadow-lg">
        <Gift className="w-8 h-8 text-purple-500 mb-2" />
        <span className="text-4xl font-bold text-purple-600">{timeLeft.hours}</span>
        <span className="text-purple-400">Hours</span>
      </div>
      <div className="countdown-item flex flex-col items-center bg-blue-100 p-6 rounded-lg shadow-lg">
        <Heart className="w-8 h-8 text-blue-500 mb-2" />
        <span className="text-4xl font-bold text-blue-600">{timeLeft.minutes}</span>
        <span className="text-blue-400">Minutes</span>
      </div>
      <div className="countdown-item flex flex-col items-center bg-teal-100 p-6 rounded-lg shadow-lg">
        <Star className="w-8 h-8 text-teal-500 mb-2" />
        <span className="text-4xl font-bold text-teal-600">{timeLeft.seconds}</span>
        <span className="text-teal-400">Seconds</span>
      </div>
    </div>
  );
};