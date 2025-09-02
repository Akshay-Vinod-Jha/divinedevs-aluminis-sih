
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/widgets/RightSidebar";
import CreatePost from "@/components/feed/CreatePost";
import PostCard from "@/components/feed/PostCard";
import heroNetworking from "@/assets/hero-networking.jpg";
import { useState, useEffect, useRef } from "react";
import { useSidebar } from "@/contexts/SidebarContext";

// Custom hook for counting animation with stable behavior
const useCountUp = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * (end - start) + start));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Start animation immediately
    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, start]);

  return count;
};

// Custom hook for intersection observer animations
const useIntersectionAnimation = (threshold = 0.1, rootMargin = "0px") => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing to prevent re-triggering
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

// Individual post animation component
const FadeInPost = ({ post, delay }: { post: any; delay: number }) => {
  const [postRef, isPostVisible] = useIntersectionAnimation(0.1);

  return (
    <div 
      ref={postRef}
      className={`transition-all duration-700 ${
        isPostVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-6 scale-98'
      }`}
      style={{ 
        transitionDelay: isPostVisible ? `${delay}ms` : '0ms' 
      }}
    >
      <PostCard {...post} />
    </div>
  );
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const { isOpen } = useSidebar();
  
  // Counting animations for statistics with different, realistic numbers
  const alumniCount = useCountUp(2847, 2500);      // Alumni Connected
  const companiesCount = useCountUp(245, 1800);    // Active Companies  
  const successRate = useCountUp(94, 2200);        // Success Rate
  const jobsPosted = useCountUp(1289, 2000);       // Jobs Posted
  const eventsHosted = useCountUp(156, 1900);      // Events Hosted

  // Animation hooks for posts section only (keep welcome section always visible)
  const [loadMoreRef, isLoadMoreVisible] = useIntersectionAnimation(0.1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setContentVisible(true); // Make content visible after loading
      setStatsVisible(true); // Make stats visible after loading
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Sample posts data
  const posts = [
    {
      author: {
        name: "Sarah Johnson",
        title: "Senior Software Engineer at Google",
        avatar: "/api/placeholder/48/48",
        batchYear: 2020
      },
      content: "Excited to share that I've been promoted to Senior Software Engineer! The journey from our college days to here has been incredible. Special thanks to the AlmaConnect community for all the mentorship and support. Looking forward to giving back to our amazing network! 🚀",
      timestamp: "2 hours ago",
      likes: 42,
      comments: 8,
      shares: 3,
      tags: ["career", "promotion", "google", "gratitude"],
      media: heroNetworking
    },
    {
      author: {
        name: "Michael Chen",
        title: "Startup Founder & CEO at TechFlow",
        avatar: "/api/placeholder/48/48",
        batchYear: 2019
      },
      content: "Our startup just closed Series A funding! 🎉 From a dorm room idea to a $10M valuation - couldn't have done it without the incredible network of alumni who believed in us from day one. If you're an aspiring entrepreneur, remember that your next big break might come from an unexpected connection.",
      timestamp: "4 hours ago",
      likes: 89,
      comments: 15,
      shares: 12,
      tags: ["startup", "funding", "entrepreneurship", "seriesA"]
    },
    {
      author: {
        name: "Dr. Priya Patel",
        title: "Cardiologist at Johns Hopkins",
        avatar: "/api/placeholder/48/48",
        batchYear: 2018
      },
      content: "Published my research on innovative cardiac treatments in the New England Journal of Medicine! This work represents 3 years of dedication and collaboration. Grateful for the strong foundation our alma mater provided in critical thinking and research methodology.",
      timestamp: "1 day ago",
      likes: 67,
      comments: 12,
      shares: 8,
      tags: ["research", "medicine", "publication", "cardiology"]
    }
  ];

  // Professional Loader for Index page
  const ProfessionalLoader = () => (
    <div className="max-w-2xl mx-auto p-6">
      <div className="hero-gradient rounded-xl p-8 mb-6 text-center alma-shadow-strong animate-pulse">
        <div className="h-10 w-64 bg-primary/20 rounded-lg mx-auto mb-4"></div>
        <div className="h-6 w-96 bg-primary/10 rounded-lg mx-auto mb-6"></div>
        <div className="flex justify-center space-x-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 w-24 bg-primary/10 rounded-lg"></div>
          ))}
        </div>
      </div>
      <div className="h-24 bg-muted/50 rounded-lg mb-6 animate-pulse"></div>
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-muted/40 rounded-lg animate-pulse"></div>
        ))}
      </div>
      <div className="text-center mt-8">
        <div className="h-12 w-48 bg-muted/50 rounded-lg mx-auto animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Responsive layout */}
      <div className="flex">
        <Sidebar />
        
        {/* Main Content - Responsive grid */}
        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
            {isLoading ? <ProfessionalLoader /> : (
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
                
                {/* Main Feed Column */}
                <div className="xl:col-span-3 space-y-4 lg:space-y-6">
                  {/* Welcome Section */}
                  <div className={`hero-gradient rounded-xl p-4 sm:p-6 lg:p-8 text-center alma-shadow-strong transition-all duration-1000 ${
                    contentVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                  }`}>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-foreground mb-2 lg:mb-3">
                      Welcome to AlmaConnect
                    </h1>
                    <p className="text-primary-foreground/90 text-sm sm:text-base lg:text-lg mb-4 lg:mb-6">
                      Your professional alumni network where stories inspire careers and connections create opportunities.
                    </p>
                    
                    {/* Statistics Section - Mobile responsive */}
                    <div className={`transition-all duration-700 delay-500 ${
                      statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 pt-4 lg:pt-6 border-t border-primary-foreground/20">
                        <div className="text-center">
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-foreground">
                            {alumniCount.toLocaleString()}+
                          </div>
                          <div className="text-xs text-primary-foreground/80">Alumni Connected</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-foreground">
                            {companiesCount}+
                          </div>
                          <div className="text-xs text-primary-foreground/80">Active Companies</div>
                        </div>
                        <div className="text-center col-span-2 sm:col-span-1">
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-foreground">
                            {successRate}%
                          </div>
                          <div className="text-xs text-primary-foreground/80">Success Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-foreground">
                            {jobsPosted.toLocaleString()}+
                          </div>
                          <div className="text-xs text-primary-foreground/80">Jobs Posted</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-foreground">
                            {eventsHosted}+
                          </div>
                          <div className="text-xs text-primary-foreground/80">Events Hosted</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Create Post */}
                  <div className={`transition-all duration-800 delay-300 ${
                    contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  }`}>
                    <CreatePost />
                  </div>
                  
                  {/* Posts Feed */}
                  <div className="space-y-4 lg:space-y-6">
                    {posts.map((post, index) => (
                      <FadeInPost key={index} post={post} delay={index * 150} />
                    ))}
                  </div>
                  
                  {/* Load More */}
                  <div 
                    ref={loadMoreRef}
                    className={`text-center transition-all duration-700 ${
                      isLoadMoreVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <button className="bg-surface hover:bg-surface-hover border border-border text-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg alma-transition alma-shadow hover:alma-shadow-strong transform hover:scale-105 text-sm sm:text-base">
                      Load More Posts
                    </button>
                  </div>
                </div>

                {/* Right Sidebar - Hidden on mobile/tablet */}
                <div className="hidden xl:block xl:col-span-1">
                  <div className="sticky top-20">
                    <RightSidebar />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
