import {
  Home,
  Users,
  MessageCircle,
  Calendar,
  Briefcase,
  Bot,
  Clock,
  Settings,
  User,
  Bell,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "@/contexts/SidebarContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, closeSidebar } = useSidebar();

  const navigationItems = [
    { icon: Home, label: "Feed", path: "/", count: null },
    { icon: Users, label: "My Network", path: "/network", count: 12 },
    { icon: MessageCircle, label: "Messages", path: "/messages", count: 2 },
    { icon: Bell, label: "Notifications", path: "/notifications", count: 5 },
    { icon: Calendar, label: "Events", path: "/events", count: 5 },
    { icon: Briefcase, label: "Jobs", path: "/jobs", count: 8 },
    {
      icon: Clock,
      label: "StoryTimeline",
      path: "/storytimeline",
      count: null,
    },
    { icon: Bot, label: "AI Hub", path: "/ai", count: null },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:sticky top-0 left-0 z-50 lg:z-auto
        w-64 sm:w-72 lg:w-64 
        h-screen 
        border-r border-border bg-surface 
        overflow-y-auto scrollbar-hide
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSidebar}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
          {/* User Profile Card */}
          <div>
            <Card
              className="professional-card cursor-pointer hover:alma-shadow-strong alma-transition"
              onClick={() => handleNavigation("/profile")}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 alma-shadow">
                    <AvatarImage src="/api/placeholder/48/48" alt="Profile" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <User className="h-5 w-5 sm:h-6 sm:w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">
                      Sarah Johnson
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      Software Engineer at Google
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Class of 2020
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="truncate mr-2">Profile views: 24</span>
                  <span className="truncate">Connections: 156</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.label}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start alma-transition transform hover:scale-105 transition-all duration-300 text-sm ${
                    isActive
                      ? "alma-gradient text-primary-foreground alma-shadow"
                      : "hover:bg-surface-hover"
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="flex-1 text-left truncate">
                    {item.label}
                  </span>
                  {item.count && (
                    <Badge
                      variant="secondary"
                      className="ml-2 text-xs hover:scale-110 transition-transform duration-200 flex-shrink-0"
                    >
                      {item.count}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Recent Activity */}
          <Card className="professional-card">
            <CardContent className="p-3 sm:p-4">
              <h4 className="font-semibold text-sm text-foreground mb-3 sm:mb-4">
                Recent Activity
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {/* Alumni Activity */}
                <div className="group cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-surface alma-transition border border-border hover:border-primary/30">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground mb-1 truncate">
                        New alumni joined from your batch
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                    <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-primary alma-transition flex-shrink-0 ml-2" />
                  </div>
                </div>

                {/* Event Activity */}
                <div className="group cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-surface alma-transition border border-border hover:border-accent/30">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground mb-1 truncate">
                        Annual reunion event scheduled
                      </p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                    <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-accent alma-transition flex-shrink-0 ml-2" />
                  </div>
                </div>

                {/* Job Activity */}
                <div className="group cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-surface alma-transition border border-border hover:border-success/30">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground mb-1 truncate">
                        New job opportunity in your field
                      </p>
                      <p className="text-xs text-muted-foreground">
                        3 days ago
                      </p>
                    </div>
                    <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-success alma-transition flex-shrink-0 ml-2" />
                  </div>
                </div>

                {/* Network Activity */}
                <div className="group cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-surface alma-transition border border-border hover:border-muted-foreground/30">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground mb-1 truncate">
                        Professional network update
                      </p>
                      <p className="text-xs text-muted-foreground">
                        5 days ago
                      </p>
                    </div>
                    <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground alma-transition flex-shrink-0 ml-2" />
                  </div>
                </div>
              </div>

              {/* View More */}
              <div className="mt-3 sm:mt-4 pt-3 border-t border-border">
                <button className="w-full text-xs text-muted-foreground hover:text-primary alma-transition text-left">
                  View all activity
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full text-sm"
              size="sm"
              onClick={() => handleNavigation("/settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
