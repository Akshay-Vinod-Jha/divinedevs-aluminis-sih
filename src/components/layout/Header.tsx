import { Bell, MessageCircle, Search, User, Users, Calendar, Briefcase, Bot, Menu, Sun, Moon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { toggleSidebar } = useSidebar();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Sidebar Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="hover:bg-surface-hover h-8 w-8 sm:h-10 sm:w-10"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            <div className="alma-gradient rounded-lg p-1.5 sm:p-2 cursor-pointer" onClick={() => navigate("/")}>
              <Users className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <h1 className="text-sm sm:text-xl font-bold text-primary cursor-pointer hidden xs:block" onClick={() => navigate("/")}>
              AlmaConnect
            </h1>
            <h1 className="text-sm font-bold text-primary cursor-pointer xs:hidden" onClick={() => navigate("/")}>
              Alma
            </h1>
          </div>

          {/* Desktop Search Bar */}
          <div className="relative flex-1 max-w-md mx-4 hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alumni, posts, events..."
              className="pl-10 bg-surface focus:ring-primary"
            />
          </div>

          {/* Mobile Search Overlay */}
          {showMobileSearch && (
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
              <div className="flex h-14 items-center px-4 border-b border-border bg-card">
                <div className="relative flex-1 mr-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alumni, posts, events..."
                    className="pl-10 bg-surface focus:ring-primary"
                    autoFocus
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowMobileSearch(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Navigation & Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Mobile Search Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => setShowMobileSearch(true)}
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Core Navigation - Always Visible */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative h-8 w-8 sm:h-10 sm:w-10 ${location.pathname === '/messages' ? 'bg-primary/10 text-primary' : ''}`}
              onClick={() => navigate('/messages')}
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-accent rounded-full flex items-center justify-center text-xs text-accent-foreground">
                2
              </span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative h-8 w-8 sm:h-10 sm:w-10 ${location.pathname === '/notifications' ? 'bg-primary/10 text-primary' : ''}`}
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-accent rounded-full flex items-center justify-center text-xs text-accent-foreground">
                3
              </span>
            </Button>

            {/* Secondary Navigation - Hidden on smallest screens */}
            <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                className={`h-8 w-8 sm:h-10 sm:w-10 ${location.pathname === '/events' ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => navigate('/events')}
              >
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              <Button 
                variant="ghost" 
                size="icon"
                className={`h-8 w-8 sm:h-10 sm:w-10 ${location.pathname === '/jobs' ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => navigate('/jobs')}
              >
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              <Button 
                variant="ghost" 
                size="icon"
                className={`h-8 w-8 sm:h-10 sm:w-10 ${location.pathname === '/ai' ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => navigate('/ai')}
              >
                <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-surface-hover h-8 w-8 sm:h-10 sm:w-10"
            >
              {theme === 'light' ? <Moon className="h-4 w-4 sm:h-5 sm:w-5" /> : <Sun className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>

            {/* User Avatar */}
            <Avatar 
              className="h-7 w-7 sm:h-8 sm:w-8 alma-shadow cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <AvatarImage src="/api/placeholder/32/32" alt="Profile" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;