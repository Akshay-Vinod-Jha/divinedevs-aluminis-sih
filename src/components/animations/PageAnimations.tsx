import { useState, useEffect, useRef, ReactNode } from "react";

// Custom hook for intersection observer animations
const useIntersectionAnimation = (threshold = 0.1, rootMargin = "0px") => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin]);

  return [elementRef, isVisible] as const;
};

// Reusable Page Layout with animations
interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const PageLayout = ({ children, title, subtitle, className = "" }: PageLayoutProps) => {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className={`transition-all duration-1000 ${
        contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
            {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

// Animated Card Component
interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedCard = ({ children, delay = 0, className = "" }: AnimatedCardProps) => {
  const [cardRef, isCardVisible] = useIntersectionAnimation(0.1);

  return (
    <div 
      ref={cardRef}
      className={`transition-all duration-700 ${
        isCardVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-6 scale-98'
      } ${className}`}
      style={{ 
        transitionDelay: isCardVisible ? `${delay}ms` : '0ms' 
      }}
    >
      {children}
    </div>
  );
};

// Staggered List Animation
interface StaggeredListProps {
  children: ReactNode[];
  delay?: number;
  className?: string;
}

export const StaggeredList = ({ children, delay = 150, className = "" }: StaggeredListProps) => {
  const [listRef, isListVisible] = useIntersectionAnimation(0.1);

  return (
    <div ref={listRef} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-700 ${
            isListVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{ 
            transitionDelay: isListVisible ? `${index * delay}ms` : '0ms' 
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
