import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { giftItems } from "../data/gifts";
import { ShoppingBag } from "lucide-react";

export const GiftWishlist: React.FC = () => {
  const containerRef = React.useRef(null);

  useGSAP(
    () => {
      gsap.from(".gift-item", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="w-8 h-8 text-pink-500" />
        <h2 className="text-2xl font-bold text-gray-800">Luxury Wishlist</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {giftItems.map((item, index) => (
          <div
            key={index}
            className="gift-item bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
