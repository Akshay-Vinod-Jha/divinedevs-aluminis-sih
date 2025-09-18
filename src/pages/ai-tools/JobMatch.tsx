import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const JobMatch = () => {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Dummy job data
  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      level: "Senior",
      salary: "$150K - $200K",
      posted: "2 days ago",
      applicants: 45,
      match: 95,
      description:
        "Join our engineering team to build scalable web applications using React and Node.js.",
      requirements: ["5+ years React", "Node.js experience", "AWS knowledge"],
      benefits: ["Health insurance", "401k", "Remote work", "Stock options"],
      companySize: "500-1000",
      industry: "Technology",
      remote: true,
      skills: ["React", "Node.js", "AWS", "TypeScript"],
      companyLogo: "/api/placeholder/48/48",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateLabs",
      location: "New York, NY",
      type: "Full-time",
      level: "Mid",
      salary: "$120K - $160K",
      posted: "1 day ago",
      applicants: 32,
      match: 88,
      description:
        "Lead product strategy and development for our mobile applications.",
      requirements: ["3+ years PM experience", "Mobile products", "Analytics"],
      benefits: ["Health insurance", "Flexible PTO", "Learning budget"],
      companySize: "100-500",
      industry: "Technology",
      remote: false,
      skills: ["Product Strategy", "Analytics", "Mobile", "Agile"],
      companyLogo: "/api/placeholder/48/48",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "DataDriven Inc",
      location: "Seattle, WA",
      type: "Full-time",
      level: "Senior",
      salary: "$140K - $180K",
      posted: "3 days ago",
      applicants: 28,
      match: 92,
      description:
        "Apply machine learning techniques to solve complex business problems.",
      requirements: [
        "PhD or Masters",
        "Python/R",
        "ML frameworks",
        "5+ years experience",
      ],
      benefits: ["Health insurance", "Research time", "Conference budget"],
      companySize: "200-500",
      industry: "Technology",
      remote: true,
      skills: ["Python", "Machine Learning", "TensorFlow", "Statistics"],
      companyLogo: "/api/placeholder/48/48",
    },
    {
      id: 4,
      title: "UX Designer",
      company: "DesignStudio",
      location: "Austin, TX",
      type: "Contract",
      level: "Mid",
      salary: "$80 - $120/hr",
      posted: "5 days ago",
      applicants: 67,
      match: 85,
      description:
        "Design intuitive user experiences for our flagship SaaS product.",
      requirements: ["3+ years UX", "Figma proficiency", "User research"],
      benefits: ["Flexible hours", "Remote work", "Creative freedom"],
      companySize: "50-100",
      industry: "Design",
      remote: true,
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      companyLogo: "/api/placeholder/48/48",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesLocation =
      selectedLocation === "all" || job.location.includes(selectedLocation);
    const matchesLevel = selectedLevel === "all" || job.level === selectedLevel;
    return matchesSearch && matchesLocation && matchesLevel;
  });

  const handleSaveJob = (jobId: number) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );

    toast({
      title: savedJobs.includes(jobId) ? "Job Removed" : "Job Saved!",
      description: savedJobs.includes(jobId)
        ? "Job removed from your saved list."
        : "Job added to your saved list.",
    });
  };

  const handleApplyJob = (jobId: number, jobTitle: string) => {
    toast({
      title: "Application Started!",
      description: `Redirecting to application portal for ${jobTitle}...`,
    });
  };

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsAnalyzing(false);
    toast({
      title: "AI Analysis Complete!",
      description:
        "Updated job recommendations based on your skills and preferences.",
    });
  };

  if (isLoading) {
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
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      Analyzing Job Market
                    </h3>
                    <p className="text-muted-foreground">
                      AI is finding the perfect opportunities for you...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/ai-hub")}
                className="shrink-0"
              >
                ←
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Job Match</h1>
                <p className="text-muted-foreground">
                  AI-powered job recommendations
                </p>
              </div>
            </div>

            <Tabs defaultValue="recommendations" className="space-y-6">
              <TabsList>
                <TabsTrigger value="recommendations">
                  AI Recommendations
                </TabsTrigger>
                <TabsTrigger value="saved">
                  Saved Jobs ({savedJobs.length})
                </TabsTrigger>
                <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations" className="space-y-6">
                {/* AI Analysis Card */}
                <Card className="professional-card border-green-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">
                          AI Job Matching
                        </h3>
                        <p className="text-muted-foreground">
                          Personalized recommendations based on your skills and
                          career goals
                        </p>
                      </div>
                      <Button
                        onClick={runAIAnalysis}
                        disabled={isAnalyzing}
                        className="alma-gradient text-primary-foreground"
                      >
                        {isAnalyzing ? (
                          <>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            Update Matches
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Filters */}
                <Card className="professional-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Search jobs, companies, or skills..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Select
                          value={selectedLocation}
                          onValueChange={setSelectedLocation}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="San Francisco">
                              San Francisco
                            </SelectItem>
                            <SelectItem value="New York">New York</SelectItem>
                            <SelectItem value="Seattle">Seattle</SelectItem>
                            <SelectItem value="Austin">Austin</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={selectedLevel}
                          onValueChange={setSelectedLevel}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="Entry">Entry</SelectItem>
                            <SelectItem value="Mid">Mid</SelectItem>
                            <SelectItem value="Senior">Senior</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Job Cards */}
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <Card
                      key={job.id}
                      className="professional-card hover:shadow-lg transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="space-y-3 flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold">
                                    {job.title}
                                  </h3>
                                  <p className="text-muted-foreground">
                                    {job.company}
                                  </p>
                                </div>
                                <Badge className="bg-green-500/10 text-green-600">
                                  {job.match}% Match
                                </Badge>
                              </div>

                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  {job.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  {job.type}
                                </div>
                                <div className="flex items-center gap-1">
                                  {job.salary}
                                </div>
                                <div className="flex items-center gap-1">
                                  {job.applicants} applicants
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground">
                                {job.description}
                              </p>

                              <div className="space-y-2">
                                <p className="text-sm font-medium">
                                  Required Skills:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {job.skills.map((skill, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm font-medium">
                                  Match Analysis:
                                </p>
                                <Progress value={job.match} className="h-2" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                          <div className="text-sm text-muted-foreground">
                            Posted {job.posted}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSaveJob(job.id)}
                              className={
                                savedJobs.includes(job.id) ? "text-red-600" : ""
                              }
                            >
                              {savedJobs.includes(job.id) ? "♥" : "♡"}
                              {savedJobs.includes(job.id) ? "Saved" : "Save"}
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    {job.title} at {job.company}
                                  </DialogTitle>
                                  <DialogDescription>
                                    {job.location} • {job.type} • {job.match}%
                                    Match
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Job Description
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {job.description}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Requirements
                                    </h4>
                                    <ul className="text-sm text-muted-foreground list-disc list-inside">
                                      {job.requirements.map((req, index) => (
                                        <li key={index}>{req}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Benefits
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                      {job.benefits.map((benefit, index) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {benefit}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="font-medium">
                                        Company Size:
                                      </span>{" "}
                                      {job.companySize}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Industry:
                                      </span>{" "}
                                      {job.industry}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Remote Work:
                                      </span>{" "}
                                      {job.remote ? "Yes" : "No"}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Experience Level:
                                      </span>{" "}
                                      {job.level}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              onClick={() => handleApplyJob(job.id, job.title)}
                              className="alma-gradient text-primary-foreground"
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="saved">
                <Card className="professional-card">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">Saved Jobs</h3>
                    <p className="text-muted-foreground">
                      {savedJobs.length === 0
                        ? "No saved jobs yet. Start saving jobs from the recommendations tab!"
                        : `You have ${savedJobs.length} saved job(s).`}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applied">
                <Card className="professional-card">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">Applied Jobs</h3>
                    <p className="text-muted-foreground">
                      Track your job applications and their status here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobMatch;
