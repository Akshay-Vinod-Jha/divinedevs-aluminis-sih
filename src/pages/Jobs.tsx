import { Briefcase, MapPin, DollarSign, Clock, Search, Filter, Plus, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useState, useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import { PageLayout, AnimatedCard, StaggeredList } from "@/components/animations/PageAnimations";

const Jobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen } = useSidebar();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      salary: "$150k - $200k",
      type: "Full-time",
      posted: "2 days ago",
      description: "Join our team building next-generation cloud infrastructure...",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      logo: "/api/placeholder/48/48",
      applicants: 24,
      referralAvailable: true
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      salary: "$140k - $180k",
      type: "Full-time",
      posted: "1 week ago",
      description: "Lead product strategy for our enterprise solutions...",
      skills: ["Product Strategy", "Analytics", "Leadership"],
      logo: "/api/placeholder/48/48",
      applicants: 45,
      referralAvailable: false
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Meta",
      location: "Menlo Park, CA",
      salary: "$130k - $170k",
      type: "Full-time",
      posted: "3 days ago",
      description: "Apply machine learning to solve complex business problems...",
      skills: ["Python", "ML", "Statistics", "SQL"],
      logo: "/api/placeholder/48/48",
      applicants: 18,
      referralAvailable: true
    },
    {
      id: 4,
      title: "UX Designer",
      company: "Adobe",
      location: "San Francisco, CA",
      salary: "$110k - $140k",
      type: "Contract",
      posted: "5 days ago",
      description: "Design intuitive user experiences for creative tools...",
      skills: ["Figma", "Prototyping", "User Research"],
      logo: "/api/placeholder/48/48",
      applicants: 32,
      referralAvailable: true
    }
  ];

  const appliedJobs = [jobs[0], jobs[2]];
  const savedJobs = [jobs[1], jobs[3]];

  // Professional Loader for Jobs
  const ProfessionalLoader = () => (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-24 bg-muted/50 rounded-lg animate-pulse"></div>
        <div className="h-9 w-24 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md animate-pulse"></div>
      </div>

      <div className="flex gap-4">
        <div className="h-10 flex-1 bg-muted/50 rounded-md animate-pulse"></div>
        <div className="h-10 w-32 bg-muted/50 rounded-md animate-pulse"></div>
        <div className="h-10 w-24 bg-muted/50 rounded-md animate-pulse"></div>
      </div>

      <div className="grid w-full grid-cols-4 gap-1 bg-muted/30 rounded-lg p-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-9 bg-muted/50 rounded-md animate-pulse"></div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="h-5 w-32 bg-muted/50 rounded animate-pulse"></div>
        <div className="h-6 w-20 bg-muted/50 rounded-full animate-pulse"></div>
      </div>

      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="professional-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg animate-pulse"></div>
                  <div className="flex-1 space-y-3">
                    <div className="space-y-2">
                      <div className="h-6 w-48 bg-muted/50 rounded animate-pulse"></div>
                      <div className="h-4 w-32 bg-muted/40 rounded animate-pulse"></div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-4 w-24 bg-muted/40 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-muted/40 rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-muted/40 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-full bg-muted/40 rounded animate-pulse"></div>
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-6 w-16 bg-muted/30 rounded animate-pulse"></div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-3 w-40 bg-muted/30 rounded animate-pulse"></div>
                      <div className="flex gap-2">
                        <div className="h-8 w-12 bg-muted/50 rounded-md animate-pulse"></div>
                        <div className="h-8 w-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center py-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
          <div className="text-sm font-medium text-foreground">Loading jobs</div>
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
              title="Jobs" 
              subtitle="Discover career opportunities posted by fellow alumni"
              className="max-w-6xl mx-auto"
            >
              <AnimatedCard delay={200}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold">Career Center</span>
                  </div>
                  <Button className="alma-gradient text-primary-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Job
                  </Button>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={400}>
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search jobs by title, company, or skills..." className="pl-10" />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Location" className="pl-10 w-48" />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={600}>
                <Tabs defaultValue="all-jobs" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all-jobs">All Jobs</TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
              </TabsList>

              <TabsContent value="all-jobs" className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Showing {jobs.length} jobs</p>
                  <Badge variant="secondary">8 new jobs this week</Badge>
                </div>
                <StaggeredList className="space-y-4" delay={800}>
                  {jobs.map((job) => (
                    <Card key={job.id} className="professional-card">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-4 flex-1">
                            <Avatar className="h-12 w-12 alma-shadow">
                              <AvatarImage src={job.logo} />
                              <AvatarFallback>
                                <Building className="h-6 w-6" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
                                  <p className="text-muted-foreground">{job.company}</p>
                                </div>
                                {job.referralAvailable && (
                                  <Badge variant="secondary" className="bg-success/10 text-success">
                                    Referral Available
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {job.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  {job.salary}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {job.type}
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground">{job.description}</p>

                              <div className="flex flex-wrap gap-2">
                                {job.skills.map((skill) => (
                                  <Badge key={skill} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center justify-between pt-2">
                                <div className="text-xs text-muted-foreground">
                                  {job.applicants} applicants • Posted {job.posted}
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    Save
                                  </Button>
                                  <Button size="sm" className="alma-gradient text-primary-foreground">
                                    Apply Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </StaggeredList>
              </TabsContent>

              <TabsContent value="applied" className="space-y-4">
                <p className="text-muted-foreground">Jobs you've applied to ({appliedJobs.length})</p>
                <StaggeredList className="space-y-4" delay={1000}>
                  {appliedJobs.map((job) => (
                    <Card key={job.id} className="professional-card">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-4 flex-1">
                            <Avatar className="h-12 w-12 alma-shadow">
                              <AvatarImage src={job.logo} />
                              <AvatarFallback>
                                <Building className="h-6 w-6" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
                                  <p className="text-muted-foreground">{job.company}</p>
                                </div>
                                <Badge variant="secondary" className="bg-primary/10 text-primary">
                                  Applied
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Applied {job.posted} • Status: Under Review
                              </div>
                              <Button variant="outline" size="sm">
                                View Application
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </StaggeredList>
              </TabsContent>

              <TabsContent value="saved" className="space-y-4">
                <p className="text-muted-foreground">Saved jobs ({savedJobs.length})</p>
                <StaggeredList className="space-y-4" delay={1200}>
                  {savedJobs.map((job) => (
                    <Card key={job.id} className="professional-card">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-4 flex-1">
                            <Avatar className="h-12 w-12 alma-shadow">
                              <AvatarImage src={job.logo} />
                              <AvatarFallback>
                                <Building className="h-6 w-6" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
                              <p className="text-muted-foreground">{job.company}</p>
                              <div className="flex gap-2">
                                <Button size="sm" className="alma-gradient text-primary-foreground">
                                  Apply Now
                                </Button>
                                <Button variant="outline" size="sm">
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </StaggeredList>
              </TabsContent>

              <TabsContent value="recommended" className="space-y-4">
                <div className="text-center py-12">
                  <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No recommendations yet</h3>
                  <p className="text-muted-foreground">Complete your profile to get personalized job recommendations</p>
                  <Button className="mt-4">Complete Profile</Button>
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

export default Jobs;