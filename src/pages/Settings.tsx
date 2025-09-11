import {
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Lock,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Mail,
  Phone,
  MessageSquare,
  Camera,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useTheme } from "@/contexts/ThemeContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { useState, useEffect, useRef } from "react";

// Custom hook for intersection observer animations
const useIntersectionAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  return [elementRef, isVisible] as const;
};

// Animated card component
const AnimatedCard = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [cardRef, isCardVisible] = useIntersectionAnimation(0.1);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${
        isCardVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-98"
      }`}
      style={{
        transitionDelay: isCardVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
};

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { isOpen } = useSidebar();
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  // Settings state
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    desktop: true,
    marketing: false,
    jobAlerts: true,
    eventReminders: true,
    networkUpdates: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    showActivity: true,
    searchable: true,
  });

  const [appearance, setAppearance] = useState({
    theme: theme,
    language: "en",
    timezone: "UTC-5",
    soundEnabled: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setContentVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Professional Loader
  const ProfessionalLoader = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="hero-gradient rounded-xl p-8 mb-6 text-center alma-shadow-strong animate-pulse">
        <div className="h-8 w-48 bg-primary/20 rounded-lg mx-auto mb-4"></div>
        <div className="h-4 w-96 bg-primary/10 rounded-lg mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-muted/40 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-muted/40 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  const handleAppearanceChange = (key: string, value: any) => {
    setAppearance((prev) => ({ ...prev, [key]: value }));
    if (key === "theme") {
      toggleTheme();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <Sidebar />
        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            isOpen ? "max-w-4xl" : "max-w-6xl"
          } mx-auto`}
        >
          {isLoading ? (
            <ProfessionalLoader />
          ) : (
            <>
              {/* Settings Header */}
              <AnimatedCard>
                <div
                  className={`hero-gradient rounded-xl p-8 mb-6 text-center alma-shadow-strong transition-all duration-1000 ${
                    contentVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-4 scale-95"
                  }`}
                >
                  <h1 className="text-3xl font-bold text-primary-foreground mb-3">
                    Settings & Preferences
                  </h1>
                  <p className="text-primary-foreground/90 text-lg">
                    Customize your AlmaConnect experience and manage your
                    account preferences.
                  </p>
                </div>
              </AnimatedCard>

              {/* Settings Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Settings Panel */}
                <div className="lg:col-span-2">
                  <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="profile">Profile</TabsTrigger>
                      <TabsTrigger value="privacy">Privacy</TabsTrigger>
                      <TabsTrigger value="notifications">
                        Notifications
                      </TabsTrigger>
                      <TabsTrigger value="appearance">Appearance</TabsTrigger>
                      <TabsTrigger value="account">Account</TabsTrigger>
                    </TabsList>

                    {/* Profile Settings */}
                    <TabsContent value="profile">
                      <AnimatedCard delay={100}>
                        <Card className="professional-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <User className="h-5 w-5 text-primary" />
                              Profile Information
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {/* Profile Picture */}
                            <div className="flex items-center gap-4">
                              <Avatar className="h-20 w-20 alma-shadow">
                                <AvatarImage
                                  src="/api/placeholder/80/80"
                                  alt="Profile"
                                />
                                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                                  SJ
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-2">
                                <Button variant="outline" size="sm">
                                  <Camera className="h-4 w-4 mr-2" />
                                  Change Photo
                                </Button>
                                <p className="text-xs text-muted-foreground">
                                  JPG, PNG or GIF. Max size 10MB.
                                </p>
                              </div>
                            </div>

                            <Separator />

                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                  id="firstName"
                                  placeholder="Sarah"
                                  defaultValue="Sarah"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                  id="lastName"
                                  placeholder="Johnson"
                                  defaultValue="Johnson"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="sarah.j@example.com"
                                  defaultValue="sarah.j@example.com"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                  id="phone"
                                  placeholder="+1 (555) 123-4567"
                                  defaultValue="+1 (555) 123-4567"
                                />
                              </div>
                            </div>

                            {/* Professional Info */}
                            <Separator />
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold">
                                Professional Information
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="jobTitle">Job Title</Label>
                                  <Input
                                    id="jobTitle"
                                    placeholder="Senior Software Engineer"
                                    defaultValue="Senior Software Engineer"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="company">Company</Label>
                                  <Input
                                    id="company"
                                    placeholder="Google"
                                    defaultValue="Google"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="graduationYear">
                                    Graduation Year
                                  </Label>
                                  <Select defaultValue="2020">
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Array.from(
                                        { length: 30 },
                                        (_, i) => 2024 - i
                                      ).map((year) => (
                                        <SelectItem
                                          key={year}
                                          value={year.toString()}
                                        >
                                          {year}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="location">Location</Label>
                                  <Input
                                    id="location"
                                    placeholder="San Francisco, CA"
                                    defaultValue="San Francisco, CA"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                  id="bio"
                                  placeholder="Tell us about yourself..."
                                  defaultValue="Passionate software engineer with expertise in full-stack development. Love building products that make a difference."
                                  className="min-h-[100px]"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <Button variant="hero">
                                <Edit3 className="h-4 w-4 mr-2" />
                                Update Profile
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                    </TabsContent>

                    {/* Privacy Settings */}
                    <TabsContent value="privacy">
                      <AnimatedCard delay={100}>
                        <Card className="professional-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Shield className="h-5 w-5 text-primary" />
                              Privacy & Security
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {/* Profile Visibility */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold">
                                Profile Visibility
                              </h4>
                              <div className="space-y-2">
                                <Label htmlFor="profileVisibility">
                                  Who can see your profile?
                                </Label>
                                <Select
                                  value={privacy.profileVisibility}
                                  onValueChange={(value) =>
                                    handlePrivacyChange(
                                      "profileVisibility",
                                      value
                                    )
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="public">
                                      Everyone
                                    </SelectItem>
                                    <SelectItem value="alumni">
                                      Alumni Network Only
                                    </SelectItem>
                                    <SelectItem value="connections">
                                      Connections Only
                                    </SelectItem>
                                    <SelectItem value="private">
                                      Private
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <Separator />

                            {/* Contact Information */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold">
                                Contact Information
                              </h4>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                      Show email address
                                    </span>
                                  </div>
                                  <Switch
                                    checked={privacy.showEmail}
                                    onCheckedChange={(checked) =>
                                      handlePrivacyChange("showEmail", checked)
                                    }
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                      Show phone number
                                    </span>
                                  </div>
                                  <Switch
                                    checked={privacy.showPhone}
                                    onCheckedChange={(checked) =>
                                      handlePrivacyChange("showPhone", checked)
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <Separator />

                            {/* Communication */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold">
                                Communication
                              </h4>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                      Allow direct messages
                                    </span>
                                  </div>
                                  <Switch
                                    checked={privacy.allowMessages}
                                    onCheckedChange={(checked) =>
                                      handlePrivacyChange(
                                        "allowMessages",
                                        checked
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                      Show activity status
                                    </span>
                                  </div>
                                  <Switch
                                    checked={privacy.showActivity}
                                    onCheckedChange={(checked) =>
                                      handlePrivacyChange(
                                        "showActivity",
                                        checked
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                      Searchable by search engines
                                    </span>
                                  </div>
                                  <Switch
                                    checked={privacy.searchable}
                                    onCheckedChange={(checked) =>
                                      handlePrivacyChange("searchable", checked)
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <Button variant="hero">
                                <Shield className="h-4 w-4 mr-2" />
                                Save Privacy Settings
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                    </TabsContent>

                    {/* Notification Settings */}
                    <TabsContent value="notifications">
                      <AnimatedCard delay={100}>
                        <Card className="professional-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Bell className="h-5 w-5 text-primary" />
                              Notification Preferences
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {/* Email Notifications */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold">
                                Email Notifications
                              </h4>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-sm font-medium">
                                      Job Alerts
                                    </span>
                                    <p className="text-xs text-muted-foreground">
                                      Get notified about relevant job
                                      opportunities
                                    </p>
                                  </div>
                                  <Switch
                                    checked={notifications.jobAlerts}
                                    onCheckedChange={(checked) =>
                                      handleNotificationChange(
                                        "jobAlerts",
                                        checked
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-sm font-medium">
                                      Event Reminders
                                    </span>
                                    <p className="text-xs text-muted-foreground">
                                      Reminders for upcoming alumni events
                                    </p>
                                  </div>
                                  <Switch
                                    checked={notifications.eventReminders}
                                    onCheckedChange={(checked) =>
                                      handleNotificationChange(
                                        "eventReminders",
                                        checked
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-sm font-medium">
                                      Network Updates
                                    </span>
                                    <p className="text-xs text-muted-foreground">
                                      Updates from your professional network
                                    </p>
                                  </div>
                                  <Switch
                                    checked={notifications.networkUpdates}
                                    onCheckedChange={(checked) =>
                                      handleNotificationChange(
                                        "networkUpdates",
                                        checked
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-sm font-medium">
                                      Marketing Communications
                                    </span>
                                    <p className="text-xs text-muted-foreground">
                                      Updates about new features and services
                                    </p>
                                  </div>
                                  <Switch
                                    checked={notifications.marketing}
                                    onCheckedChange={(checked) =>
                                      handleNotificationChange(
                                        "marketing",
                                        checked
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <Separator />

                            {/* Push Notifications */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold">
                                Push Notifications
                              </h4>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">
                                    Desktop notifications
                                  </span>
                                  <Switch
                                    checked={notifications.desktop}
                                    onCheckedChange={(checked) =>
                                      handleNotificationChange(
                                        "desktop",
                                        checked
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">
                                    Mobile push notifications
                                  </span>
                                  <Switch
                                    checked={notifications.push}
                                    onCheckedChange={(checked) =>
                                      handleNotificationChange("push", checked)
                                    }
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">
                                    SMS notifications
                                  </span>
                                  <Switch
                                    checked={notifications.sms}
                                    onCheckedChange={(checked) =>
                                      handleNotificationChange("sms", checked)
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <Button variant="hero">
                                <Bell className="h-4 w-4 mr-2" />
                                Save Notification Settings
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                    </TabsContent>

                    {/* Appearance Settings */}
                    <TabsContent value="appearance">
                      <AnimatedCard delay={100}>
                        <Card className="professional-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Palette className="h-5 w-5 text-primary" />
                              Appearance & Accessibility
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {/* Theme Selection */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold">Theme</h4>
                              <div className="grid grid-cols-3 gap-3">
                                <Button
                                  variant={
                                    theme === "light" ? "default" : "outline"
                                  }
                                  className="flex items-center gap-2 h-16"
                                  onClick={() =>
                                    theme !== "light" && toggleTheme()
                                  }
                                >
                                  <Sun className="h-4 w-4" />
                                  <span>Light</span>
                                </Button>
                                <Button
                                  variant={
                                    theme === "dark" ? "default" : "outline"
                                  }
                                  className="flex items-center gap-2 h-16"
                                  onClick={() =>
                                    theme !== "dark" && toggleTheme()
                                  }
                                >
                                  <Moon className="h-4 w-4" />
                                  <span>Dark</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  className="flex items-center gap-2 h-16"
                                  disabled
                                >
                                  <Monitor className="h-4 w-4" />
                                  <span>System</span>
                                </Button>
                              </div>
                            </div>

                            <Separator />

                            {/* Language & Region */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold">
                                Language & Region
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="language">Language</Label>
                                  <Select
                                    value={appearance.language}
                                    onValueChange={(value) =>
                                      handleAppearanceChange("language", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="en">
                                        English
                                      </SelectItem>
                                      <SelectItem value="es">
                                        Español
                                      </SelectItem>
                                      <SelectItem value="fr">
                                        Français
                                      </SelectItem>
                                      <SelectItem value="de">
                                        Deutsch
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="timezone">Timezone</Label>
                                  <Select
                                    value={appearance.timezone}
                                    onValueChange={(value) =>
                                      handleAppearanceChange("timezone", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="UTC-8">
                                        Pacific Time (UTC-8)
                                      </SelectItem>
                                      <SelectItem value="UTC-7">
                                        Mountain Time (UTC-7)
                                      </SelectItem>
                                      <SelectItem value="UTC-6">
                                        Central Time (UTC-6)
                                      </SelectItem>
                                      <SelectItem value="UTC-5">
                                        Eastern Time (UTC-5)
                                      </SelectItem>
                                      <SelectItem value="UTC+0">UTC</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>

                            <Separator />

                            {/* Sound Settings */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold">Sound</h4>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {appearance.soundEnabled ? (
                                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <VolumeX className="h-4 w-4 text-muted-foreground" />
                                  )}
                                  <span className="text-sm">
                                    Enable notification sounds
                                  </span>
                                </div>
                                <Switch
                                  checked={appearance.soundEnabled}
                                  onCheckedChange={(checked) =>
                                    handleAppearanceChange(
                                      "soundEnabled",
                                      checked
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <Button variant="hero">
                                <Palette className="h-4 w-4 mr-2" />
                                Save Appearance Settings
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                    </TabsContent>

                    {/* Account Settings */}
                    <TabsContent value="account">
                      <AnimatedCard delay={100}>
                        <Card className="professional-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Lock className="h-5 w-5 text-primary" />
                              Account & Security
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {/* Password */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold">
                                Password
                              </h4>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="currentPassword">
                                    Current Password
                                  </Label>
                                  <Input
                                    id="currentPassword"
                                    type="password"
                                    placeholder="Enter current password"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="newPassword">
                                    New Password
                                  </Label>
                                  <Input
                                    id="newPassword"
                                    type="password"
                                    placeholder="Enter new password"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="confirmPassword">
                                    Confirm New Password
                                  </Label>
                                  <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                  />
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Lock className="h-4 w-4 mr-2" />
                                Update Password
                              </Button>
                            </div>

                            <Separator />

                            {/* Data Export */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold">
                                Data Management
                              </h4>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-sm font-medium">
                                      Export your data
                                    </span>
                                    <p className="text-xs text-muted-foreground">
                                      Download a copy of your AlmaConnect data
                                    </p>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <Separator />

                            {/* Danger Zone */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold text-destructive">
                                Danger Zone
                              </h4>
                              <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-sm font-medium text-destructive">
                                      Delete Account
                                    </span>
                                    <p className="text-xs text-muted-foreground">
                                      Permanently delete your account and all
                                      data
                                    </p>
                                  </div>
                                  <Button variant="destructive" size="sm">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Account
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Settings Sidebar */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <AnimatedCard delay={200}>
                    <Card className="professional-card">
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Data
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Security Log
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <Bell className="h-4 w-4 mr-2" />
                          Notification Test
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedCard>

                  {/* Settings Summary */}
                  <AnimatedCard delay={300}>
                    <Card className="professional-card">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Settings Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Profile Visibility
                            </span>
                            <Badge variant="secondary">
                              {privacy.profileVisibility}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Theme</span>
                            <Badge variant="secondary">{theme}</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Notifications
                            </span>
                            <Badge variant="secondary">
                              {
                                Object.values(notifications).filter(Boolean)
                                  .length
                              }
                              /8 enabled
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Last Updated
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Just now
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedCard>

                  {/* Help & Support */}
                  <AnimatedCard delay={400}>
                    <Card className="professional-card">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Help & Support
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Need help with your settings? Our support team is here
                          to assist you.
                        </p>
                        <Button variant="hero" className="w-full" size="sm">
                          Contact Support
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;
