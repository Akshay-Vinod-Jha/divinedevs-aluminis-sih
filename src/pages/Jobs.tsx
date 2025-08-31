import { Briefcase, MapPin, DollarSign, Clock, Search, Filter, Plus, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const Jobs = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                Jobs
              </h1>
              <Button className="alma-gradient text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Post Job
              </Button>
            </div>

            <div className="flex gap-4">
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
                <div className="space-y-4">
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
                </div>
              </TabsContent>

              <TabsContent value="applied" className="space-y-4">
                <p className="text-muted-foreground">Jobs you've applied to ({appliedJobs.length})</p>
                <div className="space-y-4">
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
                </div>
              </TabsContent>

              <TabsContent value="saved" className="space-y-4">
                <p className="text-muted-foreground">Saved jobs ({savedJobs.length})</p>
                <div className="space-y-4">
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
                </div>
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Jobs;