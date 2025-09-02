
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/widgets/RightSidebar";
import CreatePost from "@/components/feed/CreatePost";
import PostCard from "@/components/feed/PostCard";
import ChatBot from "@/components/widgets/ChatBot";
import heroNetworking from "@/assets/hero-networking.jpg";
import { useState, useEffect } from "react";

// Custom hook for counting animation
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

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, start]);

  return count;
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Counting animations for statistics
  const alumniCount = useCountUp(2450, 2500);
  const companiesCount = useCountUp(156, 2000);
  const successRate = useCountUp(89, 2200);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-2xl mx-auto p-6">
          {isLoading ? <ProfessionalLoader /> : (
            <>
              {/* Welcome Section */}
              <div className="hero-gradient rounded-xl p-8 mb-6 text-center alma-shadow-strong">
                <h1 className="text-3xl font-bold text-primary-foreground mb-3">
                  Welcome to AlmaConnect
                </h1>
                <p className="text-primary-foreground/90 text-lg mb-6">
                  Your professional alumni network where stories inspire careers and connections create opportunities.
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-foreground">
                      {alumniCount.toLocaleString()}+
                    </div>
                    <div className="text-sm text-primary-foreground/80">Alumni Connected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-foreground">
                      {companiesCount}
                    </div>
                    <div className="text-sm text-primary-foreground/80">Active Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-foreground">
                      {successRate}%
                    </div>
                    <div className="text-sm text-primary-foreground/80">Success Rate</div>
                  </div>
                </div>
              </div>
              {/* Create Post */}
              <CreatePost />
              {/* Posts Feed */}
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <PostCard key={index} {...post} />
                ))}
              </div>
              {/* Load More */}
              <div className="text-center mt-8">
                <button className="bg-surface hover:bg-surface-hover border border-border text-foreground px-6 py-3 rounded-lg alma-transition alma-shadow">
                  Load More Posts
                </button>
              </div>
            </>
          )}
        </main>
        <RightSidebar />
      </div>
      <ChatBot />
    </div>
  );
};

export default Index;
