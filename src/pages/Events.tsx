import { Calendar, MapPin, Users, Clock, Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const Events = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Events
              </h1>
              <Button className="alma-gradient text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search events..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="my-events">My Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <Card key={event.id} className="professional-card overflow-hidden">
                      <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-primary/20" />
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {event.date} at {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {event.attendees} attending
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{event.organizer[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{event.organizer}</span>
                          </div>
                          <Badge variant="secondary">Free</Badge>
                        </div>
                        <div className="flex gap-2">
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
                </div>
              </TabsContent>

              <TabsContent value="my-events" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myEvents.map((event) => (
                    <Card key={event.id} className="professional-card overflow-hidden">
                      <div className="h-48 bg-gradient-to-br from-success/10 to-primary/10 flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-success/20" />
                      </div>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <Badge variant="secondary" className="bg-success/10 text-success">
                            Attending
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {event.date} at {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex gap-2">
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
                </div>
              </TabsContent>

              <TabsContent value="past" className="space-y-6">
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No past events</h3>
                  <p className="text-muted-foreground">Events you've attended will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Events;