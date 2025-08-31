import { Bell, MessageCircle, Search, User, Users, Calendar, Briefcase, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <div className="alma-gradient rounded-lg p-2">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-primary">AlmaConnect</h1>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md mx-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alumni, posts, events..."
              className="pl-10 bg-surface focus:ring-primary"
            />
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full flex items-center justify-center text-xs text-accent-foreground">
                2
              </span>
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full flex items-center justify-center text-xs text-accent-foreground">
                3
              </span>
            </Button>

            <Button variant="ghost" size="icon">
              <Calendar className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <Briefcase className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <Bot className="h-5 w-5" />
            </Button>

            {/* User Avatar */}
            <Avatar className="h-8 w-8 alma-shadow">
              <AvatarImage src="/api/placeholder/32/32" alt="Profile" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;