import {} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/contexts/SidebarContext";
import {
  PageLayout,
  AnimatedCard,
  StaggeredList,
} from "@/components/animations/PageAnimations";

const AIHub = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const aiTools = [
    {
      id: "mentor-recommendation",
      title: "Mentor Recommendation",
      description:
        "AI-powered matching with ideal mentors based on your career goals and background",
      category: "Networking",
      color: "bg-blue-500/10 text-blue-600",
      status: "Active",
    },
    {
      id: "job-match",
      title: "Job Match",
      description:
        "Find perfect job opportunities with smart matching algorithms",
      category: "Career",
      color: "bg-green-500/10 text-green-600",
      status: "Active",
    },
    {
      id: "donation-prediction",
      title: "Donation Likelihood Prediction",
      description: "Predict alumni donation patterns for fundraising campaigns",
      category: "Analytics",
      color: "bg-yellow-500/10 text-yellow-600",
      status: "Beta",
    },
    {
      id: "event-prediction",
      title: "Event Attendance Prediction",
      description:
        "Forecast event attendance to optimize planning and resources",
      category: "Analytics",
      color: "bg-purple-500/10 text-purple-600",
      status: "Active",
    },
    {
      id: "sentiment-analysis",
      title: "Sentiment Analysis Dashboard",
      description:
        "Analyze alumni feedback and community sentiment in real-time",
      category: "Analytics",
      color: "bg-rose-500/10 text-rose-600",
      status: "Active",
    },
    {
      id: "fraud-detection",
      title: "Fraud/Anomaly Detection",
      description: "Detect suspicious activities and protect your community",
      category: "Security",
      color: "bg-red-500/10 text-red-600",
      status: "Active",
    },
  ];

  const categories = ["All", "Networking", "Career", "Analytics", "Security"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools =
    selectedCategory === "All"
      ? aiTools
      : aiTools.filter((tool) => tool.category === selectedCategory);

  const handleToolClick = (toolId: string) => {
    navigate(`/ai-hub/${toolId}`);
  };

  // Professional Loader
  const ProfessionalLoader = () => (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-muted/50 rounded-lg animate-pulse"></div>
        <div className="h-9 w-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md animate-pulse"></div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 bg-muted/50 rounded-full animate-pulse"
          ></div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <Card key={i} className="professional-card">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-32 bg-muted/50 rounded animate-pulse"></div>
                  <div className="h-3 w-16 bg-muted/40 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted/40 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-muted/40 rounded animate-pulse"></div>
              </div>
              <div className="h-9 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div
        className={`flex transition-all duration-300 ${isOpen ? "" : "ml-0"}`}
      >
        <Sidebar />
        <main
          className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${
            isOpen ? "" : "max-w-full"
          }`}
        >
          {isLoading ? (
            <ProfessionalLoader />
          ) : (
            <PageLayout
              title="AI Hub"
              subtitle="Discover powerful AI tools designed to enhance your alumni experience"
              className="max-w-7xl mx-auto"
            >
              {/* Header Section */}
              <AnimatedCard delay={200}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      AI-Powered Tools
                    </h1>
                    <p className="text-muted-foreground">
                      Empowering alumni connections with artificial intelligence
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-success/10 text-success"
                    >
                      6 Tools Available
                    </Badge>
                    <Badge variant="outline">Beta</Badge>
                  </div>
                </div>
              </AnimatedCard>

              {/* Category Filter */}
              <AnimatedCard delay={400}>
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`transition-all duration-200 ${
                        selectedCategory === category
                          ? "alma-gradient text-primary-foreground shadow-lg"
                          : "hover:bg-accent/50"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </AnimatedCard>

              {/* AI Tools Grid */}
              <StaggeredList
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                delay={600}
              >
                {filteredTools.map((tool, index) => (
                  <Card
                    key={tool.id}
                    className="professional-card hover:shadow-lg transition-all duration-300 cursor-pointer group h-full flex flex-col"
                    onClick={() => handleToolClick(tool.id)}
                  >
                    <CardHeader className="p-6 pb-4 flex-shrink-0">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant={
                            tool.status === "Active" ? "secondary" : "outline"
                          }
                          className={
                            tool.status === "Active"
                              ? "bg-success/10 text-success"
                              : ""
                          }
                        >
                          {tool.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                        {tool.title}
                      </CardTitle>
                      <Badge variant="outline" className="w-fit text-xs">
                        {tool.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 flex flex-col flex-grow">
                      <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                        {tool.description}
                      </p>
                      <Button
                        className="w-full alma-gradient text-primary-foreground group-hover:shadow-lg transition-all duration-200 mt-4"
                        size="sm"
                      >
                        Launch Tool
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </StaggeredList>

              {/* Empty State */}
              {filteredTools.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No tools found in {selectedCategory}
                  </h3>
                  <p className="text-muted-foreground">
                    Try selecting a different category or explore all tools
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSelectedCategory("All")}
                  >
                    View All Tools
                  </Button>
                </div>
              )}
            </PageLayout>
          )}
        </main>
      </div>
    </div>
  );
};

export default AIHub;
