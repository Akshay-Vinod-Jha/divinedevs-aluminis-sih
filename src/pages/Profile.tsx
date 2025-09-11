import {
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Mail,
  Phone,
  Globe,
  Edit,
  Settings,
  Award,
  TrendingUp,
  Users as UsersIcon,
  Eye,
  MessageCircle,
  Star,
  Building,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useState, useEffect, useRef } from "react";

// Custom hook for counting animation
const useCountUp = (
  end: number,
  duration: number = 2000,
  start: number = 0
) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easeOutQuart * (end - start) + start));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, start]);

  return count;
};

// Custom hook for intersection observer animations
const useIntersectionAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin: "50px" }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return [elementRef, isVisible];
};

// Custom hook for skill progress animation
const useSkillProgress = (targetValue: number, delay: number = 0) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = Math.min((timestamp - startTime) / 1500, 1); // 1.5s animation

        const easeOutCubic = 1 - Math.pow(1 - elapsed, 3);
        setProgress(easeOutCubic * targetValue);

        if (elapsed < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, delay);

    return () => clearTimeout(timer);
  }, [targetValue, delay]);

  return progress;
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Counting animations for profile analytics
  const profileViewsCount = useCountUp(247, 2200);
  const connectionsCount = useCountUp(156, 2400);
  const postsCount = useCountUp(23, 2000);
  const followersCount = useCountUp(89, 2600);

  // Skills data
  const skills = [
    { name: "React", level: 95, endorsements: 23 },
    { name: "TypeScript", level: 90, endorsements: 18 },
    { name: "Node.js", level: 85, endorsements: 15 },
    { name: "Python", level: 80, endorsements: 12 },
    { name: "AWS", level: 75, endorsements: 10 },
    { name: "Team Leadership", level: 88, endorsements: 16 },
  ];

  // Pre-calculate all skill animations at the top level
  const skillProgressValues = [
    useSkillProgress(95, 0),
    useSkillProgress(90, 200),
    useSkillProgress(85, 400),
    useSkillProgress(80, 600),
    useSkillProgress(75, 800),
    useSkillProgress(88, 1000),
  ];

  // Intersection observer animations for sections
  const [analyticsRef, isAnalyticsVisible] = useIntersectionAnimation(0.2);

  const skillEndorsementCounts = [
    useCountUp(23, 1800),
    useCountUp(18, 1900),
    useCountUp(15, 2000),
    useCountUp(12, 2100),
    useCountUp(10, 2200),
    useCountUp(16, 2300),
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // User Profile Data
  const userProfile = {
    name: "Sarah Johnson",
    title: "Senior Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    batch: "2020",
    department: "Computer Science",
    email: "sarah.johnson@gmail.com",
    phone: "+1 (555) 123-4567",
    website: "www.sarahjohnson.dev",
    avatar: "/api/placeholder/128/128",
    coverImage: "/api/placeholder/800/300",
    bio: "Passionate software engineer with 4+ years of experience building scalable web applications. Alumni of Computer Science Department, Class of 2020. Currently leading the frontend team for Google's cloud infrastructure products.",
    joinedDate: "September 2020",
    profileViews: 247,
    connections: 156,
    posts: 23,
    followers: 89,
    following: 134,
  };

  // Career Experience
  const experience = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Google",
      duration: "Jan 2023 - Present",
      location: "Mountain View, CA",
      description:
        "Leading frontend development for Google Cloud infrastructure products. Managing a team of 5 engineers and driving technical decisions for scalable React applications.",
      skills: ["React", "TypeScript", "Node.js", "GCP", "Team Leadership"],
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "Meta",
      duration: "Jun 2021 - Dec 2022",
      location: "Menlo Park, CA",
      description:
        "Developed and maintained React components for Instagram's web platform. Optimized performance resulting in 25% faster load times.",
      skills: ["React", "JavaScript", "GraphQL", "Performance Optimization"],
    },
    {
      id: 3,
      title: "Junior Software Developer",
      company: "TechStart Inc.",
      duration: "Aug 2020 - May 2021",
      location: "San Francisco, CA",
      description:
        "Built full-stack web applications using MERN stack. Collaborated with designers to implement responsive user interfaces.",
      skills: ["MongoDB", "Express.js", "React", "Node.js"],
    },
  ];

  // Education Background
  const education = [
    {
      id: 1,
      institution: "University of Technology",
      degree: "Bachelor of Technology",
      field: "Computer Science",
      duration: "2016 - 2020",
      grade: "CGPA: 8.7/10",
      achievements: [
        "Dean's List",
        "Best Final Year Project",
        "Coding Club President",
      ],
    },
    {
      id: 2,
      institution: "Tech High School",
      degree: "High School Diploma",
      field: "Science",
      duration: "2014 - 2016",
      grade: "95.2%",
      achievements: ["Valedictorian", "Science Olympiad Gold Medal"],
    },
  ];

  // Recent Activity
  const recentActivity = [
    {
      id: 1,
      type: "post",
      content: "Published an article about React performance optimization",
      timestamp: "2 days ago",
      engagement: { likes: 45, comments: 8, shares: 12 },
    },
    {
      id: 2,
      type: "connection",
      content:
        "Connected with 3 new alumni from the Computer Science department",
      timestamp: "1 week ago",
      engagement: null,
    },
    {
      id: 3,
      type: "achievement",
      content: "Completed AWS Solutions Architect certification",
      timestamp: "2 weeks ago",
      engagement: { likes: 67, comments: 15 },
    },
  ];

  // Achievements & Certifications
  const achievements = [
    {
      id: 1,
      title: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "March 2024",
      credentialId: "AWS-SAA-123456",
    },
    {
      id: 2,
      title: "Google Cloud Professional",
      issuer: "Google Cloud",
      date: "January 2024",
      credentialId: "GCP-PCA-789012",
    },
    {
      id: 3,
      title: "Team Excellence Award",
      issuer: "Google",
      date: "December 2023",
      credentialId: "TEAM-EXC-345678",
    },
  ];

  // Professional Loader Component
  const ProfessionalLoader = () => (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Cover & Profile Section Skeleton */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        </div>
        <div className="relative -mt-16 ml-8">
          <div className="w-32 h-32 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full border-4 border-background animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Profile Info Skeleton */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="professional-card">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="h-8 bg-gradient-to-r from-primary/20 to-transparent rounded animate-pulse w-64"></div>
                <div className="h-5 bg-muted/50 rounded animate-pulse w-48"></div>
                <div className="h-4 bg-muted/40 rounded animate-pulse w-32"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted/50 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-1/2"></div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="grid w-full grid-cols-4 gap-1 bg-muted/30 rounded-lg p-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-9 bg-muted/50 rounded-md animate-pulse"
                ></div>
              ))}
            </div>

            {[...Array(3)].map((_, index) => (
              <Card key={index} className="professional-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gradient-to-r from-primary/20 to-transparent rounded animate-pulse w-48"></div>
                      <div className="h-4 bg-muted/50 rounded animate-pulse w-32"></div>
                      <div className="h-3 bg-muted/40 rounded animate-pulse w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted/50 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-muted/50 rounded animate-pulse w-2/3"></div>
                  </div>
                  <div className="flex gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-6 w-16 bg-muted/40 rounded-full animate-pulse"
                      ></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="professional-card">
              <CardHeader>
                <div className="h-5 bg-gradient-to-r from-primary/20 to-transparent rounded animate-pulse w-32"></div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-muted/50 rounded animate-pulse w-20"></div>
                      <div className="h-4 bg-muted/40 rounded animate-pulse w-8"></div>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full animate-pulse"></div>
                  </div>
                ))}
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
              Loading profile
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
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          {isLoading ? (
            <ProfessionalLoader />
          ) : (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Cover Photo & Profile Header */}
              <div className="relative">
                <div className="h-48 sm:h-64 hero-gradient rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>

                  {/* Profile content inside hero section */}
                  <div className="relative h-full flex items-end p-4 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 w-full">
                      <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white alma-shadow-strong">
                        <AvatarImage
                          src={userProfile.avatar}
                          alt={userProfile.name}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl sm:text-4xl">
                          {userProfile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0 pb-0 sm:pb-2">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4">
                          <div className="flex-1 min-w-0">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white truncate">
                              {userProfile.name}
                            </h1>
                            <p className="text-sm sm:text-base lg:text-lg text-white/90 truncate">
                              {userProfile.title}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 lg:gap-4 mt-2 text-xs lg:text-sm text-white/80">
                              <span className="flex items-center gap-1">
                                <Building className="h-3 w-3 lg:h-4 lg:w-4" />
                                <span className="truncate">
                                  {userProfile.company}
                                </span>
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 lg:h-4 lg:w-4" />
                                <span className="truncate">
                                  {userProfile.location}
                                </span>
                              </span>
                              <span className="flex items-center gap-1">
                                <GraduationCap className="h-3 w-3 lg:h-4 lg:w-4" />
                                <span className="truncate">
                                  Class of {userProfile.batch}
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto"
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                            <Button
                              size="sm"
                              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* About Section */}
                  <Card className="professional-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        About
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {userProfile.bio}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {userProfile.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {userProfile.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          {userProfile.website}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Joined {userProfile.joinedDate}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tabbed Content */}
                  <Tabs defaultValue="experience" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                      <TabsTrigger
                        value="experience"
                        className="text-xs sm:text-sm"
                      >
                        Experience
                      </TabsTrigger>
                      <TabsTrigger
                        value="education"
                        className="text-xs sm:text-sm"
                      >
                        Education
                      </TabsTrigger>
                      <TabsTrigger
                        value="activity"
                        className="text-xs sm:text-sm"
                      >
                        Activity
                      </TabsTrigger>
                      <TabsTrigger
                        value="achievements"
                        className="text-xs sm:text-sm"
                      >
                        Awards
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="experience" className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold text-foreground">
                          Work Experience
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {experience.map((exp) => (
                          <Card key={exp.id} className="professional-card">
                            <CardContent className="p-4 sm:p-6">
                              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Briefcase className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-foreground">
                                    {exp.title}
                                  </h4>
                                  <p className="text-muted-foreground">
                                    {exp.company}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {exp.duration} • {exp.location}
                                  </p>
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    {exp.description}
                                  </p>
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {exp.skills.map((skill) => (
                                      <Badge
                                        key={skill}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="education" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">
                          Education
                        </h3>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {education.map((edu) => (
                          <Card key={edu.id} className="professional-card">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                  <GraduationCap className="h-6 w-6 text-accent" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-foreground">
                                    {edu.degree}
                                  </h4>
                                  <p className="text-muted-foreground">
                                    {edu.institution}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {edu.field} • {edu.duration}
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {edu.grade}
                                  </p>
                                  <div className="mt-3 space-y-1">
                                    {edu.achievements.map(
                                      (achievement, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center gap-2"
                                        >
                                          <Award className="h-4 w-4 text-success" />
                                          <span className="text-sm text-muted-foreground">
                                            {achievement}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        Recent Activity
                      </h3>
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <Card key={activity.id} className="professional-card">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    activity.type === "post"
                                      ? "bg-primary/10"
                                      : activity.type === "connection"
                                      ? "bg-accent/10"
                                      : "bg-success/10"
                                  }`}
                                >
                                  {activity.type === "post" && (
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                  )}
                                  {activity.type === "connection" && (
                                    <UsersIcon className="h-5 w-5 text-accent" />
                                  )}
                                  {activity.type === "achievement" && (
                                    <Award className="h-5 w-5 text-success" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="text-foreground">
                                    {activity.content}
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {activity.timestamp}
                                  </p>
                                  {activity.engagement && (
                                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                      <span>
                                        {activity.engagement.likes} likes
                                      </span>
                                      <span>
                                        {activity.engagement.comments} comments
                                      </span>
                                      {activity.engagement.shares && (
                                        <span>
                                          {activity.engagement.shares} shares
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="achievements" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">
                          Certifications & Awards
                        </h3>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Add Certificate
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {achievements.map((achievement) => (
                          <Card
                            key={achievement.id}
                            className="professional-card"
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                                  <Award className="h-6 w-6 text-warning" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-foreground">
                                    {achievement.title}
                                  </h4>
                                  <p className="text-muted-foreground">
                                    {achievement.issuer}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {achievement.date}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Credential ID: {achievement.credentialId}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Profile Stats */}
                  {/* Profile Stats */}
                  <Card className="professional-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Profile Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">
                            {profileViewsCount}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                            <Eye className="h-3 w-3" />
                            Profile views
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">
                            {connectionsCount}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                            <UsersIcon className="h-3 w-3" />
                            Connections
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">
                            {postsCount}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Posts
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">
                            {followersCount}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Followers
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills & Endorsements */}
                  <Card className="professional-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Skills & Endorsements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {skills.map((skill, index) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">
                              {skill.name}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="h-3 w-3 fill-current text-primary" />
                              {skillEndorsementCounts[index]}
                            </div>
                          </div>
                          <Progress
                            value={skillProgressValues[index]}
                            className="h-2"
                          />
                        </div>
                      ))}
                      <Button variant="outline" className="w-full" size="sm">
                        View All Skills
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card className="professional-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Contact Info
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {userProfile.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {userProfile.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-primary cursor-pointer hover:underline">
                            {userProfile.website}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {userProfile.location}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="professional-card">
                    <CardContent className="p-4 space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        size="sm"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Account Settings
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Privacy Settings
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        size="sm"
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Analytics Dashboard
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
