import { Users, UserPlus, Search, Filter, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { PageLayout, AnimatedCard, StaggeredList } from "@/components/animations/PageAnimations";
import { useState, useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import CountingNumber from "@/components/ui/counting-number";

const Network = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen } = useSidebar();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const connections = [
    {
      id: 1,
      name: "Alex Chen",
      title: "Software Engineer at Microsoft",
      batch: "2019",
      mutual: 8,
      location: "Seattle, WA",
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Product Manager at Google",
      batch: "2018",
      mutual: 12,
      location: "Mountain View, CA",
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 3,
      name: "John Davis",
      title: "Data Scientist at Meta",
      batch: "2020",
      mutual: 5,
      location: "Menlo Park, CA",
      avatar: "/api/placeholder/64/64"
    }
  ];

  const suggestions = [
    {
      id: 4,
      name: "Maria Rodriguez",
      title: "UX Designer at Adobe",
      batch: "2019",
      mutual: 3,
      location: "San Francisco, CA",
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 5,
      name: "David Kim",
      title: "Startup Founder",
      batch: "2017",
      mutual: 7,
      location: "Austin, TX",
      avatar: "/api/placeholder/64/64"
    }
  ];

  // Professional Loader for Network
  const ProfessionalLoader = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 bg-muted/50 rounded-lg animate-pulse"></div>
        <div className="h-9 w-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md animate-pulse"></div>
      </div>

      <div className="flex gap-4">
        <div className="h-10 flex-1 bg-muted/50 rounded-md animate-pulse"></div>
        <div className="h-10 w-24 bg-muted/50 rounded-md animate-pulse"></div>
      </div>

      <div className="grid w-full grid-cols-3 gap-1 bg-muted/30 rounded-lg p-1">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-9 bg-muted/50 rounded-md animate-pulse"></div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="h-5 w-32 bg-muted/50 rounded animate-pulse"></div>
        <div className="h-6 w-20 bg-muted/50 rounded-full animate-pulse"></div>
      </div>

      <div className="grid gap-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="professional-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-5 w-40 bg-muted/50 rounded animate-pulse"></div>
                    <div className="h-4 w-48 bg-muted/40 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-muted/40 rounded animate-pulse"></div>
                    <div className="h-4 w-32 bg-muted/40 rounded animate-pulse"></div>
                    <div className="h-3 w-28 bg-muted/30 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="h-8 w-20 bg-muted/50 rounded-md animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center py-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
          <div className="text-sm font-medium text-foreground">Loading network</div>
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
              title="My Network" 
              subtitle="Connect with fellow alumni and expand your professional network"
              className="max-w-4xl mx-auto"
            >
              <AnimatedCard delay={200}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold">Network Overview</span>
                  </div>
                  <Button className="alma-gradient text-primary-foreground">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Alumni
                  </Button>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={400}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card className="border-none shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">
                        <CountingNumber start={0} end={connections.length} duration={2000} />
                      </div>
                      <p className="text-sm opacity-90">Connections</p>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">
                        <CountingNumber start={0} end={12} duration={2000} />
                      </div>
                      <p className="text-sm opacity-90">Pending</p>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">
                        <CountingNumber start={0} end={8} duration={2000} />
                      </div>
                      <p className="text-sm opacity-90">Mutual</p>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">
                        <CountingNumber start={0} end={5} duration={2000} />
                      </div>
                      <p className="text-sm opacity-90">This Week</p>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={600}>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search alumni by name, company, or batch..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={800}>
                <Tabs defaultValue="connections" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="connections">Connections</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="invitations">Invitations</TabsTrigger>
              </TabsList>

              <TabsContent value="connections" className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">156 connections</p>
                  <Badge variant="secondary">12 new this week</Badge>
                </div>
                <StaggeredList className="grid gap-4" delay={1000}>
                  {connections.map((person) => (
                    <Card key={person.id} className="professional-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <Avatar className="h-16 w-16 alma-shadow">
                              <AvatarImage src={person.avatar} />
                              <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-foreground">{person.name}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Briefcase className="h-3 w-3" />
                                {person.title}
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <GraduationCap className="h-3 w-3" />
                                Class of {person.batch}
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {person.location}
                              </p>
                              <p className="text-xs text-muted-foreground">{person.mutual} mutual connections</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Message</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </StaggeredList>
              </TabsContent>

              <TabsContent value="suggestions" className="space-y-4">
                <p className="text-muted-foreground">People you may know</p>
                <StaggeredList className="grid gap-4" delay={1200}>
                  {suggestions.map((person) => (
                    <Card key={person.id} className="professional-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <Avatar className="h-16 w-16 alma-shadow">
                              <AvatarImage src={person.avatar} />
                              <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-foreground">{person.name}</h3>
                              <p className="text-sm text-muted-foreground">{person.title}</p>
                              <p className="text-sm text-muted-foreground">Class of {person.batch}</p>
                              <p className="text-sm text-muted-foreground">{person.location}</p>
                              <p className="text-xs text-muted-foreground">{person.mutual} mutual connections</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="alma-gradient text-primary-foreground">
                              <UserPlus className="h-4 w-4 mr-1" />
                              Connect
                            </Button>
                            <Button variant="outline" size="sm">Dismiss</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </StaggeredList>
              </TabsContent>

              <TabsContent value="invitations" className="space-y-4">
                <p className="text-muted-foreground">Pending invitations (2)</p>
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending invitations</p>
                </div>
              </TabsContent>
                </Tabs>
              </AnimatedCard>
            </PageLayout>
          )}
        </main>
      </div>
    </div>
  );
};

export default Network;