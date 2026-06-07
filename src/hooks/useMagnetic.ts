import { useRef, useState, useEffect } from 'react';

export const useMagnetic = (strength = 0.35) => {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setPosition({ x: 0, y: 0 });
        return;
      }
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Distance between cursor and button center
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      // Restrict magnetic pull to a bounding box area for performance
      const threshold = 120;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < threshold) {
        setPosition({
          x: deltaX * strength,
          y: deltaY * strength,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove as EventListener);
    element.addEventListener('mouseleave', handleMouseLeave as EventListener);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove as EventListener);
      element.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, [strength]);

  return { ref, x: position.x, y: position.y };
};
