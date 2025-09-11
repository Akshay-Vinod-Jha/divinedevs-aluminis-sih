import React, { useState } from "react";
import {
  Bell,
  MessageCircle,
  Search,
  User,
  Users,
  Calendar,
  Briefcase,
  Bot,
  Menu,
  Sun,
  Moon,
  X,
  Loader2,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useSidebar } from "@/contexts/SidebarContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { toggleSidebar } = useSidebar();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Sample search data
  const allData = [
    // Alumni
    {
      type: "alumni",
      id: 1,
      name: "Alex Chen",
      title: "Software Engineer at Microsoft",
      batch: "2019",
      avatar: "/api/placeholder/40/40",
    },
    {
      type: "alumni",
      id: 2,
      name: "Priya Sharma",
      title: "Product Manager at Google",
      batch: "2018",
      avatar: "/api/placeholder/40/40",
    },
    {
      type: "alumni",
      id: 3,
      name: "John Davis",
      title: "Data Scientist at Meta",
      batch: "2020",
      avatar: "/api/placeholder/40/40",
    },
    {
      type: "alumni",
      id: 4,
      name: "Maria Rodriguez",
      title: "UX Designer at Adobe",
      batch: "2019",
      avatar: "/api/placeholder/40/40",
    },

    // Posts
    {
      type: "post",
      id: 1,
      content:
        "Excited to share that I've been promoted to Senior Software Engineer!",
      author: "Sarah Johnson",
      timestamp: "2 hours ago",
    },
    {
      type: "post",
      id: 2,
      content:
        "Our startup just closed Series A funding! From a dorm room idea to a $10M valuation",
      author: "Michael Chen",
      timestamp: "4 hours ago",
    },

    // Events
    {
      type: "event",
      id: 1,
      title: "Alumni Tech Meetup",
      date: "Dec 15, 2024",
      location: "San Francisco",
      attendees: 45,
    },
    {
      type: "event",
      id: 2,
      title: "Career Fair 2024",
      date: "Dec 20, 2024",
      location: "Virtual",
      attendees: 120,
    },
    {
      type: "event",
      id: 3,
      title: "Class of 2020 Reunion",
      date: "Jan 5, 2025",
      location: "New York",
      attendees: 80,
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim().length < 2) {
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    // Simulate API delay
    setTimeout(() => {
      const filtered = allData.filter((item) => {
        const searchTerm = query.toLowerCase();
        if (item.type === "alumni") {
          return (
            item.name.toLowerCase().includes(searchTerm) ||
            item.title.toLowerCase().includes(searchTerm)
          );
        } else if (item.type === "post") {
          return (
            item.content.toLowerCase().includes(searchTerm) ||
            item.author.toLowerCase().includes(searchTerm)
          );
        } else if (item.type === "event") {
          return (
            item.title.toLowerCase().includes(searchTerm) ||
            item.location.toLowerCase().includes(searchTerm)
          );
        }
        return false;
      });

      setSearchResults(filtered);
      setIsSearching(false);
    }, 500);
  };

  const handleResultClick = (result: any) => {
    setShowResults(false);
    setSearchQuery("");
    setShowMobileSearch(false);

    if (result.type === "alumni") {
      navigate("/network");
    } else if (result.type === "post") {
      navigate("/");
    } else if (result.type === "event") {
      navigate("/events");
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for result clicks
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  const navigationItems = [
    { name: "Feed", path: "/dashboard", icon: MessageCircle },
    { name: "Network", path: "/network", icon: Users },
    { name: "Jobs", path: "/jobs", icon: Briefcase },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Messages", path: "/messages", icon: MessageCircle },
    { name: "AI Hub", path: "/ai", icon: Bot },
  ];

  const currentPath = location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 alma-shadow">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex h-14 sm:h-16 items-center gap-4">
          {/* Logo and Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="p-1 sm:p-2 hover:bg-accent/50"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => navigate("/")}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center shadow-lg border border-primary/20">
                      <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <span className="hidden sm:block text-lg sm:text-xl font-bold text-primary">
                      AlmaConnect
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Go to Landing Page</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:block flex-1 max-w-md mx-auto relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search alumni, posts, events..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onBlur={handleSearchBlur}
                className="pl-10 pr-4 w-full bg-background border-border focus:border-primary/50 transition-colors"
              />
              {isSearching && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
              )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && (
              <Card className="absolute top-full left-0 right-0 mt-1 alma-shadow-strong z-50 max-h-96 overflow-y-auto">
                <CardContent className="p-0">
                  {isSearching ? (
                    <div className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">
                          Searching...
                        </span>
                      </div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="divide-y divide-border">
                      {searchResults.slice(0, 8).map((result) => (
                        <div
                          key={`${result.type}-${result.id}`}
                          className="p-3 hover:bg-accent/50 cursor-pointer transition-colors"
                          onClick={() => handleResultClick(result)}
                        >
                          {result.type === "alumni" && (
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={result.avatar} />
                                <AvatarFallback>
                                  {result.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {result.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {result.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Class of {result.batch}
                                </p>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                Alumni
                              </Badge>
                            </div>
                          )}

                          {result.type === "post" && (
                            <div className="flex items-start gap-3">
                              <MessageCircle className="h-8 w-8 p-2 bg-accent/20 rounded-full text-accent flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground line-clamp-2">
                                  {result.content}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  by {result.author} • {result.timestamp}
                                </p>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                Post
                              </Badge>
                            </div>
                          )}

                          {result.type === "event" && (
                            <div className="flex items-center gap-3">
                              <Calendar className="h-8 w-8 p-2 bg-primary/20 rounded-full text-primary flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {result.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {result.date} • {result.location}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {result.attendees} attendees
                                </p>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                Event
                              </Badge>
                            </div>
                          )}
                        </div>
                      ))}

                      {searchResults.length > 8 && (
                        <div className="p-3 text-center border-t">
                          <p className="text-xs text-muted-foreground">
                            +{searchResults.length - 8} more results
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        No results found for "{searchQuery}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Desktop Navigation - Right Side */}
          <nav className="hidden lg:flex items-center space-x-1">
            <TooltipProvider>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        onClick={() => navigate(item.path)}
                        className={`transition-all duration-200 p-2 ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl"
                            : "hover:bg-accent/50"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden p-1 sm:p-2 hover:bg-accent/50"
                    onClick={() => setShowMobileSearch(true)}
                  >
                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search</p>
                </TooltipContent>
              </Tooltip>

              {/* Theme Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="p-1 sm:p-2 hover:bg-accent/50"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{theme === "dark" ? "Light Mode" : "Dark Mode"}</p>
                </TooltipContent>
              </Tooltip>

              {/* Notifications */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative p-1 sm:p-2 hover:bg-accent/50"
                    onClick={() => navigate("/notifications")}
                  >
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 sm:h-2.5 sm:w-2.5 bg-destructive rounded-full"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>

              {/* Profile */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar
                    className="h-8 w-8 sm:h-9 sm:w-9 cursor-pointer alma-shadow hover:alma-shadow-strong transition-all duration-200"
                    onClick={() => navigate("/profile")}
                  >
                    <AvatarImage src="/api/placeholder/36/36" />
                    <AvatarFallback className="alma-gradient text-primary-foreground">
                      <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto p-4">
            <div className="bg-background rounded-lg alma-shadow-strong p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Search</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowMobileSearch(false);
                    setShowResults(false);
                    setSearchQuery("");
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search alumni, posts, events..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 w-full"
                  autoFocus
                />
                {isSearching && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
                )}
              </div>

              {/* Mobile Search Results */}
              {showResults && (
                <div className="max-h-80 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">
                          Searching...
                        </span>
                      </div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.slice(0, 6).map((result) => (
                        <div
                          key={`${result.type}-${result.id}`}
                          className="p-3 bg-accent/5 hover:bg-accent/10 rounded-lg cursor-pointer transition-colors"
                          onClick={() => handleResultClick(result)}
                        >
                          {result.type === "alumni" && (
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={result.avatar} />
                                <AvatarFallback>
                                  {result.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground">
                                  {result.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {result.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Class of {result.batch}
                                </p>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                Alumni
                              </Badge>
                            </div>
                          )}

                          {result.type === "post" && (
                            <div className="flex items-start gap-3">
                              <MessageCircle className="h-10 w-10 p-2 bg-accent/20 rounded-full text-accent flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground line-clamp-2">
                                  {result.content}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  by {result.author} • {result.timestamp}
                                </p>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                Post
                              </Badge>
                            </div>
                          )}

                          {result.type === "event" && (
                            <div className="flex items-center gap-3">
                              <Calendar className="h-10 w-10 p-2 bg-primary/20 rounded-full text-primary flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground">
                                  {result.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {result.date} • {result.location}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {result.attendees} attendees
                                </p>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                Event
                              </Badge>
                            </div>
                          )}
                        </div>
                      ))}

                      {searchResults.length > 6 && (
                        <div className="p-3 text-center">
                          <p className="text-xs text-muted-foreground">
                            +{searchResults.length - 6} more results
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        No results found for "{searchQuery}"
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
