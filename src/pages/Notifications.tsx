import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useState, useEffect } from "react";

const Notifications = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const notifications = [
    {
      id: 1,
      type: "connection",
      title: "New Connection Request",
      message: "Sarah Chen wants to connect with you",
      user: {
        name: "Sarah Chen",
        avatar: "/api/placeholder/48/48",
        title: "Product Manager at Meta"
      },
      timestamp: "2 minutes ago",
      isRead: false,
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      type: "like",
      title: "Post Interaction",
      message: "Alex Rodriguez and 5 others liked your post about AI in healthcare",
      user: {
        name: "Alex Rodriguez",
        avatar: "/api/placeholder/48/48",
        title: "Data Scientist at Google"
      },
      timestamp: "15 minutes ago",
      isRead: false,
      bgColor: "bg-accent/10"
    },
    {
      id: 3,
      type: "job",
      title: "New Job Opportunity",
      message: "Senior Software Engineer position at Microsoft matches your profile",
      user: null,
      timestamp: "1 hour ago",
      isRead: true,
      bgColor: "bg-success/10"
    },
    {
      id: 4,
      type: "event",
      title: "Event Reminder",
      message: "Alumni Tech Meetup starts in 2 hours",
      user: null,
      timestamp: "2 hours ago",
      isRead: false,
      bgColor: "bg-warning/10"
    },
    {
      id: 5,
      type: "message",
      title: "New Message",
      message: "Maria Garcia sent you a message",
      user: {
        name: "Maria Garcia",
        avatar: "/api/placeholder/48/48",
        title: "UX Designer at Adobe"
      },
      timestamp: "3 hours ago",
      isRead: true,
      bgColor: "bg-primary/10"
    },
    {
      id: 6,
      type: "share",
      title: "Post Shared",
      message: "John Doe shared your post about career growth",
      user: {
        name: "John Doe",
        avatar: "/api/placeholder/48/48",
        title: "Startup Founder"
      },
      timestamp: "5 hours ago",
      isRead: true,
      bgColor: "bg-accent/10"
    },
    {
      id: 7,
      type: "system",
      title: "Profile Update",
      message: "Your profile has been viewed 24 times this week",
      user: null,
      timestamp: "1 day ago",
      isRead: true,
      bgColor: "bg-success/10"
    }
  ];  const unreadNotifications = notifications.filter(n => !n.isRead);
  const allNotifications = notifications;
  const connectionRequests = notifications.filter(n => n.type === "connection");
  const jobAlerts = notifications.filter(n => n.type === "job");

  const markAllAsRead = () => {
    // Function to mark all notifications as read
    console.log("Mark all as read");
  };

  const handleNotificationAction = (id: number, action: 'accept' | 'decline' | 'dismiss' | 'view' | 'respond') => {
    // Function to handle notification actions
    console.log(`${action} notification ${id}`);
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
              onClick={() => handleNotificationAction(notification.id, 'accept')}
            >
              Accept
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="w-20"
              onClick={() => handleNotificationAction(notification.id, 'decline')}
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
              onClick={() => handleNotificationAction(notification.id, 'view')}
            >
              View
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="w-20"
              onClick={() => handleNotificationAction(notification.id, 'dismiss')}
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
              onClick={() => handleNotificationAction(notification.id, 'respond')}
            >
              Reply
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="w-20"
              onClick={() => handleNotificationAction(notification.id, 'view')}
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
              onClick={() => handleNotificationAction(notification.id, 'view')}
            >
              View
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="w-20"
              onClick={() => handleNotificationAction(notification.id, 'decline')}
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
              onClick={() => handleNotificationAction(notification.id, 'accept')}
            >
              Join
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="w-20"
              onClick={() => handleNotificationAction(notification.id, 'decline')}
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
            onClick={() => handleNotificationAction(notification.id, 'dismiss')}
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
            onClick={() => handleNotificationAction(notification.id, 'dismiss')}
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
            <div key={i} className="h-9 bg-muted/50 rounded-md animate-pulse"></div>
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
                        <div className={`h-5 bg-gradient-to-r from-primary/20 to-transparent rounded animate-pulse ${
                          index % 3 === 0 ? 'w-48' : index % 3 === 1 ? 'w-40' : 'w-52'
                        }`}></div>
                        <div className={`h-4 bg-muted/50 rounded animate-pulse ${
                          index % 2 === 0 ? 'w-72' : 'w-64'
                        }`}></div>
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
            <div className="text-sm font-medium text-foreground mb-1">Loading notifications</div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {isLoading ? (
            <ProfessionalLoader />
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">
                  Notifications
                </h1>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button className="alma-gradient text-primary-foreground" onClick={markAllAsRead}>
                    Mark All Read
                  </Button>
                </div>
              </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {unreadNotifications.length > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full">
                      {unreadNotifications.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">{allNotifications.length} notifications</p>
                  <Badge variant="secondary">{unreadNotifications.length} unread</Badge>
                </div>
                <div className="space-y-3">
                  {allNotifications.map((notification) => (
                    <Card key={notification.id} className="professional-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {notification.title}
                                </h3>
                              </div>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                              {notification.user && (
                                <div className="flex items-center gap-2 mt-2">
                                  <Avatar className="h-6 w-6 alma-shadow">
                                    <AvatarImage src={notification.user.avatar} />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                      {notification.user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-muted-foreground">{notification.user.title}</span>
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
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="space-y-4">
                <p className="text-muted-foreground">{unreadNotifications.length} unread notifications</p>
                <div className="space-y-3">
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.map((notification) => (
                      <Card key={notification.id} className="professional-card">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center">
                                  <h3 className="font-medium text-foreground">{notification.title}</h3>
                                </div>
                                
                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                                
                                {notification.user && (
                                  <div className="flex items-center gap-2 mt-2">
                                    <Avatar className="h-6 w-6 alma-shadow">
                                      <AvatarImage src={notification.user.avatar} />
                                      <AvatarFallback className="text-xs">
                                        {notification.user.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground">{notification.user.title}</span>
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
                      <p className="text-muted-foreground">No unread notifications</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="connections" className="space-y-4">
                <p className="text-muted-foreground">{connectionRequests.length} connection requests</p>
                <div className="space-y-3">
                  {connectionRequests.map((notification) => (
                    <Card key={notification.id} className="professional-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3 flex-1">
                            <Avatar className="h-12 w-12 alma-shadow">
                              <AvatarImage src={notification.user?.avatar} />
                              <AvatarFallback>
                                {notification.user?.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 space-y-1">
                              <h3 className="font-medium text-foreground">{notification.user?.name}</h3>
                              <p className="text-sm text-muted-foreground">{notification.user?.title}</p>
                              <p className="text-sm text-muted-foreground">Wants to connect with you</p>
                              
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
                <p className="text-muted-foreground">{jobAlerts.length} job notifications</p>
                <div className="space-y-3">
                  {jobAlerts.map((notification) => (
                    <Card key={notification.id} className="professional-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex-1 space-y-1">
                              <h3 className="font-medium text-foreground">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                              
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
