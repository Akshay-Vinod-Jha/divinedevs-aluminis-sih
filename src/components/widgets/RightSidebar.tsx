import {
  Calendar,
  Briefcase,
  Users,
  TrendingUp,
  MapPin,
  Clock,
  Building,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";

// Custom hook for intersection observer animations
const useIntersectionAnimation = (threshold = 0.1, rootMargin = "0px") => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin]);

  return [elementRef, isVisible] as const;
};

const RightSidebar = () => {
  // Animation hooks for staggered entrance
  const [eventsRef, isEventsVisible] = useIntersectionAnimation(0.1);
  const [jobsRef, isJobsVisible] = useIntersectionAnimation(0.1);
  const [connectionsRef, isConnectionsVisible] = useIntersectionAnimation(0.1);
  const [trendingRef, isTrendingVisible] = useIntersectionAnimation(0.1);

  // Modal states
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [isJobsModalOpen, setIsJobsModalOpen] = useState(false);
  const [isConnectionsModalOpen, setIsConnectionsModalOpen] = useState(false);
  const [isJobApplicationModalOpen, setIsJobApplicationModalOpen] =
    useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Application form data
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    experience: "",
    portfolio: "",
    availability: "",
  });

  const upcomingEvents = [
    {
      id: 1,
      title: "Alumni Tech Meetup",
      date: "Dec 15, 2024",
      time: "6:00 PM",
      attendees: 45,
      location: "San Francisco",
      description: "Join us for an evening of networking and tech discussions",
      type: "Networking",
    },
    {
      id: 2,
      title: "Career Fair 2024",
      date: "Dec 20, 2024",
      time: "10:00 AM",
      attendees: 120,
      location: "Virtual",
      description:
        "Connect with top companies and explore career opportunities",
      type: "Career",
    },
    {
      id: 3,
      title: "Class of 2020 Reunion",
      date: "Jan 5, 2025",
      time: "7:00 PM",
      attendees: 80,
      location: "New York",
      description: "Reconnect with your classmates and celebrate achievements",
      type: "Social",
    },
    {
      id: 4,
      title: "Women in Tech Panel",
      date: "Jan 10, 2025",
      time: "2:00 PM",
      attendees: 65,
      location: "Los Angeles",
      description: "Inspiring panel discussion with successful women leaders",
      type: "Professional",
    },
    {
      id: 5,
      title: "Startup Pitch Competition",
      date: "Jan 15, 2025",
      time: "1:00 PM",
      attendees: 95,
      location: "Chicago",
      description: "Watch alumni startups compete for funding opportunities",
      type: "Business",
    },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Meta",
      location: "Remote",
      salary: "$160k - $220k",
      postedBy: "John Doe (2019)",
      description:
        "We're looking for a passionate engineer to join our platform team...",
      requirements: [
        "5+ years experience",
        "React expertise",
        "System design skills",
      ],
      benefits: ["Stock options", "Health insurance", "Remote work"],
      type: "Full-time",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Google",
      location: "Mountain View",
      salary: "$140k - $180k",
      postedBy: "Jane Smith (2018)",
      description:
        "Lead product strategy for our cloud infrastructure platform...",
      requirements: [
        "MBA preferred",
        "3+ years PM experience",
        "Technical background",
      ],
      benefits: ["Competitive salary", "Stock options", "On-site perks"],
      type: "Full-time",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Netflix",
      location: "Los Gatos",
      salary: "$130k - $170k",
      postedBy: "Mike Chen (2020)",
      description:
        "Apply ML algorithms to improve content recommendation systems...",
      requirements: [
        "PhD/MS in relevant field",
        "Python/R expertise",
        "ML experience",
      ],
      benefits: ["Unlimited PTO", "Stock options", "Learning budget"],
      type: "Full-time",
    },
  ];

  const suggestedConnections = [
    {
      id: 1,
      name: "Alex Chen",
      title: "Software Engineer at Apple",
      company: "Apple",
      graduation: "2019",
      mutualConnections: 3,
      avatar: "/api/placeholder/40/40",
      bio: "Passionate about mobile development and user experience design",
    },
    {
      id: 2,
      name: "Maria Garcia",
      title: "Data Scientist at Netflix",
      company: "Netflix",
      graduation: "2018",
      mutualConnections: 5,
      avatar: "/api/placeholder/40/40",
      bio: "Machine learning enthusiast working on recommendation systems",
    },
    {
      id: 3,
      name: "David Kumar",
      title: "Product Manager at Microsoft",
      company: "Microsoft",
      graduation: "2020",
      mutualConnections: 2,
      avatar: "/api/placeholder/40/40",
      bio: "Building the future of cloud computing and enterprise solutions",
    },
  ];

  const handleJobApplication = (job: any) => {
    setSelectedJob(job);
    setIsJobApplicationModalOpen(true);
  };

  const submitJobApplication = () => {
    const application = {
      job: selectedJob,
      application: applicationData,
      timestamp: new Date().toISOString(),
    };

    console.log("Job application submitted:", application);
    alert(
      `Application submitted for ${selectedJob.title} at ${selectedJob.company}! 🎉`
    );

    // Reset form
    setApplicationData({
      coverLetter: "",
      experience: "",
      portfolio: "",
      availability: "",
    });
    setIsJobApplicationModalOpen(false);
    setSelectedJob(null);
  };

  const handleConnect = (person: any) => {
    console.log("Connection request sent to:", person);
    alert(`Connection request sent to ${person.name}! 🤝`);
  };

  const handleRSVP = (event: any) => {
    console.log("RSVP to event:", event);
    alert(`RSVP confirmed for ${event.title}! 📅`);
  };

  return (
    <>
      <aside className="hidden xl:block w-80 p-4 space-y-6">
        {/* Upcoming Events */}
        <div
          ref={eventsRef}
          className={`transition-all duration-700 ${
            isEventsVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
          }`}
        >
          <Card className="professional-card hover:alma-shadow-strong transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.slice(0, 3).map((event, index) => (
                <div
                  key={event.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg hover:bg-surface alma-transition transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                    isEventsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: isEventsVisible
                      ? `${index * 100 + 200}ms`
                      : "0ms",
                  }}
                  onClick={() => handleRSVP(event)}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-foreground">
                      {event.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.date}
                    </p>
                    <div className="flex items-center mt-2 space-x-3">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        {event.attendees} attending
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full hover:scale-105 transition-transform duration-200"
                onClick={() => setIsEventsModalOpen(true)}
              >
                View All Events
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Featured Jobs */}
        <div
          ref={jobsRef}
          className={`transition-all duration-700 delay-300 ${
            isJobsVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
          }`}
        >
          <Card className="professional-card hover:alma-shadow-strong transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-accent" />
                Featured Jobs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {featuredJobs.slice(0, 2).map((job, index) => (
                <div
                  key={job.id}
                  className={`p-3 rounded-lg hover:bg-surface alma-transition transform hover:scale-105 transition-all duration-300 ${
                    isJobsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: isJobsVisible
                      ? `${index * 100 + 500}ms`
                      : "0ms",
                  }}
                >
                  <h4 className="font-medium text-sm text-foreground">
                    {job.title}
                  </h4>
                  <p className="text-sm text-primary font-medium mt-1">
                    {job.company}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {job.location}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Posted by {job.postedBy}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 hover:scale-105 transition-transform duration-200"
                    onClick={() => handleJobApplication(job)}
                  >
                    Apply Now
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full hover:scale-105 transition-transform duration-200"
                onClick={() => setIsJobsModalOpen(true)}
              >
                View All Jobs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Suggested Connections */}
        <div
          ref={connectionsRef}
          className={`transition-all duration-700 delay-500 ${
            isConnectionsVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
          }`}
        >
          <Card className="professional-card hover:alma-shadow-strong transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-success" />
                People You May Know
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedConnections.slice(0, 2).map((person, index) => (
                <div
                  key={person.id}
                  className={`flex items-center space-x-3 transition-all duration-300 ${
                    isConnectionsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: isConnectionsVisible
                      ? `${index * 100 + 700}ms`
                      : "0ms",
                  }}
                >
                  <Avatar className="h-10 w-10 alma-shadow hover:scale-110 transition-transform duration-200">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {person.name}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {person.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {person.mutualConnections} mutual connections
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs hover:scale-105 transition-transform duration-200"
                    onClick={() => handleConnect(person)}
                  >
                    Connect
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full hover:scale-105 transition-transform duration-200"
                onClick={() => setIsConnectionsModalOpen(true)}
              >
                See All Suggestions
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Trending Topics */}
        <div
          ref={trendingRef}
          className={`transition-all duration-700 delay-700 ${
            isTrendingVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
          }`}
        >
          <Card className="professional-card hover:alma-shadow-strong transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  "#TechCareers",
                  "#AlumniSpotlight",
                  "#StartupLife",
                  "#RemoteWork",
                  "#AI",
                ].map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`mr-2 mb-2 cursor-pointer hover:bg-primary hover:text-primary-foreground alma-transition hover:scale-110 transition-all duration-200 ${
                      isTrendingVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                    style={{
                      transitionDelay: isTrendingVisible
                        ? `${index * 50 + 900}ms`
                        : "0ms",
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* All Events Modal */}
      <Dialog open={isEventsModalOpen} onOpenChange={setIsEventsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>All Upcoming Events</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    className="alma-gradient"
                    onClick={() => handleRSVP(event)}
                  >
                    RSVP
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {event.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {event.attendees} attending
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* All Jobs Modal */}
      <Dialog open={isJobsModalOpen} onOpenChange={setIsJobsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>All Job Opportunities</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {job.title}
                    </h3>
                    <p className="text-primary font-medium">{job.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.location} • {job.salary}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="alma-gradient"
                    onClick={() => handleJobApplication(job)}
                  >
                    Apply Now
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {job.description}
                </p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      Requirements:
                    </p>
                    <ul className="text-xs text-muted-foreground list-disc list-inside">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Posted by {job.postedBy}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* All Connections Modal */}
      <Dialog
        open={isConnectionsModalOpen}
        onOpenChange={setIsConnectionsModalOpen}
      >
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>People You May Know</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            {suggestedConnections.map((person) => (
              <div
                key={person.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface"
              >
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground">{person.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {person.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {person.company} • Class of {person.graduation}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {person.bio}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {person.mutualConnections} mutual connections
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2"
                    onClick={() => handleConnect(person)}
                  >
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Job Application Modal */}
      <Dialog
        open={isJobApplicationModalOpen}
        onOpenChange={setIsJobApplicationModalOpen}
      >
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            <div className="p-3 bg-surface rounded-lg">
              <h4 className="font-medium text-foreground">
                {selectedJob?.title}
              </h4>
              <p className="text-sm text-primary">{selectedJob?.company}</p>
              <p className="text-xs text-muted-foreground">
                {selectedJob?.location} • {selectedJob?.salary}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="cover-letter">Cover Letter</Label>
                <Textarea
                  id="cover-letter"
                  value={applicationData.coverLetter}
                  onChange={(e) =>
                    setApplicationData((prev) => ({
                      ...prev,
                      coverLetter: e.target.value,
                    }))
                  }
                  placeholder="Tell us why you're interested in this role..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="experience">Relevant Experience</Label>
                <Textarea
                  id="experience"
                  value={applicationData.experience}
                  onChange={(e) =>
                    setApplicationData((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                  placeholder="Describe your relevant experience..."
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="portfolio">Portfolio/LinkedIn</Label>
                <Input
                  id="portfolio"
                  value={applicationData.portfolio}
                  onChange={(e) =>
                    setApplicationData((prev) => ({
                      ...prev,
                      portfolio: e.target.value,
                    }))
                  }
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <Label htmlFor="availability">Availability</Label>
                <Input
                  id="availability"
                  value={applicationData.availability}
                  onChange={(e) =>
                    setApplicationData((prev) => ({
                      ...prev,
                      availability: e.target.value,
                    }))
                  }
                  placeholder="Immediate / 2 weeks notice / etc."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsJobApplicationModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={submitJobApplication}
              className="flex-1 alma-gradient"
              disabled={!applicationData.coverLetter.trim()}
            >
              Submit Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RightSidebar;
