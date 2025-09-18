import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  Calendar,
  Building,
  Sun,
  Moon,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Note: Removed automatic redirect logic
  // Users must complete the sign-up form to proceed
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Academic Info
    batchYear: "",
    department: "",
    studentId: "",

    // Professional Info
    currentRole: "",
    company: "",
    location: "",

    // Agreement
    agreeToTerms: false,
    subscribeNewsletter: true,
  });
  const [error, setError] = useState("");

  const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Business Administration",
    "Economics",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Psychology",
    "English Literature",
    "Other",
  ];

  const batchYears = Array.from({ length: 30 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep < 3) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
        setError("");
      }
      return;
    }

    // Final submission
    setIsLoading(true);
    setError("");

    // Validate final step
    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms of Service to continue");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Dummy signup - always succeeds
      login();
      navigate("/dashboard", { replace: true });
      setIsLoading(false);
    }, 2000);
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (
          !formData.firstName ||
          !formData.lastName ||
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          setError("Please fill in all required fields");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return false;
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters long");
          return false;
        }
        break;
      case 2:
        if (!formData.batchYear || !formData.department) {
          setError("Please fill in all required academic information");
          return false;
        }
        break;
    }
    return true;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError("");
    }
  };

  const fillDemoData = () => {
    setFormData({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@almaconnect.com",
      password: "demo123",
      confirmPassword: "demo123",
      batchYear: "2020",
      department: "Computer Science",
      studentId: "CS20001",
      currentRole: "Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      agreeToTerms: true,
      subscribeNewsletter: true,
    });
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
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
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            className="pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="batchYear">Graduation Year *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Select
              value={formData.batchYear}
              onValueChange={(value) => handleInputChange("batchYear", value)}
            >
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {batchYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department *</Label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Select
              value={formData.department}
              onValueChange={(value) => handleInputChange("department", value)}
            >
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="studentId">Student ID (Optional)</Label>
        <Input
          id="studentId"
          placeholder="e.g., CS20001"
          value={formData.studentId}
          onChange={(e) => handleInputChange("studentId", e.target.value)}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentRole">Current Role (Optional)</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="currentRole"
            placeholder="e.g., Software Engineer"
            value={formData.currentRole}
            onChange={(e) => handleInputChange("currentRole", e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company (Optional)</Label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="company"
            placeholder="e.g., Google, Microsoft"
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location (Optional)</Label>
        <Input
          id="location"
          placeholder="e.g., San Francisco, CA"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) =>
              handleInputChange("agreeToTerms", checked as boolean)
            }
            className="mt-1"
          />
          <Label
            htmlFor="terms"
            className="text-sm leading-relaxed cursor-pointer"
          >
            I agree to the{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{" "}
            *
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="newsletter"
            checked={formData.subscribeNewsletter}
            onCheckedChange={(checked) =>
              handleInputChange("subscribeNewsletter", checked as boolean)
            }
            className="mt-1"
          />
          <Label
            htmlFor="newsletter"
            className="text-sm leading-relaxed cursor-pointer"
          >
            Subscribe to our newsletter for alumni updates and opportunities
          </Label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex relative">
      {/* Theme Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>

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
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-primary/20">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">AlmaConnect</h1>
                  <p className="text-white/80">Alumni Network Platform</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Join Our Community</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Connect with fellow alumni, discover career opportunities, and
                share your professional journey with a global network of
                achievers.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-white/90">
                    Network with alumni across 50+ countries
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="text-white/90">
                    Access exclusive job opportunities
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-white/90">
                    Mentorship and career guidance
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Registration</h3>
              <div className="space-y-3">
                <div
                  className={`flex items-center gap-3 ${
                    currentStep >= 1 ? "text-white" : "text-white/50"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      currentStep >= 1 ? "bg-white text-primary" : "bg-white/20"
                    }`}
                  >
                    1
                  </div>
                  <span>Personal Information</span>
                </div>
                <div
                  className={`flex items-center gap-3 ${
                    currentStep >= 2 ? "text-white" : "text-white/50"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      currentStep >= 2 ? "bg-white text-primary" : "bg-white/20"
                    }`}
                  >
                    2
                  </div>
                  <span>Academic Background</span>
                </div>
                <div
                  className={`flex items-center gap-3 ${
                    currentStep >= 3 ? "text-white" : "text-white/50"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      currentStep >= 3 ? "bg-white text-primary" : "bg-white/20"
                    }`}
                  >
                    3
                  </div>
                  <span>Professional Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-primary">AlmaConnect</h1>
            </div>
            <p className="text-muted-foreground">Alumni Network Platform</p>
          </div>

          {/* Mobile Progress */}
          <div className="lg:hidden">
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep >= step
                      ? "alma-gradient text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          <Card className="professional-card">
            <CardHeader className="space-y-1 text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">
                {currentStep === 1 && "Create Account"}
                {currentStep === 2 && "Academic Info"}
                {currentStep === 3 && "Professional Details"}
              </CardTitle>
              <p className="text-muted-foreground">
                {currentStep === 1 && "Let's start with your basic information"}
                {currentStep === 2 && "Tell us about your academic background"}
                {currentStep === 3 && "Add your professional details"}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}

                <div className="flex gap-3">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevStep}
                      className="flex-1"
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="flex-1 alma-gradient text-primary-foreground"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : currentStep === 3 ? (
                      "Create Account"
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </div>
              </form>

              {/* Demo Fill */}
              {currentStep === 1 && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Quick demo
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={fillDemoData}
                  >
                    <Badge variant="secondary" className="mr-2">
                      Demo
                    </Badge>
                    Fill Demo Data
                  </Button>
                </>
              )}

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
