import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Plus,
  Filter,
  Search,
  Share2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  MapIcon,
  MoreHorizontal,
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

const Events = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Alumni Reunion 2024",
      date: "March 15, 2024",
      time: "6:00 PM",
      location: "University Campus, Main Hall",
      attendees: 156,
      image: "/api/placeholder/300/200",
      organizer: "Alumni Committee",
      description:
        "Join us for our annual reunion celebration! Reconnect with classmates, share memories, and celebrate our achievements.",
      isAttending: true,
      isSaved: false,
      price: "Free",
      category: "Reunion",
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
      description:
        "Exploring the latest developments in AI applications for healthcare. Learn from industry experts and network with peers.",
      isAttending: false,
      isSaved: true,
      price: "Free",
      category: "Tech Talk",
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
      description:
        "Connect with fellow alumni in your city. Build professional relationships and explore career opportunities.",
      isAttending: false,
      isSaved: false,
      price: "$25",
      category: "Networking",
    },
    {
      id: 4,
      title: "Startup Pitch Competition",
      date: "April 12, 2024",
      time: "5:00 PM",
      location: "Innovation Hub, Tech District",
      attendees: 78,
      image: "/api/placeholder/300/200",
      organizer: "Entrepreneurship Society",
      description:
        "Watch alumni entrepreneurs pitch their startups. Great opportunity for investors and aspiring entrepreneurs.",
      isAttending: false,
      isSaved: false,
      price: "Free",
      category: "Competition",
    },
  ]);
  const { isOpen } = useSidebar();
  const { toast } = useToast();
  const [createEventOpen, setCreateEventOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingEvents = filteredEvents.filter((event) => !event.isAttending);
  const myEvents = filteredEvents.filter((event) => event.isAttending);
  const savedEvents = filteredEvents.filter((event) => event.isSaved);

  // Event action handlers
  const handleRSVP = (eventId: number) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, isAttending: true, attendees: event.attendees + 1 }
          : event
      )
    );

    toast({
      title: "RSVP Confirmed!",
      description: "You've successfully registered for this event",
    });
  };

  const handleCancelRSVP = (eventId: number) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              isAttending: false,
              attendees: Math.max(0, event.attendees - 1),
            }
          : event
      )
    );

    toast({
      title: "RSVP Cancelled",
      description: "You've cancelled your registration for this event",
      variant: "destructive",
    });
  };

  const handleSaveEvent = (eventId: number) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, isSaved: !event.isSaved } : event
      )
    );

    const event = events.find((e) => e.id === eventId);
    toast({
      title: event?.isSaved ? "Event Unsaved" : "Event Saved!",
      description: event?.isSaved
        ? "Event removed from saved events"
        : "Event added to your saved events",
    });
  };

  const handleShareEvent = (event: any) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Event link copied to clipboard",
      });
    }
  };

  const handleCreateEvent = () => {
    setCreateEventOpen(true);
  };

  const handleViewDetails = (event: any) => {
    toast({
      title: "Opening Event Details",
      description: `Loading details for ${event.title}...`,
    });
  };

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
          <div
            key={i}
            className="h-9 bg-muted/50 rounded-md animate-pulse"
          ></div>
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
          <div className="text-sm font-medium text-foreground">
            Loading events
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
                  <Dialog
                    open={createEventOpen}
                    onOpenChange={setCreateEventOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="alma-gradient text-primary-foreground w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create New Event</DialogTitle>
                        <DialogDescription>
                          Create a new event for the alumni community.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Input placeholder="Event Title" />
                        <Input placeholder="Date (e.g., March 15, 2024)" />
                        <Input placeholder="Time (e.g., 6:00 PM)" />
                        <Input placeholder="Location" />
                        <Input placeholder="Description" />
                        <Input placeholder="Price (e.g., Free or $25)" />
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          className="alma-gradient text-primary-foreground"
                          onClick={() => {
                            toast({
                              title: "Event Created!",
                              description:
                                "Your event has been successfully created and published",
                            });
                            setCreateEventOpen(false);
                          }}
                        >
                          Create Event
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
                      placeholder="Search events by title, location, organizer..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>All events</DropdownMenuItem>
                      <DropdownMenuItem>This week</DropdownMenuItem>
                      <DropdownMenuItem>This month</DropdownMenuItem>
                      <DropdownMenuItem>Free events</DropdownMenuItem>
                      <DropdownMenuItem>Virtual events</DropdownMenuItem>
                      <DropdownMenuItem>Networking</DropdownMenuItem>
                      <DropdownMenuItem>Tech talks</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={600}>
                <Tabs defaultValue="upcoming" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4">
                    <TabsTrigger value="upcoming" className="text-sm">
                      Upcoming Events
                    </TabsTrigger>
                    <TabsTrigger value="my-events" className="text-sm">
                      My Events
                    </TabsTrigger>
                    <TabsTrigger value="saved" className="text-sm">
                      Saved Events
                    </TabsTrigger>
                    <TabsTrigger value="past" className="text-sm">
                      Past Events
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="space-y-6">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground">
                        {upcomingEvents.length} upcoming events
                      </p>
                      {searchQuery && (
                        <Badge variant="secondary">
                          {filteredEvents.length} results for "{searchQuery}"
                        </Badge>
                      )}
                    </div>
                    <StaggeredList
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                      delay={800}
                    >
                      {upcomingEvents.map((event) => (
                        <Card
                          key={event.id}
                          className="professional-card overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                          <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                            <Calendar className="h-16 w-16 text-primary/20" />
                            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                              {event.category}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleShareEvent(event)}
                                >
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleSaveEvent(event.id)}
                                >
                                  {event.isSaved ? (
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
                                <DropdownMenuItem
                                  onClick={() => handleViewDetails(event)}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <CardHeader className="pb-4 p-4 sm:p-6">
                            <CardTitle className="text-base sm:text-lg truncate">
                              {event.title}
                            </CardTitle>
                            <div className="space-y-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">
                                  {event.date} at {event.time}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">
                                  {event.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 flex-shrink-0" />
                                <span>{event.attendees} attending</span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {event.description}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-2 min-w-0">
                                <Avatar className="h-6 w-6 flex-shrink-0">
                                  <AvatarFallback className="text-xs">
                                    {event.organizer[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground truncate">
                                  {event.organizer}
                                </span>
                              </div>
                              <Badge
                                variant={
                                  event.price === "Free"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="self-start sm:self-center px-3 py-1"
                              >
                                {event.price}
                              </Badge>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                              <Button
                                size="sm"
                                className="flex-1 alma-gradient text-primary-foreground h-9 px-4"
                                onClick={() => handleRSVP(event.id)}
                              >
                                RSVP
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 h-9 px-4"
                                onClick={() => handleViewDetails(event)}
                              >
                                Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </StaggeredList>
                  </TabsContent>

                  <TabsContent value="my-events" className="space-y-6">
                    <p className="text-muted-foreground">
                      {myEvents.length} events you're attending
                    </p>
                    <StaggeredList
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                      delay={1000}
                    >
                      {myEvents.map((event) => (
                        <Card
                          key={event.id}
                          className="professional-card overflow-hidden"
                        >
                          <div className="h-48 bg-gradient-to-br from-success/10 to-primary/10 flex items-center justify-center relative">
                            <Calendar className="h-16 w-16 text-success/20" />
                            <Badge className="absolute top-2 left-2 bg-success text-success-foreground">
                              Attending
                            </Badge>
                          </div>
                          <CardHeader className="pb-3 p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <CardTitle className="text-base sm:text-lg truncate">
                                {event.title}
                              </CardTitle>
                            </div>
                            <div className="space-y-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">
                                  {event.date} at {event.time}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">
                                  {event.location}
                                </span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {event.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 h-9 px-4"
                                onClick={() => handleViewDetails(event)}
                              >
                                View Details
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 h-9 px-4 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                onClick={() => handleCancelRSVP(event.id)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </StaggeredList>
                    {myEvents.length === 0 && (
                      <div className="text-center py-12">
                        <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          No events yet
                        </h3>
                        <p className="text-muted-foreground">
                          RSVP to events to see them here
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="saved" className="space-y-6">
                    <p className="text-muted-foreground">
                      {savedEvents.length} saved events
                    </p>
                    <StaggeredList
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                      delay={1200}
                    >
                      {savedEvents.map((event) => (
                        <Card
                          key={event.id}
                          className="professional-card overflow-hidden"
                        >
                          <div className="h-48 bg-gradient-to-br from-amber/10 to-orange/10 flex items-center justify-center relative">
                            <Bookmark className="h-16 w-16 text-amber-500/20" />
                            <Badge className="absolute top-2 left-2 bg-amber-500 text-amber-50">
                              Saved
                            </Badge>
                          </div>
                          <CardHeader className="pb-4 p-4 sm:p-6">
                            <CardTitle className="text-base sm:text-lg truncate">
                              {event.title}
                            </CardTitle>
                            <div className="space-y-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">
                                  {event.date} at {event.time}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">
                                  {event.location}
                                </span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {event.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                              <Button
                                size="sm"
                                className="flex-1 alma-gradient text-primary-foreground h-9 px-4"
                                onClick={() => handleRSVP(event.id)}
                              >
                                RSVP
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 h-9 px-4 text-amber-600 hover:bg-amber-50"
                                onClick={() => handleSaveEvent(event.id)}
                              >
                                Unsave
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </StaggeredList>
                    {savedEvents.length === 0 && (
                      <div className="text-center py-12">
                        <Bookmark className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          No saved events
                        </h3>
                        <p className="text-muted-foreground">
                          Save events you're interested in to see them here
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="past" className="space-y-6">
                    <div className="text-center py-12">
                      <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No past events
                      </h3>
                      <p className="text-muted-foreground">
                        Events you've attended will appear here
                      </p>
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
