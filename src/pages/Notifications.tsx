import {
  Bell,
  Check,
  X,
  Heart,
  MessageCircle,
  Briefcase,
  Calendar,
  UserPlus,
  Share2,
  Settings,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useState, useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";

const Notifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "connection",
      title: "New Connection Request",
      message: "Sarah Chen wants to connect with you",
      user: {
        name: "Sarah Chen",
        avatar: "/api/placeholder/48/48",
        title: "Product Manager at Meta",
      },
      timestamp: "2 minutes ago",
      isRead: false,
      bgColor: "bg-primary/10",
      icon: UserPlus,
    },
    {
      id: 2,
      type: "like",
      title: "Post Interaction",
      message:
        "Alex Rodriguez and 5 others liked your post about AI in healthcare",
      user: {
        name: "Alex Rodriguez",
        avatar: "/api/placeholder/48/48",
        title: "Data Scientist at Google",
      },
      timestamp: "15 minutes ago",
      isRead: false,
      bgColor: "bg-accent/10",
      icon: Heart,
    },
    {
      id: 3,
      type: "job",
      title: "New Job Opportunity",
      message:
        "Senior Software Engineer position at Microsoft matches your profile",
      user: null,
      timestamp: "1 hour ago",
      isRead: true,
      bgColor: "bg-success/10",
      icon: Briefcase,
    },
    {
      id: 4,
      type: "event",
      title: "Event Reminder",
      message: "Alumni Tech Meetup starts in 2 hours",
      user: null,
      timestamp: "2 hours ago",
      isRead: false,
      bgColor: "bg-warning/10",
      icon: Calendar,
    },
    {
      id: 5,
      type: "message",
      title: "New Message",
      message: "Maria Garcia sent you a message",
      user: {
        name: "Maria Garcia",
        avatar: "/api/placeholder/48/48",
        title: "UX Designer at Adobe",
      },
      timestamp: "3 hours ago",
      isRead: true,
      bgColor: "bg-primary/10",
      icon: MessageCircle,
    },
    {
      id: 6,
      type: "share",
      title: "Post Shared",
      message: "John Doe shared your post about career growth",
      user: {
        name: "John Doe",
        avatar: "/api/placeholder/48/48",
        title: "Startup Founder",
      },
      timestamp: "5 hours ago",
      isRead: true,
      bgColor: "bg-accent/10",
      icon: Share2,
    },
    {
      id: 7,
      type: "system",
      title: "Profile Update",
      message: "Your profile has been viewed 24 times this week",
      user: null,
      timestamp: "1 day ago",
      isRead: true,
      bgColor: "bg-success/10",
      icon: Bell,
    },
  ]);
  const { isOpen } = useSidebar();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const allNotifications = notifications;
  const connectionRequests = notifications.filter(
    (n) => n.type === "connection"
  );
  const jobAlerts = notifications.filter((n) => n.type === "job");

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );

    toast({
      title: "Success!",
      description: "All notifications marked as read",
    });
  };

  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const handleNotificationAction = (
    id: number,
    action: "accept" | "decline" | "dismiss" | "view" | "respond"
  ) => {
    const notification = notifications.find((n) => n.id === id);

    markAsRead(id);

    switch (action) {
      case "accept":
        if (notification?.type === "connection") {
          toast({
            title: "Connection Accepted!",
            description: `You are now connected with ${notification.user?.name}`,
          });
        } else if (notification?.type === "event") {
          toast({
            title: "Event Joined!",
            description: "You've successfully joined the event",
          });
        }
        removeNotification(id);
        break;

      case "decline":
        if (notification?.type === "connection") {
          toast({
            title: "Connection Declined",
            description: "Connection request declined",
          });
        } else if (notification?.type === "job") {
          toast({
            title: "Job Passed",
            description: "Job opportunity marked as not interested",
          });
        }
        removeNotification(id);
        break;

      case "view":
        if (notification?.type === "job") {
          toast({
            title: "Opening Job Details",
            description: "Redirecting to job posting...",
          });
        } else if (
          notification?.type === "like" ||
          notification?.type === "share"
        ) {
          toast({
            title: "Opening Post",
            description: "Redirecting to your post...",
          });
        } else if (notification?.type === "message") {
          toast({
            title: "Opening Message",
            description: "Redirecting to conversation...",
          });
        }
        break;

      case "respond":
        if (notification?.type === "message") {
          toast({
            title: "Opening Chat",
            description: `Starting conversation with ${notification.user?.name}`,
          });
        }
        break;

      case "dismiss":
        toast({
          title: "Notification Dismissed",
          description: "Notification removed",
        });
        removeNotification(id);
        break;

      default:
        break;
    }
  };

  // Function to get appropriate action buttons based on notification type
  const getActionButtons = (notification: any) => {
    switch (notification.type) {
      case "connection":
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="alma-gradient text-primary-foreground w-20"
              onClick={() =>
                handleNotificationAction(notification.id, "accept")
              }
            >
              Accept
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-20"
              onClick={() =>
                handleNotificationAction(notification.id, "decline")
              }
            >
              Decline
            </Button>
          </div>
        );

      case "like":
      case "share":
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="alma-gradient text-primary-foreground w-20"
              onClick={() => handleNotificationAction(notification.id, "view")}
            >
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-20"
              onClick={() =>
                handleNotificationAction(notification.id, "dismiss")
              }
            >
              Dismiss
            </Button>
          </div>
        );

      case "message":
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="alma-gradient text-primary-foreground w-20"
              onClick={() =>
                handleNotificationAction(notification.id, "respond")
              }
            >
              Reply
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-20"
              onClick={() => handleNotificationAction(notification.id, "view")}
            >
              View
            </Button>
          </div>
        );

      case "job":
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="alma-gradient text-primary-foreground w-20"
              onClick={() => handleNotificationAction(notification.id, "view")}
            >
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-20"
              onClick={() =>
                handleNotificationAction(notification.id, "decline")
              }
            >
              Pass
            </Button>
          </div>
        );

      case "event":
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="alma-gradient text-primary-foreground w-20"
              onClick={() =>
                handleNotificationAction(notification.id, "accept")
              }
            >
              Join
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-20"
              onClick={() =>
                handleNotificationAction(notification.id, "decline")
              }
            >
              Skip
            </Button>
          </div>
        );

      case "system":
        return (
          <Button
            variant="outline"
            size="sm"
            className="w-20"
            onClick={() => handleNotificationAction(notification.id, "dismiss")}
          >
            Dismiss
          </Button>
        );

      default:
        return (
          <Button
            variant="outline"
            size="sm"
            className="w-20"
            onClick={() => handleNotificationAction(notification.id, "dismiss")}
          >
            Dismiss
          </Button>
        );
    }
  };

  // Professional Loader Component
  const ProfessionalLoader = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-muted/50 rounded-lg animate-pulse"></div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-16 bg-muted/50 rounded-md animate-pulse"></div>
          <div className="h-9 w-28 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid w-full grid-cols-4 gap-1 bg-muted/30 rounded-lg p-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-9 bg-muted/50 rounded-md animate-pulse"
            ></div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="h-5 w-32 bg-muted/50 rounded animate-pulse"></div>
          <div className="h-6 w-16 bg-muted/50 rounded-full animate-pulse"></div>
        </div>

        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <Card key={index} className="professional-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 flex-1">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="space-y-2">
                        <div
                          className={`h-5 bg-gradient-to-r from-primary/20 to-transparent rounded animate-pulse ${
                            index % 3 === 0
                              ? "w-48"
                              : index % 3 === 1
                              ? "w-40"
                              : "w-52"
                          }`}
                        ></div>
                        <div
                          className={`h-4 bg-muted/50 rounded animate-pulse ${
                            index % 2 === 0 ? "w-72" : "w-64"
                          }`}
                        ></div>
                      </div>

                      {index % 3 !== 2 && (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full animate-pulse"></div>
                          <div className="h-3 w-32 bg-muted/50 rounded animate-pulse"></div>
                        </div>
                      )}

                      <div className="h-3 w-20 bg-muted/40 rounded animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {index % 4 === 0 && (
                      <div className="flex gap-2">
                        <div className="h-8 w-16 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md animate-pulse"></div>
                        <div className="h-8 w-16 bg-muted/50 rounded-md animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center py-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium text-foreground mb-1">
              Loading notifications
            </div>
            <div className="flex gap-1">
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-primary/70 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
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
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-foreground">
                    Notifications
                  </h1>
                  <p className="text-muted-foreground">
                    Stay updated with your network activity
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>All notifications</DropdownMenuItem>
                      <DropdownMenuItem>Unread only</DropdownMenuItem>
                      <DropdownMenuItem>Connections</DropdownMenuItem>
                      <DropdownMenuItem>Jobs</DropdownMenuItem>
                      <DropdownMenuItem>Messages</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    className="alma-gradient text-primary-foreground"
                    onClick={markAllAsRead}
                    disabled={unreadNotifications.length === 0}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Mark All Read
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="all" className="text-xs sm:text-sm">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs sm:text-sm">
                    Unread
                    {unreadNotifications.length > 0 && (
                      <Badge
                        variant="destructive"
                        className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {unreadNotifications.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value="connections"
                    className="text-xs sm:text-sm"
                  >
                    Connections
                  </TabsTrigger>
                  <TabsTrigger value="jobs" className="text-xs sm:text-sm">
                    Jobs
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">
                      {allNotifications.length} notifications
                    </p>
                    <Badge variant="secondary">
                      {unreadNotifications.length} unread
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {allNotifications.map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <Card
                          key={notification.id}
                          className={`professional-card transition-all hover:shadow-md ${
                            !notification.isRead
                              ? "border-primary/30 bg-primary/5"
                              : ""
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex gap-3 flex-1">
                                <div
                                  className={`w-10 h-10 rounded-lg ${notification.bgColor} flex items-center justify-center flex-shrink-0`}
                                >
                                  <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1 space-y-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h3
                                      className={`font-medium truncate ${
                                        !notification.isRead
                                          ? "text-foreground"
                                          : "text-muted-foreground"
                                      }`}
                                    >
                                      {notification.title}
                                    </h3>
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {notification.message}
                                  </p>
                                  {notification.user && (
                                    <div className="flex items-center gap-2 mt-2">
                                      <Avatar className="h-6 w-6 alma-shadow">
                                        <AvatarImage
                                          src={notification.user.avatar}
                                        />
                                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                          {notification.user.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-xs text-muted-foreground truncate">
                                        {notification.user.title}
                                      </span>
                                    </div>
                                  )}
                                  <div className="text-xs text-muted-foreground">
                                    {notification.timestamp}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {getActionButtons(notification)}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="p-1"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {!notification.isRead && (
                                      <DropdownMenuItem
                                        onClick={() =>
                                          markAsRead(notification.id)
                                        }
                                      >
                                        <Check className="h-4 w-4 mr-2" />
                                        Mark as read
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                      onClick={() =>
                                        removeNotification(notification.id)
                                      }
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Remove
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="unread" className="space-y-4">
                  <p className="text-muted-foreground">
                    {unreadNotifications.length} unread notifications
                  </p>
                  <div className="space-y-3">
                    {unreadNotifications.length > 0 ? (
                      unreadNotifications.map((notification) => (
                        <Card
                          key={notification.id}
                          className="professional-card"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center">
                                    <h3 className="font-medium text-foreground">
                                      {notification.title}
                                    </h3>
                                  </div>

                                  <p className="text-sm text-muted-foreground">
                                    {notification.message}
                                  </p>

                                  {notification.user && (
                                    <div className="flex items-center gap-2 mt-2">
                                      <Avatar className="h-6 w-6 alma-shadow">
                                        <AvatarImage
                                          src={notification.user.avatar}
                                        />
                                        <AvatarFallback className="text-xs">
                                          {notification.user.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-xs text-muted-foreground">
                                        {notification.user.title}
                                      </span>
                                    </div>
                                  )}

                                  <div className="text-xs text-muted-foreground">
                                    {notification.timestamp}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {getActionButtons(notification)}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          All caught up!
                        </h3>
                        <p className="text-muted-foreground">
                          No unread notifications
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="connections" className="space-y-4">
                  <p className="text-muted-foreground">
                    {connectionRequests.length} connection requests
                  </p>
                  <div className="space-y-3">
                    {connectionRequests.map((notification) => (
                      <Card key={notification.id} className="professional-card">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-3 flex-1">
                              <Avatar className="h-12 w-12 alma-shadow">
                                <AvatarImage src={notification.user?.avatar} />
                                <AvatarFallback>
                                  {notification.user?.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex-1 space-y-1">
                                <h3 className="font-medium text-foreground">
                                  {notification.user?.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {notification.user?.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Wants to connect with you
                                </p>

                                <div className="text-xs text-muted-foreground">
                                  {notification.timestamp}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              {getActionButtons(notification)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="jobs" className="space-y-4">
                  <p className="text-muted-foreground">
                    {jobAlerts.length} job notifications
                  </p>
                  <div className="space-y-3">
                    {jobAlerts.map((notification) => (
                      <Card key={notification.id} className="professional-card">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex-1 space-y-1">
                                <h3 className="font-medium text-foreground">
                                  {notification.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {notification.message}
                                </p>

                                <div className="text-xs text-muted-foreground">
                                  {notification.timestamp}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {getActionButtons(notification)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Notifications;
