import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { quotes } from '../data/quotes';
import { Quote } from 'lucide-react';

export const DailyQuote: React.FC = () => {
  const quoteRef = React.useRef(null);
  const [currentQuote, setCurrentQuote] = React.useState(quotes[0]);

  useGSAP(() => {
    gsap.from(quoteRef.current, {
      opacity: 0,
      y: 30,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)'
    });
  }, { scope: quoteRef });

  React.useEffect(() => {
    const index = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[index]);
  }, []);

  return (
    <div ref={quoteRef} className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl shadow-lg">
      <Quote className="w-12 h-12 text-pink-500 mb-4" />
      <p className="text-xl font-medium text-gray-700 italic mb-4">
        "{currentQuote.text}"
      </p>
      <p className="text-right text-gray-600">- {currentQuote.author}</p>
    </div>
  );
};