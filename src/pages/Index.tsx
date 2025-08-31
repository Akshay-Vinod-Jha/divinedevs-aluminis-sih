import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/widgets/RightSidebar";
import CreatePost from "@/components/feed/CreatePost";
import PostCard from "@/components/feed/PostCard";
import ChatBot from "@/components/widgets/ChatBot";
import heroNetworking from "@/assets/hero-networking.jpg";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 max-w-2xl mx-auto p-6">
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
                <div className="text-2xl font-bold text-primary-foreground">2,450+</div>
                <div className="text-sm text-primary-foreground/80">Alumni Connected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">156</div>
                <div className="text-sm text-primary-foreground/80">Active Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">89%</div>
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
        </main>

        <RightSidebar />
      </div>
      
      <ChatBot />
    </div>
  );
};

export default Index;
