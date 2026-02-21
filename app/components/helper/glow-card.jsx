"use client"
import { useEffect, useRef, useState } from 'react';

const GlowCard = ({ children, identifier }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const angleRef = useRef(0);

  useEffect(() => {
    const CONTAINER = containerRef.current;
    if (!CONTAINER) return;

    const CARDS = CONTAINER.querySelectorAll(`.glow-card-${identifier}`);
    let animationFrameId;

    const animate = () => {
      angleRef.current = (angleRef.current + 1.5) % 360; // Professional medium speed
      for (const CARD of CARDS) {
        CARD.style.setProperty('--start', angleRef.current);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    if (isHovered) {
      for (const CARD of CARDS) {
        CARD.style.setProperty('--active', 1);
      }
      animate();
    } else {
      for (const CARD of CARDS) {
        CARD.style.setProperty('--active', 0);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [identifier, isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glow-container-${identifier} glow-container w-full`}
    >
      <article className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full overflow-hidden`}>
        <div className="glows"></div>
        <div className="relative z-10">
          {children}
        </div>
      </article>
    </div>
  );
};

export default GlowCard;
