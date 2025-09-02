import { Bot, Sparkles, MessageSquare, FileText, Users, TrendingUp, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useState, useEffect } from "react";

// Custom hook for counting animation
const useCountUp = (end: number, duration: number = 2000, start: number = 0, decimals: number = 0) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = easeOutQuart * (end - start) + start;
      setCount(decimals > 0 ? parseFloat(currentValue.toFixed(decimals)) : Math.floor(currentValue));

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
  }, [end, duration, start, decimals]);

  return count;
};

const AIHub = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Counting animations for AI Usage stats
  const careerInsightsPercent = useCountUp(85, 2200);
  const mentorshipPercent = useCountUp(67, 2400);
  const resumePercent = useCountUp(43, 2600);

  // Counting animations for Smart Insights percentages
  const careerTransitionPercent = useCountUp(34, 2300);
  const connectionsCount = useCountUp(5, 1800);
  const skillMatchPercent = useCountUp(89, 2500);

  // Counting animations for Analytics section
  const successRate = useCountUp(94, 2800);
  const timeSaved = useCountUp(12.5, 2600, 0, 1);
  const connectionsMade = useCountUp(347, 3000);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const aiFeatures = [
    {
      id: 1,
      title: "Career Path Advisor",
      description: "Get AI-powered career guidance based on your background and alumni success stories",
      icon: TrendingUp,
      status: "active",
      usage: "142 consultations this month"
    },
    {
      id: 2,
      title: "Mentorship Matcher",
      description: "AI matches you with the perfect mentor based on your goals and interests",
      icon: Users,
      status: "active",
      usage: "89 matches made"
    },
    {
      id: 3,
      title: "Resume Optimizer",
      description: "Enhance your resume with AI suggestions based on industry trends",
      icon: FileText,
      status: "active",
      usage: "56 resumes improved"
    },
    {
      id: 4,
      title: "Network Insights",
      description: "Discover hidden connections and networking opportunities in your alumni network",
      icon: Brain,
      status: "beta",
      usage: "23 insights generated"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Generated career roadmap for Software Engineering",
      time: "2 hours ago",
      type: "career"
    },
    {
      id: 2,
      action: "Matched with 3 potential mentors in Data Science",
      time: "1 day ago", 
      type: "mentorship"
    },
    {
      id: 3,
      action: "Optimized resume - 15% improvement score",
      time: "3 days ago",
      type: "resume"
    }
  ];

  const aiInsights = [
    {
      title: "Alumni Success Patterns",
      description: "Top career transitions: Engineering → Product Management",
      trend: `+${careerTransitionPercent}%`
    },
    {
      title: "Networking Opportunities",
      description: `${connectionsCount} alumni in your target companies available for connections`,
      trend: "New"
    },
    {
      title: "Skill Recommendations",
      description: "Cloud Computing skills show higher job match rate",
      trend: `+${skillMatchPercent}%`
    }
  ];

  // Professional Loader for AI Hub
  const ProfessionalLoader = () => (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-muted/50 rounded-lg animate-pulse"></div>
        <div className="h-9 w-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md animate-pulse"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="professional-card">
          <CardContent className="p-6 space-y-4">
            <div className="h-6 w-40 bg-muted/50 rounded animate-pulse"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-muted/40 rounded animate-pulse"></div>
                  <div className="h-4 w-8 bg-muted/40 rounded animate-pulse"></div>
                </div>
                <div className="h-2 bg-gradient-to-r from-primary/20 to-transparent rounded animate-pulse"></div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="professional-card lg:col-span-2">
          <CardContent className="p-6 space-y-4">
            <div className="h-6 w-32 bg-muted/50 rounded animate-pulse"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-3 rounded-lg bg-surface border border-border">
                <div className="h-5 w-48 bg-gradient-to-r from-primary/20 to-transparent rounded animate-pulse mb-2"></div>
                <div className="h-4 w-64 bg-muted/40 rounded animate-pulse"></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid w-full grid-cols-3 gap-1 bg-muted/30 rounded-lg p-1">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-9 bg-muted/50 rounded-md animate-pulse"></div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="professional-card">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-5 w-40 bg-muted/50 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-muted/40 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="h-4 w-full bg-muted/40 rounded animate-pulse"></div>
              <div className="flex justify-between items-center">
                <div className="h-3 w-24 bg-muted/30 rounded animate-pulse"></div>
                <div className="h-8 w-16 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center py-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
          <div className="text-sm font-medium text-foreground">Loading AI features</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {isLoading ? (
            <ProfessionalLoader />
          ) : (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Bot className="h-6 w-6" />
                  AI Hub
                  <Badge variant="secondary" className="ml-2">Beta</Badge>
                </h1>
                <Button className="alma-gradient text-primary-foreground">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get AI Insights
                </Button>
              </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* AI Usage Stats */}
              <Card className="professional-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5" />
                    AI Usage This Month
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Career Insights</span>
                      <span>{careerInsightsPercent}%</span>
                    </div>
                    <Progress value={careerInsightsPercent} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mentorship Matching</span>
                      <span>{mentorshipPercent}%</span>
                    </div>
                    <Progress value={mentorshipPercent} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Resume Analysis</span>
                      <span>{resumePercent}%</span>
                    </div>
                    <Progress value={resumePercent} className="h-2" />
                  </div>
                  <div className="pt-2 text-xs text-muted-foreground">
                    Next reset in 12 days
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card className="professional-card lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Brain className="h-5 w-5" />
                    Smart Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start justify-between p-3 rounded-lg bg-surface border border-border">
                      <div className="space-y-1">
                        <h4 className="font-medium text-foreground">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        {insight.trend}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="features" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">AI Features</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {aiFeatures.map((feature) => (
                    <Card key={feature.id} className="professional-card">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{feature.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant={feature.status === 'active' ? 'secondary' : 'outline'}>
                                  {feature.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{feature.usage}</span>
                          <Button size="sm" className="alma-gradient text-primary-foreground">
                            Try Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card className="professional-card">
                  <CardHeader>
                    <CardTitle>Recent AI Activities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-surface border border-border">
                        <div className="p-1 rounded-full bg-primary/10">
                          <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="professional-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Success Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground">{successRate}%</div>
                      <p className="text-sm text-muted-foreground">AI recommendations accuracy</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="professional-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Time Saved</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground">{timeSaved}h</div>
                      <p className="text-sm text-muted-foreground">Average hours saved per user</p>
                    </CardContent>
                  </Card>

                  <Card className="professional-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Connections Made</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground">{connectionsMade.toLocaleString()}</div>
                      <p className="text-sm text-muted-foreground">Through AI matching</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AIHub;