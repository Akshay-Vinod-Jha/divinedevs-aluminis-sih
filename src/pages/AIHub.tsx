import { Bot, Sparkles, MessageSquare, FileText, Users, TrendingUp, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const AIHub = () => {
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
      description: "Top career transitions: Engineering → Product Management (34%)",
      trend: "+12%"
    },
    {
      title: "Networking Opportunities",
      description: "5 alumni in your target companies available for connections",
      trend: "New"
    },
    {
      title: "Skill Recommendations",
      description: "Cloud Computing skills show 89% higher job match rate",
      trend: "+89%"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
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
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mentorship Matching</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Resume Analysis</span>
                      <span>43%</span>
                    </div>
                    <Progress value={43} className="h-2" />
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
                      <div className="text-3xl font-bold text-foreground">94%</div>
                      <p className="text-sm text-muted-foreground">AI recommendations accuracy</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="professional-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Time Saved</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground">12.5h</div>
                      <p className="text-sm text-muted-foreground">Average hours saved per user</p>
                    </CardContent>
                  </Card>

                  <Card className="professional-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Connections Made</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground">347</div>
                      <p className="text-sm text-muted-foreground">Through AI matching</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIHub;