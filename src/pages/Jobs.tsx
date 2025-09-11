import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Search,
  Filter,
  Plus,
  Building,
  Bookmark,
  BookmarkCheck,
  Share2,
  ExternalLink,
  MoreHorizontal,
  Map,
  Navigation,
  Eye,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useState, useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import {
  PageLayout,
  AnimatedCard,
  StaggeredList,
} from "@/components/animations/PageAnimations";

const Jobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      salary: "$150k - $200k",
      type: "Full-time",
      posted: "2 days ago",
      description:
        "Join our team building next-generation cloud infrastructure. We're looking for experienced engineers passionate about scalable systems.",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      logo: "/api/placeholder/48/48",
      applicants: 24,
      referralAvailable: true,
      isApplied: false,
      isSaved: false,
      remote: false,
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      salary: "$140k - $180k",
      type: "Full-time",
      posted: "1 week ago",
      description:
        "Lead product strategy for our enterprise solutions. Drive innovation in cloud computing and AI technologies.",
      skills: ["Product Strategy", "Analytics", "Leadership"],
      logo: "/api/placeholder/48/48",
      applicants: 45,
      referralAvailable: false,
      isApplied: true,
      isSaved: false,
      remote: true,
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Meta",
      location: "Menlo Park, CA",
      salary: "$130k - $170k",
      type: "Full-time",
      posted: "3 days ago",
      description:
        "Apply machine learning to solve complex business problems. Work with cutting-edge AI technologies and massive datasets.",
      skills: ["Python", "ML", "Statistics", "SQL"],
      logo: "/api/placeholder/48/48",
      applicants: 18,
      referralAvailable: true,
      isApplied: false,
      isSaved: true,
      remote: false,
    },
    {
      id: 4,
      title: "UX Designer",
      company: "Adobe",
      location: "San Francisco, CA",
      salary: "$110k - $140k",
      type: "Contract",
      posted: "5 days ago",
      description:
        "Design intuitive user experiences for creative tools. Collaborate with cross-functional teams to deliver exceptional products.",
      skills: ["Figma", "Prototyping", "User Research"],
      logo: "/api/placeholder/48/48",
      applicants: 32,
      referralAvailable: true,
      isApplied: false,
      isSaved: false,
      remote: true,
    },
  ]);
  const { isOpen } = useSidebar();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Predefined locations for dummy map functionality
  const popularLocations = [
    "San Francisco, CA",
    "New York, NY",
    "Seattle, WA",
    "Boston, MA",
    "Austin, TX",
    "Los Angeles, CA",
    "Chicago, IL",
    "Denver, CO",
    "Remote",
    "Hybrid",
  ];

  // Filter jobs based on search and location
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesLocation =
      !locationQuery ||
      job.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
      (locationQuery.toLowerCase() === "remote" && job.remote);

    return matchesSearch && matchesLocation;
  });

  const appliedJobs = filteredJobs.filter((job) => job.isApplied);
  const savedJobs = filteredJobs.filter((job) => job.isSaved);
  const recommendedJobs = filteredJobs.filter((job) => job.referralAvailable);

  // Job action handlers
  const handleApplyJob = (jobId: number) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, isApplied: true, applicants: job.applicants + 1 }
          : job
      )
    );

    toast({
      title: "Application Submitted!",
      description: "Your application has been successfully submitted",
    });
  };

  const handleSaveJob = (jobId: number) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
      )
    );

    const job = jobs.find((j) => j.id === jobId);
    toast({
      title: job?.isSaved ? "Job Unsaved" : "Job Saved!",
      description: job?.isSaved
        ? "Job removed from saved jobs"
        : "Job added to your saved jobs",
    });
  };

  const handleShareJob = (job: any) => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `${job.title} at ${job.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Job link copied to clipboard",
      });
    }
  };

  const handleViewJob = (job: any) => {
    toast({
      title: "Opening Job Details",
      description: `Loading details for ${job.title} at ${job.company}...`,
    });
  };

  const handleLocationSelect = (location: string) => {
    setLocationQuery(location);
    setSelectedLocation(location);
    setShowLocationModal(false);

    toast({
      title: "Location Updated",
      description: `Now showing jobs in ${location}`,
    });
  };

  // Dummy Google Maps-like component
  const LocationMapModal = () => (
    <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            Select Location
          </DialogTitle>
          <DialogDescription>
            Choose your preferred job location from the map or search below
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Dummy Map Interface */}
          <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-green-100/20"></div>
            <div className="text-center z-10">
              <Map className="h-12 w-12 mx-auto mb-2 text-blue-500" />
              <p className="text-sm text-muted-foreground">
                Interactive Map View
              </p>
              <p className="text-xs text-muted-foreground">
                Click on locations below to simulate selection
              </p>
            </div>

            {/* Dummy map pins */}
            <div
              className="absolute top-4 left-8 w-4 h-4 bg-red-500 rounded-full animate-pulse cursor-pointer"
              onClick={() => handleLocationSelect("San Francisco, CA")}
            ></div>
            <div
              className="absolute top-12 right-12 w-4 h-4 bg-red-500 rounded-full animate-pulse cursor-pointer"
              onClick={() => handleLocationSelect("New York, NY")}
            ></div>
            <div
              className="absolute bottom-8 left-16 w-4 h-4 bg-red-500 rounded-full animate-pulse cursor-pointer"
              onClick={() => handleLocationSelect("Seattle, WA")}
            ></div>
          </div>

          {/* Search Location */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for a location..."
              className="pl-10"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
          </div>

          {/* Popular Locations */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Popular Locations</Label>
            <div className="grid grid-cols-2 gap-2">
              {popularLocations.map((location) => (
                <Button
                  key={location}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-2 px-3"
                  onClick={() => handleLocationSelect(location)}
                >
                  <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span className="truncate">{location}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowLocationModal(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => handleLocationSelect(selectedLocation)}
            className="alma-gradient text-primary-foreground"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Apply Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

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
          <div
            key={i}
            className="h-9 bg-muted/50 rounded-md animate-pulse"
          ></div>
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
                        <div
                          key={j}
                          className="h-6 w-16 bg-muted/30 rounded animate-pulse"
                        ></div>
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
          <div className="text-sm font-medium text-foreground">
            Loading jobs
          </div>
        </div>
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
                  <Dialog open={postJobOpen} onOpenChange={setPostJobOpen}>
                    <DialogTrigger asChild>
                      <Button className="alma-gradient text-primary-foreground">
                        <Plus className="h-4 w-4 mr-2" />
                        Post Job
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Post a New Job</DialogTitle>
                        <DialogDescription>
                          Share job opportunities with the alumni network.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Input placeholder="Job Title" />
                        <Input placeholder="Company Name" />
                        <Input placeholder="Location" />
                        <Input placeholder="Salary Range (e.g., $80k - $120k)" />
                        <Input placeholder="Job Type (Full-time, Part-time, Contract)" />
                        <Textarea placeholder="Job Description" rows={3} />
                        <Input placeholder="Required Skills (comma separated)" />
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          className="alma-gradient text-primary-foreground"
                          onClick={() => {
                            toast({
                              title: "Job Posted!",
                              description:
                                "Your job posting is now live and visible to alumni",
                            });
                            setPostJobOpen(false);
                          }}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Post Job
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={400}>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search jobs by title, company, or skills..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="relative flex-1 sm:flex-none">
                    <Button
                      variant="outline"
                      className="w-full sm:w-48 justify-start text-left"
                      onClick={() => setShowLocationModal(true)}
                    >
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <span className="pl-7 truncate">
                        {locationQuery || "Select Location"}
                      </span>
                      <Map className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>All jobs</DropdownMenuItem>
                      <DropdownMenuItem>Full-time</DropdownMenuItem>
                      <DropdownMenuItem>Part-time</DropdownMenuItem>
                      <DropdownMenuItem>Contract</DropdownMenuItem>
                      <DropdownMenuItem>Remote</DropdownMenuItem>
                      <DropdownMenuItem>Entry level</DropdownMenuItem>
                      <DropdownMenuItem>Senior level</DropdownMenuItem>
                      <DropdownMenuItem>With referrals</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <LocationMapModal />
              </AnimatedCard>

              <AnimatedCard delay={600}>
                <Tabs defaultValue="all-jobs" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                    <TabsTrigger
                      value="all-jobs"
                      className="text-xs sm:text-sm"
                    >
                      All Jobs
                    </TabsTrigger>
                    <TabsTrigger value="applied" className="text-xs sm:text-sm">
                      Applied
                    </TabsTrigger>
                    <TabsTrigger value="saved" className="text-xs sm:text-sm">
                      Saved
                    </TabsTrigger>
                    <TabsTrigger
                      value="recommended"
                      className="text-xs sm:text-sm"
                    >
                      Recommended
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all-jobs" className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <p className="text-muted-foreground">
                        Showing {filteredJobs.length} jobs
                        {searchQuery && ` for "${searchQuery}"`}
                        {locationQuery && ` in ${locationQuery}`}
                      </p>
                      <Badge variant="secondary">
                        {
                          filteredJobs.filter((job) =>
                            job.posted.includes("day")
                          ).length
                        }{" "}
                        new jobs this week
                      </Badge>
                    </div>
                    <StaggeredList className="space-y-4" delay={800}>
                      {filteredJobs.map((job) => (
                        <Card
                          key={job.id}
                          className="professional-card hover:shadow-lg transition-all duration-300"
                        >
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                              <div className="flex gap-4 flex-1">
                                <Avatar className="h-12 w-12 alma-shadow flex-shrink-0">
                                  <AvatarImage src={job.logo} />
                                  <AvatarFallback>
                                    <Building className="h-6 w-6" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                    <div className="min-w-0">
                                      <h3 className="font-semibold text-lg text-foreground truncate">
                                        {job.title}
                                      </h3>
                                      <p className="text-muted-foreground truncate">
                                        {job.company}
                                      </p>
                                    </div>
                                    <div className="flex gap-2">
                                      {job.remote && (
                                        <Badge
                                          variant="secondary"
                                          className="bg-green-100 text-green-700 flex-shrink-0"
                                        >
                                          Remote
                                        </Badge>
                                      )}
                                      {job.referralAvailable && (
                                        <Badge
                                          variant="secondary"
                                          className="bg-success/10 text-success flex-shrink-0"
                                        >
                                          Referral Available
                                        </Badge>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap gap-2 sm:gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      <span className="truncate">
                                        {job.location}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <DollarSign className="h-4 w-4" />
                                      <span className="truncate">
                                        {job.salary}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{job.type}</span>
                                    </div>
                                  </div>

                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {job.description}
                                  </p>

                                  <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill) => (
                                      <Badge
                                        key={skill}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>

                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                                    <div className="text-xs text-muted-foreground">
                                      {job.applicants} applicants • Posted{" "}
                                      {job.posted}
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 sm:flex-none"
                                        onClick={() => handleSaveJob(job.id)}
                                      >
                                        {job.isSaved ? (
                                          <BookmarkCheck className="h-4 w-4" />
                                        ) : (
                                          <Bookmark className="h-4 w-4" />
                                        )}
                                      </Button>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="outline" size="sm">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem
                                            onClick={() => handleViewJob(job)}
                                          >
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Details
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={() => handleShareJob(job)}
                                          >
                                            <Share2 className="h-4 w-4 mr-2" />
                                            Share Job
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={() =>
                                              handleSaveJob(job.id)
                                            }
                                          >
                                            {job.isSaved ? (
                                              <>
                                                <BookmarkCheck className="h-4 w-4 mr-2" />
                                                Unsave
                                              </>
                                            ) : (
                                              <>
                                                <Bookmark className="h-4 w-4 mr-2" />
                                                Save
                                              </>
                                            )}
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                      <Button
                                        size="sm"
                                        className="alma-gradient text-primary-foreground flex-1 sm:flex-none"
                                        onClick={() => handleApplyJob(job.id)}
                                        disabled={job.isApplied}
                                      >
                                        {job.isApplied
                                          ? "Applied"
                                          : "Apply Now"}
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
                    {filteredJobs.length === 0 && (
                      <div className="text-center py-12">
                        <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          No jobs found
                        </h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search criteria or location
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => {
                            setSearchQuery("");
                            setLocationQuery("");
                          }}
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="applied" className="space-y-4">
                    <p className="text-muted-foreground">
                      Jobs you've applied to ({appliedJobs.length})
                    </p>
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
                                      <h3 className="font-semibold text-lg text-foreground">
                                        {job.title}
                                      </h3>
                                      <p className="text-muted-foreground">
                                        {job.company}
                                      </p>
                                    </div>
                                    <Badge
                                      variant="secondary"
                                      className="bg-primary/10 text-primary"
                                    >
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
                    <p className="text-muted-foreground">
                      Saved jobs ({savedJobs.length})
                    </p>
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
                                  <h3 className="font-semibold text-lg text-foreground">
                                    {job.title}
                                  </h3>
                                  <p className="text-muted-foreground">
                                    {job.company}
                                  </p>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      className="alma-gradient text-primary-foreground"
                                    >
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No recommendations yet
                      </h3>
                      <p className="text-muted-foreground">
                        Complete your profile to get personalized job
                        recommendations
                      </p>
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
