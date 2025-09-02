import { Clock, Download, Share2, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ChatBot from "@/components/widgets/ChatBot";
import { useState, useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import { PageLayout, AnimatedCard, StaggeredList } from "@/components/animations/PageAnimations";

const StoryTimeline = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen } = useSidebar();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const timelineStories = [
    {
      id: 1,
      title: "The Tech Innovation Wave",
      description: "A collection of breakthrough moments from our alumni in the tech industry",
      batchYear: 2020,
      posts: 15,
      generatedAt: "2024-12-10",
      author: "AI Assistant",
      highlights: ["Sarah's promotion to VP at Google", "Mike's startup acquisition", "Lisa's patent filing"]
    },
    {
      id: 2,
      title: "Healthcare Heroes Journey",
      description: "Stories of medical professionals making a difference during challenging times",
      batchYear: 2018,
      posts: 22,
      generatedAt: "2024-12-08",
      author: "AI Assistant",
      highlights: ["Dr. Chen's research breakthrough", "Nurse Amy's community service", "Dr. Patel's new clinic"]
    },
    {
      id: 3,
      title: "Entrepreneurship Chronicles",
      description: "From idea to execution - startup stories from our ambitious alumni",
      batchYear: 2019,
      posts: 18,
      generatedAt: "2024-12-05",
      author: "AI Assistant",
      highlights: ["Emma's food tech startup", "David's fintech success", "Rachel's sustainable fashion brand"]
    }
  ];

  // Professional Loader for StoryTimeline
  const ProfessionalLoader = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-10 w-48 bg-muted/50 rounded-lg animate-pulse mb-2"></div>
            <div className="h-5 w-80 bg-muted/40 rounded animate-pulse"></div>
          </div>
          <div className="flex space-x-3">
            <div className="h-9 w-28 bg-muted/50 rounded-md animate-pulse"></div>
            <div className="h-9 w-36 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="professional-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-7 w-64 bg-muted/50 rounded animate-pulse mb-2"></div>
                  <div className="h-5 w-96 bg-muted/40 rounded animate-pulse mb-4"></div>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-6 w-20 bg-primary/20 rounded animate-pulse"></div>
                    <div className="h-4 w-32 bg-muted/40 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-muted/40 rounded animate-pulse"></div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-muted/50 rounded animate-pulse"></div>
                  <div className="h-8 w-8 bg-muted/50 rounded animate-pulse"></div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="bg-surface rounded-lg p-6 mb-4">
                <div className="relative">
                  <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-primary/30"></div>
                  
                  <div className="space-y-8">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-pulse"></div>
                        <div className="flex-1 bg-card rounded-lg p-4 space-y-2">
                          <div className="h-5 w-48 bg-muted/50 rounded animate-pulse"></div>
                          <div className="h-4 w-32 bg-muted/40 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="h-4 w-40 bg-muted/40 rounded animate-pulse"></div>
                <div className="h-8 w-28 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="professional-card mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-primary/20 rounded-full animate-pulse mx-auto"></div>
          <div className="h-7 w-64 bg-muted/50 rounded animate-pulse mx-auto"></div>
          <div className="h-5 w-96 bg-muted/40 rounded animate-pulse mx-auto"></div>
          <div className="h-12 w-48 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg animate-pulse mx-auto"></div>
        </CardContent>
      </Card>

      <div className="flex justify-center items-center py-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
          <div className="text-sm font-medium text-foreground">Loading story timelines</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className={`flex transition-all duration-300 ${isOpen ? '' : 'ml-0'}`}>
        <Sidebar />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${isOpen ? '' : 'max-w-full'}`}>
          {isLoading ? (
            <ProfessionalLoader />
          ) : (
            <PageLayout 
              title="StoryTimeline" 
              subtitle="AI-generated visual timelines of alumni stories and achievements"
              className="max-w-4xl mx-auto"
            >
              <AnimatedCard delay={200}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold">AI Story Generator</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter by Batch
                    </Button>
                    <Button variant="hero" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Generate New Timeline
                    </Button>
                  </div>
                </div>
              </AnimatedCard>

              <StaggeredList className="space-y-6" delay={400}>
                {timelineStories.map((story) => (
                  <Card key={story.id} className="professional-card hover:alma-shadow-strong">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-semibold text-foreground mb-2">
                          {story.title}
                        </CardTitle>
                        <p className="text-muted-foreground mb-4">{story.description}</p>
                        
                        <div className="flex items-center space-x-4 mb-4">
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Class of {story.batchYear}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            Generated on {story.generatedAt}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Avatar className="h-5 w-5 mr-2">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                AI
                              </AvatarFallback>
                            </Avatar>
                            {story.author}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Timeline Preview */}
                    <div className="bg-surface rounded-lg p-6 mb-4">
                      <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-primary/30"></div>
                        
                        {/* Timeline Items */}
                        <div className="space-y-8">
                          {story.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-start space-x-4">
                              <div className="relative">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center alma-shadow">
                                  <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                                </div>
                                {index === 0 && (
                                  <div className="absolute -top-2 -left-2 w-12 h-12 bg-primary/20 rounded-full animate-pulse"></div>
                                )}
                              </div>
                              <div className="flex-1 bg-card rounded-lg p-4 alma-shadow">
                                <h4 className="font-medium text-foreground">{highlight}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Part of the {story.title} collection
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Story Stats */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Based on {story.posts} posts from alumni
                      </div>
                      <Button variant="hero" size="sm">
                        View Full Timeline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                ))}
              </StaggeredList>

              <AnimatedCard delay={800}>
                {/* Generate New Timeline CTA */}
                <Card className="professional-card mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Create Your Custom Timeline
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Generate personalized story timelines based on specific batches, departments, or topics
                    </p>
                    <Button variant="hero" size="lg" className="alma-glow">
                      Generate New Timeline
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </PageLayout>
          )}
        </main>
      </div>
      
      <ChatBot />
    </div>
  );
};export default StoryTimeline;