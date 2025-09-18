import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const MentorRecommendation = () => {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Dummy mentor data
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      batch: "Class of 2015",
      experience: "8+ years",
      field: "Technology",
      location: "San Francisco, CA",
      rating: 4.9,
      sessions: 127,
      expertise: ["AI/ML", "Career Growth", "Technical Leadership"],
      bio: "Passionate about helping junior engineers grow their careers in tech. Specialized in AI/ML and leadership development.",
      avatar: "/api/placeholder/64/64",
      compatibility: 95,
      responseTime: "2 hours",
      languages: ["English", "Mandarin"],
      mentorshipStyle: "Goal-oriented",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Product Manager",
      company: "Microsoft",
      batch: "Class of 2018",
      experience: "5+ years",
      field: "Product",
      location: "Seattle, WA",
      rating: 4.8,
      sessions: 89,
      expertise: ["Product Strategy", "User Research", "Team Management"],
      bio: "Helping aspiring PMs navigate the transition from engineering to product management.",
      avatar: "/api/placeholder/64/64",
      compatibility: 88,
      responseTime: "4 hours",
      languages: ["English", "Spanish"],
      mentorshipStyle: "Collaborative",
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      title: "Data Science Director",
      company: "Netflix",
      batch: "Class of 2012",
      experience: "10+ years",
      field: "Data Science",
      location: "Los Angeles, CA",
      rating: 4.9,
      sessions: 156,
      expertise: ["Data Science", "ML Engineering", "Team Leadership"],
      bio: "Experienced data scientist passionate about mentoring the next generation of data professionals.",
      avatar: "/api/placeholder/64/64",
      compatibility: 92,
      responseTime: "6 hours",
      languages: ["English", "Hindi"],
      mentorshipStyle: "Structured",
    },
    {
      id: 4,
      name: "James Wilson",
      title: "Startup Founder",
      company: "TechStart Inc.",
      batch: "Class of 2010",
      experience: "12+ years",
      field: "Entrepreneurship",
      location: "Austin, TX",
      rating: 4.7,
      sessions: 203,
      expertise: ["Entrepreneurship", "Fundraising", "Business Strategy"],
      bio: "Serial entrepreneur with 3 successful exits. Love helping others build their dream companies.",
      avatar: "/api/placeholder/64/64",
      compatibility: 85,
      responseTime: "12 hours",
      languages: ["English"],
      mentorshipStyle: "Practical",
    },
  ];

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesField = selectedField === "all" || mentor.field === selectedField;
    const matchesExperience = selectedExperience === "all" || mentor.experience.includes(selectedExperience);
    return matchesSearch && matchesField && matchesExperience;
  });

  const handleRequestMentorship = async (mentorId: number, mentorName: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI matching process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsAnalyzing(false);
    toast({
      title: "Mentorship Request Sent!",
      description: `Your request has been sent to ${mentorName}. They typically respond within their usual timeframe.`,
    });
  };

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsAnalyzing(false);
    toast({
      title: "AI Analysis Complete!",
      description: "Updated mentor recommendations based on your profile and career goals.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className={`flex transition-all duration-300 ${isOpen ? "" : "ml-0"}`}>
          <Sidebar />
          <main className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${isOpen ? "" : "max-w-full"}`}>
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Analyzing Your Profile</h3>
                    <p className="text-muted-foreground">AI is finding the perfect mentors for you...</p>
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
      <div className={`flex transition-all duration-300 ${isOpen ? "" : "ml-0"}`}>
        <Sidebar />
        <main className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${isOpen ? "" : "max-w-full"}`}>
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
                <h1 className="text-2xl font-bold">Mentor Recommendation</h1>
                <p className="text-muted-foreground">AI-powered matching with ideal mentors</p>
              </div>
            </div>

            {/* AI Analysis Card */}
            <Card className="professional-card border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">AI Compatibility Analysis</h3>
                    <p className="text-muted-foreground">
                      Based on your profile, career goals, and preferences
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
                        Run AI Analysis
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
                      placeholder="Search mentors, companies, or expertise..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedField} onValueChange={setSelectedField}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fields</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Experience</SelectItem>
                        <SelectItem value="5+">5+ years</SelectItem>
                        <SelectItem value="8+">8+ years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mentor Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="professional-card hover:shadow-lg transition-all duration-300">
                  <CardHeader className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{mentor.name}</h3>
                          <Badge className="bg-green-500/10 text-green-600">
                            {mentor.compatibility}% Match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{mentor.title}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{mentor.company}</Badge>
                          <Badge variant="outline">{mentor.batch}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-4">
                    <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span>{mentor.rating} ({mentor.sessions} sessions)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Responds in {mentor.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{mentor.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{mentor.mentorshipStyle}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Expertise:</p>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Compatibility Analysis:</p>
                      <Progress value={mentor.compatibility} className="h-2" />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1">
                            View Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Mentor Profile - {mentor.name}</DialogTitle>
                            <DialogDescription>
                              Detailed information about this mentor
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-20 w-20">
                                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                                <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-xl font-semibold">{mentor.name}</h3>
                                <p className="text-muted-foreground">{mentor.title} at {mentor.company}</p>
                                <p className="text-sm text-muted-foreground">{mentor.batch} • {mentor.experience}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium">Languages:</p>
                                <p className="text-sm text-muted-foreground">{mentor.languages.join(", ")}</p>
                              </div>
                              <div>
                                <p className="font-medium">Mentorship Style:</p>
                                <p className="text-sm text-muted-foreground">{mentor.mentorshipStyle}</p>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">Biography:</p>
                              <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        onClick={() => handleRequestMentorship(mentor.id, mentor.name)}
                        disabled={isAnalyzing}
                        className="flex-1 alma-gradient text-primary-foreground"
                      >
                        {isAnalyzing ? (
                          "Processing..."
                        ) : (
                          "Request Mentorship"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredMentors.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No mentors found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MentorRecommendation;