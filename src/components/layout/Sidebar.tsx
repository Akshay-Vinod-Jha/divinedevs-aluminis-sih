import { Home, Users, MessageCircle, Calendar, Briefcase, Bot, Clock, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { icon: Home, label: "Feed", path: "/", count: null },
    { icon: Users, label: "My Network", path: "/network", count: 12 },
    { icon: MessageCircle, label: "Messages", path: "/messages", count: 2 },
    { icon: Calendar, label: "Events", path: "/events", count: 5 },
    { icon: Briefcase, label: "Jobs", path: "/jobs", count: 8 },
    { icon: Clock, label: "StoryTimeline", path: "/storytimeline", count: null },
    { icon: Bot, label: "AI Hub", path: "/ai", count: null },
  ];

  return (
    <aside className="w-64 border-r border-border bg-surface h-screen sticky top-16 overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* User Profile Card */}
        <Card className="professional-card cursor-pointer hover:alma-shadow-strong alma-transition" onClick={() => navigate('/profile')}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-12 w-12 alma-shadow">
                <AvatarImage src="/api/placeholder/48/48" alt="Profile" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">Sarah Johnson</h3>
                <p className="text-xs text-muted-foreground truncate">Software Engineer at Google</p>
                <p className="text-xs text-muted-foreground">Class of 2020</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Profile views: 24</span>
              <span>Connections: 156</span>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.label}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start alma-transition ${
                  isActive ? "alma-gradient text-primary-foreground alma-shadow" : "hover:bg-surface-hover"
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {item.count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>

        {/* Recent Activity */}
        <Card className="professional-card">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-3">Recent Activity</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-xs text-foreground">New alumni joined from your batch</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-xs text-foreground">Upcoming reunion event</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-xs text-foreground">Job posted in your field</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;