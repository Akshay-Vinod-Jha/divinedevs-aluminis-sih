import { useState, useEffect } from "react";

interface CountingNumberProps {
  start: number;
  end: number;
  duration: number;
  className?: string;
}

const CountingNumber = ({
  start,
  end,
  duration,
  className = "",
}: CountingNumberProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);

      const current = Math.floor(start + (end - start) * easeOutQuart);
      setCount(current);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [start, end, duration]);

  return <span className={className}>{count.toLocaleString()}</span>;
};

export default CountingNumber;
