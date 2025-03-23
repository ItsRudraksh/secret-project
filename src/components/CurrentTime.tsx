import React, { useState, useEffect } from 'react';
import { getCurrentTimeString } from '../utils/timeUtils';

export const CurrentTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTimeString());

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <p className="text-sm mt-2">Current IST Time: {currentTime}</p>
  );
}; 