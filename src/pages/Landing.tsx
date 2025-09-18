import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  GraduationCap,
  Sparkles,
  Globe,
  ArrowRight,
  Star,
  Building,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

const Landing = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">AlmaConnect</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Alumni Network Platform
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="bg-background/80 backdrop-blur-sm border"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Link to="/signin">
                <Button variant="outline" className="hidden sm:inline-flex">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="alma-gradient text-primary-foreground">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 hero-gradient opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Sparkles className="h-3 w-3 mr-1" />
                Connect • Network • Grow
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
                Your Alumni Network
                <br />
                <span className="alma-gradient bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Connect with fellow alumni, discover career opportunities, share
                your journey, and build meaningful professional relationships
                that last a lifetime.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="alma-gradient text-primary-foreground w-full sm:w-auto"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/signin">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-border mt-12">
              <p className="text-sm text-muted-foreground mb-6">
                Trusted by alumni from top universities worldwide
              </p>
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Alumni
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">50+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Everything You Need to Stay Connected
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you build and maintain
              meaningful professional relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="professional-card hover:alma-shadow-strong transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Network & Connect
                </h3>
                <p className="text-muted-foreground">
                  Find and connect with alumni from your university across
                  different batches, departments, and locations.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card hover:alma-shadow-strong transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Career Opportunities
                </h3>
                <p className="text-muted-foreground">
                  Discover job openings, get referrals, and advance your career
                  with help from your alumni network.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card hover:alma-shadow-strong transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Mentorship
                </h3>
                <p className="text-muted-foreground">
                  Get guidance from senior alumni or mentor junior students.
                  Share knowledge and grow together.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card hover:alma-shadow-strong transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Global Events
                </h3>
                <p className="text-muted-foreground">
                  Attend alumni meetups, networking events, and reunions
                  happening around the world.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card hover:alma-shadow-strong transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  AI-Powered Insights
                </h3>
                <p className="text-muted-foreground">
                  Get personalized recommendations for connections,
                  opportunities, and career growth.
                </p>
              </CardContent>
            </Card>

            <Card className="professional-card hover:alma-shadow-strong transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Success Stories
                </h3>
                <p className="text-muted-foreground">
                  Share your achievements and get inspired by the success
                  stories of fellow alumni.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="professional-card bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 sm:p-12 text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Ready to Reconnect?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of alumni who are already building meaningful
                connections and advancing their careers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="alma-gradient text-primary-foreground w-full sm:w-auto"
                  >
                    Create Your Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Already a Member? Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold text-primary">AlmaConnect</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 AlmaConnect. Connecting alumni worldwide.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
