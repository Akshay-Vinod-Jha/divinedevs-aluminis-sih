import { Calendar, MapPin, Users, Clock, Plus, Filter, Search } from "lucide-react";
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

const Events = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen } = useSidebar();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const events = [
    {
      id: 1,
      title: "Alumni Reunion 2024",
      date: "March 15, 2024",
      time: "6:00 PM",
      location: "University Campus, Main Hall",
      attendees: 156,
      image: "/api/placeholder/300/200",
      organizer: "Alumni Committee",
      description: "Join us for our annual reunion celebration!",
      isAttending: true
    },
    {
      id: 2,
      title: "Tech Talk: AI in Healthcare",
      date: "March 22, 2024",
      time: "7:00 PM",
      location: "Virtual Event",
      attendees: 89,
      image: "/api/placeholder/300/200",
      organizer: "Dr. Sarah Mitchell",
      description: "Exploring the latest developments in AI applications for healthcare.",
      isAttending: false
    },
    {
      id: 3,
      title: "Networking Mixer",
      date: "April 5, 2024",
      time: "6:30 PM",
      location: "Downtown Business Center",
      attendees: 45,
      image: "/api/placeholder/300/200",
      organizer: "Alumni Network",
      description: "Connect with fellow alumni in your city.",
      isAttending: false
    }
  ];

  const upcomingEvents = events.filter(event => !event.isAttending);
  const myEvents = events.filter(event => event.isAttending);

  // Professional Loader for Events
  const ProfessionalLoader = () => (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-muted/50 rounded-lg animate-pulse"></div>
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="professional-card overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse"></div>
            <CardContent className="p-4 space-y-3">
              <div className="h-6 w-48 bg-muted/50 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-40 bg-muted/40 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-muted/40 rounded animate-pulse"></div>
                <div className="h-4 w-28 bg-muted/40 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-full bg-muted/40 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-8 flex-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md animate-pulse"></div>
                <div className="h-8 flex-1 bg-muted/50 rounded-md animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center py-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
          <div className="text-sm font-medium text-foreground">Loading events</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className={`flex transition-all duration-300 ${isOpen ? '' : 'ml-0'}`}>
        <Sidebar />
        <main className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${isOpen ? '' : 'max-w-full'}`}>
          {isLoading ? (
            <ProfessionalLoader />
          ) : (
            <PageLayout 
              title="Events" 
              subtitle="Discover and attend alumni events and networking opportunities"
              className="max-w-6xl mx-auto"
            >
              <AnimatedCard delay={200}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold">Event Center</span>
                  </div>
                  <Button className="alma-gradient text-primary-foreground w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={400}>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search events..." className="pl-10" />
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={600}>
                <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
                <TabsTrigger value="upcoming" className="text-sm">Upcoming Events</TabsTrigger>
                <TabsTrigger value="my-events" className="text-sm">My Events</TabsTrigger>
                <TabsTrigger value="past" className="text-sm">Past Events</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-6">
                <StaggeredList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" delay={800}>
                  {upcomingEvents.map((event) => (
                    <Card key={event.id} className="professional-card overflow-hidden">
                      <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-primary/20" />
                      </div>
                      <CardHeader className="pb-3 p-4 sm:p-6">
                        <CardTitle className="text-base sm:text-lg truncate">{event.title}</CardTitle>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 flex-shrink-0" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 p-4 sm:p-6 pt-0">
                        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <Avatar className="h-6 w-6 flex-shrink-0">
                              <AvatarFallback className="text-xs">{event.organizer[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground truncate">{event.organizer}</span>
                          </div>
                          <Badge variant="secondary" className="self-start sm:self-center">Free</Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button size="sm" className="flex-1 alma-gradient text-primary-foreground">
                            RSVP
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </StaggeredList>
              </TabsContent>

              <TabsContent value="my-events" className="space-y-6">
                <StaggeredList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" delay={1000}>
                  {myEvents.map((event) => (
                    <Card key={event.id} className="professional-card overflow-hidden">
                      <div className="h-48 bg-gradient-to-br from-success/10 to-primary/10 flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-success/20" />
                      </div>
                      <CardHeader className="pb-3 p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <CardTitle className="text-base sm:text-lg truncate">{event.title}</CardTitle>
                          <Badge variant="secondary" className="bg-success/10 text-success self-start">
                            Attending
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 p-4 sm:p-6 pt-0">
                        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </StaggeredList>
              </TabsContent>

              <TabsContent value="past" className="space-y-6">
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No past events</h3>
                  <p className="text-muted-foreground">Events you've attended will appear here</p>
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

export default Events;