import { Users, UserPlus, Search, Filter, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const Network = () => {
  const connections = [
    {
      id: 1,
      name: "Alex Chen",
      title: "Software Engineer at Microsoft",
      batch: "2019",
      mutual: 8,
      location: "Seattle, WA",
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Product Manager at Google",
      batch: "2018",
      mutual: 12,
      location: "Mountain View, CA",
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 3,
      name: "John Davis",
      title: "Data Scientist at Meta",
      batch: "2020",
      mutual: 5,
      location: "Menlo Park, CA",
      avatar: "/api/placeholder/64/64"
    }
  ];

  const suggestions = [
    {
      id: 4,
      name: "Maria Rodriguez",
      title: "UX Designer at Adobe",
      batch: "2019",
      mutual: 3,
      location: "San Francisco, CA",
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 5,
      name: "David Kim",
      title: "Startup Founder",
      batch: "2017",
      mutual: 7,
      location: "Austin, TX",
      avatar: "/api/placeholder/64/64"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Users className="h-6 w-6" />
                My Network
              </h1>
              <Button className="alma-gradient text-primary-foreground">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Alumni
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search alumni by name, company, or batch..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <Tabs defaultValue="connections" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="connections">Connections</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="invitations">Invitations</TabsTrigger>
              </TabsList>

              <TabsContent value="connections" className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">156 connections</p>
                  <Badge variant="secondary">12 new this week</Badge>
                </div>
                <div className="grid gap-4">
                  {connections.map((person) => (
                    <Card key={person.id} className="professional-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <Avatar className="h-16 w-16 alma-shadow">
                              <AvatarImage src={person.avatar} />
                              <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-foreground">{person.name}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Briefcase className="h-3 w-3" />
                                {person.title}
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <GraduationCap className="h-3 w-3" />
                                Class of {person.batch}
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {person.location}
                              </p>
                              <p className="text-xs text-muted-foreground">{person.mutual} mutual connections</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Message</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="suggestions" className="space-y-4">
                <p className="text-muted-foreground">People you may know</p>
                <div className="grid gap-4">
                  {suggestions.map((person) => (
                    <Card key={person.id} className="professional-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <Avatar className="h-16 w-16 alma-shadow">
                              <AvatarImage src={person.avatar} />
                              <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-foreground">{person.name}</h3>
                              <p className="text-sm text-muted-foreground">{person.title}</p>
                              <p className="text-sm text-muted-foreground">Class of {person.batch}</p>
                              <p className="text-sm text-muted-foreground">{person.location}</p>
                              <p className="text-xs text-muted-foreground">{person.mutual} mutual connections</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="alma-gradient text-primary-foreground">
                              <UserPlus className="h-4 w-4 mr-1" />
                              Connect
                            </Button>
                            <Button variant="outline" size="sm">Dismiss</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="invitations" className="space-y-4">
                <p className="text-muted-foreground">Pending invitations (2)</p>
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending invitations</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Network;