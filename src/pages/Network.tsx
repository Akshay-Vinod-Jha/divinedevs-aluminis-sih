import {
  Users,
  UserPlus,
  Filter,
  MapPin,
  Briefcase,
  GraduationCap,
  X,
  Send,
  Check,
  Mail,
  Building,
  Calendar,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import {
  PageLayout,
  AnimatedCard,
  StaggeredList,
} from "@/components/animations/PageAnimations";
import { useState, useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import CountingNumber from "@/components/ui/counting-number";

const Network = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen } = useSidebar();

  // Modal states
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);

  // Form states
  const [inviteData, setInviteData] = useState({
    email: "",
    name: "",
    message: "",
    batch: "",
  });

  const [messageData, setMessageData] = useState({
    subject: "",
    message: "",
  });

  const [filterData, setFilterData] = useState({
    batch: "",
    company: "",
    location: "",
    industry: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [connectionStates, setConnectionStates] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const connections = [
    {
      id: 1,
      name: "Alex Chen",
      title: "Software Engineer at Microsoft",
      batch: "2019",
      mutual: 8,
      location: "Seattle, WA",
      avatar: "/api/placeholder/64/64",
      company: "Microsoft",
      industry: "Technology",
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Product Manager at Google",
      batch: "2018",
      mutual: 12,
      location: "Mountain View, CA",
      avatar: "/api/placeholder/64/64",
      company: "Google",
      industry: "Technology",
    },
    {
      id: 3,
      name: "John Davis",
      title: "Data Scientist at Meta",
      batch: "2020",
      mutual: 5,
      location: "Menlo Park, CA",
      avatar: "/api/placeholder/64/64",
      company: "Meta",
      industry: "Technology",
    },
  ];

  const suggestions = [
    {
      id: 4,
      name: "Maria Rodriguez",
      title: "UX Designer at Adobe",
      batch: "2019",
      mutual: 3,
      location: "San Francisco, CA",
      avatar: "/api/placeholder/64/64",
      company: "Adobe",
      industry: "Design",
    },
    {
      id: 5,
      name: "David Kim",
      title: "Startup Founder",
      batch: "2017",
      mutual: 7,
      location: "Austin, TX",
      avatar: "/api/placeholder/64/64",
      company: "TechFlow",
      industry: "Entrepreneurship",
    },
  ];

  // Handler functions
  const handleInviteAlumni = () => {
    setIsInviteModalOpen(true);
  };

  const handleSendInvite = () => {
    console.log("Invite sent:", inviteData);
    alert(`Invitation sent to ${inviteData.name || inviteData.email}! 📧`);
    setInviteData({ email: "", name: "", message: "", batch: "" });
    setIsInviteModalOpen(false);
  };

  const handleMessage = (person: any) => {
    setSelectedPerson(person);
    setMessageData({ subject: "", message: "" });
    setIsMessageModalOpen(true);
  };

  const handleSendMessage = () => {
    console.log("Message sent to:", selectedPerson, messageData);
    alert(`Message sent to ${selectedPerson.name}! 💬`);
    setMessageData({ subject: "", message: "" });
    setIsMessageModalOpen(false);
    setSelectedPerson(null);
  };

  const handleConnect = (person: any) => {
    setConnectionStates((prev) => ({ ...prev, [person.id]: "pending" }));
    console.log("Connection request sent to:", person);
    setTimeout(() => {
      alert(`Connection request sent to ${person.name}! 🤝`);
    }, 500);
  };

  const handleDismiss = (person: any) => {
    setConnectionStates((prev) => ({ ...prev, [person.id]: "dismissed" }));
    console.log("Dismissed suggestion:", person);
    alert(`${person.name} dismissed from suggestions.`);
  };

  const handleFilter = () => {
    setIsFilterModalOpen(true);
  };

  const handleApplyFilters = () => {
    console.log("Filters applied:", filterData);
    alert("Filters applied successfully! 🔍");
    setIsFilterModalOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
    // In a real app, this would trigger an API call
  };

  // Professional Loader for Network
  const ProfessionalLoader = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 bg-muted/50 rounded-lg animate-pulse"></div>
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

      <div className="flex items-center justify-between">
        <div className="h-5 w-32 bg-muted/50 rounded animate-pulse"></div>
        <div className="h-6 w-20 bg-muted/50 rounded-full animate-pulse"></div>
      </div>

      <div className="grid gap-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="professional-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-5 w-40 bg-muted/50 rounded animate-pulse"></div>
                    <div className="h-4 w-48 bg-muted/40 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-muted/40 rounded animate-pulse"></div>
                    <div className="h-4 w-32 bg-muted/40 rounded animate-pulse"></div>
                    <div className="h-3 w-28 bg-muted/30 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="h-8 w-20 bg-muted/50 rounded-md animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center py-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
          <div className="text-sm font-medium text-foreground">
            Loading network
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
          className={`flex-1 p-6 transition-all duration-300 ${
            isOpen ? "" : "max-w-full"
          }`}
        >
          {isLoading ? (
            <ProfessionalLoader />
          ) : (
            <PageLayout
              title="My Network"
              subtitle="Connect with fellow alumni and expand your professional network"
              className="max-w-4xl mx-auto"
            >
              <AnimatedCard delay={200}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold">
                      Network Overview
                    </span>
                  </div>
                  <Button
                    className="alma-gradient text-primary-foreground"
                    onClick={handleInviteAlumni}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Alumni
                  </Button>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={400}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                  <Card className="professional-card alma-gradient alma-shadow-strong">
                    <CardContent className="p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl font-bold text-primary-foreground">
                        <CountingNumber
                          start={0}
                          end={connections.length}
                          duration={2000}
                        />
                      </div>
                      <p className="text-xs md:text-sm text-primary-foreground/80">
                        Connections
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="professional-card bg-surface border alma-shadow">
                    <CardContent className="p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl font-bold text-foreground">
                        <CountingNumber start={0} end={12} duration={2000} />
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Pending
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="professional-card bg-accent/10 border-accent/20 alma-shadow">
                    <CardContent className="p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl font-bold text-accent">
                        <CountingNumber start={0} end={8} duration={2000} />
                      </div>
                      <p className="text-xs md:text-sm text-accent/70">
                        Mutual
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="professional-card bg-primary/10 border-primary/20 alma-shadow">
                    <CardContent className="p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl font-bold text-primary">
                        <CountingNumber start={0} end={5} duration={2000} />
                      </div>
                      <p className="text-xs md:text-sm text-primary/70">
                        This Week
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={600}>
                <div className="flex justify-end">
                  <Button variant="outline" onClick={handleFilter}>
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={800}>
                <Tabs defaultValue="connections" className="space-y-8">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="connections">Connections</TabsTrigger>
                    <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                    <TabsTrigger value="invitations">Invitations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="connections" className="space-y-6">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground">156 connections</p>
                      <Badge variant="secondary">12 new this week</Badge>
                    </div>
                    <StaggeredList
                      className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                      delay={1000}
                    >
                      {connections.map((person) => (
                        <Card key={person.id} className="professional-card">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex gap-4">
                                <Avatar className="h-16 w-16 alma-shadow">
                                  <AvatarImage src={person.avatar} />
                                  <AvatarFallback>
                                    {person.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                  <h3 className="font-semibold text-foreground">
                                    {person.name}
                                  </h3>
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
                                  <p className="text-xs text-muted-foreground">
                                    {person.mutual} mutual connections
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleMessage(person)}
                              >
                                Message
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </StaggeredList>
                  </TabsContent>

                  <TabsContent value="suggestions" className="space-y-6">
                    <p className="text-muted-foreground">People you may know</p>
                    <StaggeredList
                      className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                      delay={1200}
                    >
                      {suggestions.map((person) => (
                        <Card key={person.id} className="professional-card">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex gap-4">
                                <Avatar className="h-16 w-16 alma-shadow">
                                  <AvatarImage src={person.avatar} />
                                  <AvatarFallback>
                                    {person.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                  <h3 className="font-semibold text-foreground">
                                    {person.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {person.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Class of {person.batch}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {person.location}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {person.mutual} mutual connections
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="alma-gradient text-primary-foreground"
                                  onClick={() => handleConnect(person)}
                                  disabled={
                                    connectionStates[person.id] === "pending" ||
                                    connectionStates[person.id] === "dismissed"
                                  }
                                >
                                  <UserPlus className="h-4 w-4 mr-1" />
                                  {connectionStates[person.id] === "pending"
                                    ? "Sent"
                                    : "Connect"}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDismiss(person)}
                                  disabled={
                                    connectionStates[person.id] === "dismissed"
                                  }
                                >
                                  {connectionStates[person.id] === "dismissed"
                                    ? "Dismissed"
                                    : "Dismiss"}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </StaggeredList>
                  </TabsContent>

                  <TabsContent value="invitations" className="space-y-6">
                    <p className="text-muted-foreground">
                      Pending invitations (2)
                    </p>
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No pending invitations</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </AnimatedCard>
            </PageLayout>
          )}
        </main>
      </div>

      {/* Invite Alumni Modal */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Invite Alumni to AlmaConnect</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email Address *</Label>
              <Input
                id="invite-email"
                type="email"
                value={inviteData.email}
                onChange={(e) =>
                  setInviteData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="alumni@example.com"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-name">Full Name</Label>
              <Input
                id="invite-name"
                value={inviteData.name}
                onChange={(e) =>
                  setInviteData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="John Doe"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-batch">Graduation Batch</Label>
              <Select
                onValueChange={(value) =>
                  setInviteData((prev) => ({ ...prev, batch: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select batch year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2015">Class of 2015</SelectItem>
                  <SelectItem value="2016">Class of 2016</SelectItem>
                  <SelectItem value="2017">Class of 2017</SelectItem>
                  <SelectItem value="2018">Class of 2018</SelectItem>
                  <SelectItem value="2019">Class of 2019</SelectItem>
                  <SelectItem value="2020">Class of 2020</SelectItem>
                  <SelectItem value="2021">Class of 2021</SelectItem>
                  <SelectItem value="2022">Class of 2022</SelectItem>
                  <SelectItem value="2023">Class of 2023</SelectItem>
                  <SelectItem value="2024">Class of 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-message">Personal Message</Label>
              <Textarea
                id="invite-message"
                value={inviteData.message}
                onChange={(e) =>
                  setInviteData((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                placeholder="Hi! I'd like to invite you to join our alumni network on AlmaConnect..."
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsInviteModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendInvite}
                className="flex-1 alma-gradient"
                disabled={!inviteData.email}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Message Modal */}
      <Dialog open={isMessageModalOpen} onOpenChange={setIsMessageModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Send Message to {selectedPerson?.name}</DialogTitle>
          </DialogHeader>
          {selectedPerson && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedPerson.avatar} />
                  <AvatarFallback>
                    {selectedPerson.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-foreground">
                    {selectedPerson.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedPerson.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Class of {selectedPerson.batch}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message-subject">Subject</Label>
                <Input
                  id="message-subject"
                  value={messageData.subject}
                  onChange={(e) =>
                    setMessageData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  placeholder="Let's connect about..."
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message-content">Message</Label>
                <Textarea
                  id="message-content"
                  value={messageData.message}
                  onChange={(e) =>
                    setMessageData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  placeholder="Hi! I'd love to connect with you..."
                  className="min-h-[120px] resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsMessageModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendMessage}
                  className="flex-1 alma-gradient"
                  disabled={!messageData.subject || !messageData.message}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Filter Modal */}
      <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Filter Alumni Network</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="filter-batch">Graduation Batch</Label>
                <Select
                  onValueChange={(value) =>
                    setFilterData((prev) => ({ ...prev, batch: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Batches</SelectItem>
                    <SelectItem value="2015-2017">2015-2017</SelectItem>
                    <SelectItem value="2018-2020">2018-2020</SelectItem>
                    <SelectItem value="2021-2024">2021-2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="filter-location">Location</Label>
                <Select
                  onValueChange={(value) =>
                    setFilterData((prev) => ({ ...prev, location: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="san-francisco">
                      San Francisco Bay Area
                    </SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter-company">Company</Label>
              <Input
                id="filter-company"
                value={filterData.company}
                onChange={(e) =>
                  setFilterData((prev) => ({
                    ...prev,
                    company: e.target.value,
                  }))
                }
                placeholder="Google, Microsoft, Meta..."
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter-industry">Industry</Label>
              <Select
                onValueChange={(value) =>
                  setFilterData((prev) => ({ ...prev, industry: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Quick Filters</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="recent-connections" />
                  <Label htmlFor="recent-connections" className="text-sm">
                    Recent connections
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="mutual-connections" />
                  <Label htmlFor="mutual-connections" className="text-sm">
                    Mutual connections
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="same-company" />
                  <Label htmlFor="same-company" className="text-sm">
                    Same company
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="same-location" />
                  <Label htmlFor="same-location" className="text-sm">
                    Same location
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsFilterModalOpen(false)}
                className="flex-1"
              >
                Reset Filters
              </Button>
              <Button
                onClick={handleApplyFilters}
                className="flex-1 alma-gradient"
              >
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Network;
