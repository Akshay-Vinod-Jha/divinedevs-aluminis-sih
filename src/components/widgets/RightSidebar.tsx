import { Calendar, Briefcase, Users, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RightSidebar = () => {
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
    <aside className="w-80 p-4 space-y-6">
      {/* Upcoming Events */}
      <Card className="professional-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface alma-transition">
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
          <Button variant="outline" size="sm" className="w-full">
            View All Events
          </Button>
        </CardContent>
      </Card>

      {/* Featured Jobs */}
      <Card className="professional-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-accent" />
            Featured Jobs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {featuredJobs.map((job) => (
            <div key={job.id} className="p-3 rounded-lg hover:bg-surface alma-transition">
              <h4 className="font-medium text-sm text-foreground">{job.title}</h4>
              <p className="text-sm text-primary font-medium mt-1">{job.company}</p>
              <p className="text-xs text-muted-foreground mt-1">{job.location}</p>
              <p className="text-xs text-muted-foreground mt-2">Posted by {job.postedBy}</p>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Apply Now
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full">
            View All Jobs
          </Button>
        </CardContent>
      </Card>

      {/* Suggested Connections */}
      <Card className="professional-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-success" />
            People You May Know
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedConnections.map((person) => (
            <div key={person.id} className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 alma-shadow">
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
              <Button variant="outline" size="sm" className="text-xs">
                Connect
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full">
            See All Suggestions
          </Button>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="professional-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Trending Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {["#TechCareers", "#AlumniSpotlight", "#StartupLife", "#RemoteWork", "#AI"].map((tag, index) => (
              <Badge key={index} variant="secondary" className="mr-2 mb-2 cursor-pointer hover:bg-primary hover:text-primary-foreground alma-transition">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default RightSidebar;