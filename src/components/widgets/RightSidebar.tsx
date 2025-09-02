import { Calendar, Briefcase, Users, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  const upcomingEvents = [
    {
      id: 1,
      title: "Alumni Tech Meetup",
      date: "Dec 15, 2024",
      attendees: 45,
      location: "San Francisco"
    },
    {
      id: 2,
      title: "Career Fair 2024",
      date: "Dec 20, 2024",
      attendees: 120,
      location: "Virtual"
    },
    {
      id: 3,
      title: "Class of 2020 Reunion",
      date: "Jan 5, 2025",
      attendees: 80,
      location: "New York"
    }
  ];

  const featuredJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Meta",
      location: "Remote",
      postedBy: "John Doe (2019)"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Google",
      location: "Mountain View",
      postedBy: "Jane Smith (2018)"
    }
  ];

  const suggestedConnections = [
    {
      id: 1,
      name: "Alex Chen",
      title: "Software Engineer at Apple",
      mutualConnections: 3,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Maria Garcia",
      title: "Data Scientist at Netflix",
      mutualConnections: 5,
      avatar: "/api/placeholder/40/40"
    }
  ];

  return (
    <aside className="hidden xl:block w-80 p-4 space-y-6">
      {/* Upcoming Events */}
      <div 
        ref={eventsRef}
        className={`transition-all duration-700 ${
          isEventsVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8'
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
            {upcomingEvents.map((event, index) => (
              <div 
                key={event.id} 
                className={`flex items-start space-x-3 p-3 rounded-lg hover:bg-surface alma-transition transform hover:scale-105 transition-all duration-300 ${
                  isEventsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  transitionDelay: isEventsVisible ? `${index * 100 + 200}ms` : '0ms' 
                }}
              >
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">{event.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
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
            <Button variant="outline" size="sm" className="w-full hover:scale-105 transition-transform duration-200">
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
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8'
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
            {featuredJobs.map((job, index) => (
              <div 
                key={job.id} 
                className={`p-3 rounded-lg hover:bg-surface alma-transition transform hover:scale-105 transition-all duration-300 ${
                  isJobsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  transitionDelay: isJobsVisible ? `${index * 100 + 500}ms` : '0ms' 
                }}
              >
                <h4 className="font-medium text-sm text-foreground">{job.title}</h4>
                <p className="text-sm text-primary font-medium mt-1">{job.company}</p>
                <p className="text-xs text-muted-foreground mt-1">{job.location}</p>
                <p className="text-xs text-muted-foreground mt-2">Posted by {job.postedBy}</p>
                <Button variant="outline" size="sm" className="w-full mt-3 hover:scale-105 transition-transform duration-200">
                  Apply Now
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full hover:scale-105 transition-transform duration-200">
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
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8'
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
            {suggestedConnections.map((person, index) => (
              <div 
                key={person.id} 
                className={`flex items-center space-x-3 transition-all duration-300 ${
                  isConnectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  transitionDelay: isConnectionsVisible ? `${index * 100 + 700}ms` : '0ms' 
                }}
              >
                <Avatar className="h-10 w-10 alma-shadow hover:scale-110 transition-transform duration-200">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground truncate">{person.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{person.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {person.mutualConnections} mutual connections
                  </p>
                </div>
                <Button variant="outline" size="sm" className="text-xs hover:scale-105 transition-transform duration-200">
                  Connect
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full hover:scale-105 transition-transform duration-200">
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
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8'
        }`}
      >
        <Card className="professional-card hover:alma-shadow-strong transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["#TechCareers", "#AlumniSpotlight", "#StartupLife", "#RemoteWork", "#AI"].map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className={`mr-2 mb-2 cursor-pointer hover:bg-primary hover:text-primary-foreground alma-transition hover:scale-110 transition-all duration-200 ${
                    isTrendingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                  style={{ 
                    transitionDelay: isTrendingVisible ? `${index * 50 + 900}ms` : '0ms' 
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
  );
};

export default RightSidebar;