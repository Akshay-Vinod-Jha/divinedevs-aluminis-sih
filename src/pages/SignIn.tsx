import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, GraduationCap, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Dummy login - always succeeds
        navigate("/dashboard");
      } else {
        setError("Please fill in all required fields");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "demo@almaconnect.com",
      password: "demo123",
      rememberMe: false
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding & Info */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-8 h-8 bg-white/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-32 w-12 h-12 bg-white/15 rounded-full animate-pulse"></div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-8 text-white">
          <div className="space-y-8">
            {/* Logo & Branding */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">AlmaConnect</h1>
                  <p className="text-white/80">Alumni Network Platform</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Welcome Back!</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Reconnect with your alma mater and fellow alumni. Share your journey, discover opportunities, and build lasting professional relationships.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <span className="text-white/90">Connect with 10,000+ alumni worldwide</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="text-white/90">Discover career opportunities and mentorship</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <span className="text-white/90">Share your success stories and inspire others</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-white/80">Alumni</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-white/80">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-white/80">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 alma-gradient rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">AlmaConnect</h1>
            </div>
            <p className="text-muted-foreground">Alumni Network Platform</p>
          </div>

          <Card className="professional-card">
            <CardHeader className="space-y-1 text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">Sign In</CardTitle>
              <p className="text-muted-foreground">
                Welcome back! Please sign in to your account
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full alma-gradient text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Demo Login */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or try demo</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleDemoLogin}
              >
                <Badge variant="secondary" className="mr-2">Demo</Badge>
                Use Demo Account
              </Button>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline font-medium">
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground">
            <p>
              By signing in, you agree to our{" "}
              <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
