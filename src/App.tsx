import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ChatBot from "@/components/widgets/ChatBot";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import StoryTimeline from "./pages/StoryTimeline";
import Network from "./pages/Network";
import Messages from "./pages/Messages";
import Events from "./pages/Events";
import Jobs from "./pages/Jobs";
import AIHub from "./pages/AIHub";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import MentorRecommendation from "./pages/ai-tools/MentorRecommendation";
import JobMatch from "./pages/ai-tools/JobMatch";
import DonationPrediction from "./pages/ai-tools/DonationPrediction";
import EventPrediction from "./pages/ai-tools/EventPrediction";
import SentimentAnalysis from "./pages/ai-tools/SentimentAnalysis";
import FraudDetection from "./pages/ai-tools/FraudDetection";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected Routes - Main App */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/network"
                  element={
                    <ProtectedRoute>
                      <Network />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/messages"
                  element={
                    <ProtectedRoute>
                      <Messages />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/events"
                  element={
                    <ProtectedRoute>
                      <Events />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs"
                  element={
                    <ProtectedRoute>
                      <Jobs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-hub"
                  element={
                    <ProtectedRoute>
                      <AIHub />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/storytimeline"
                  element={
                    <ProtectedRoute>
                      <StoryTimeline />
                    </ProtectedRoute>
                  }
                />

                {/* AI Hub Tool Routes */}
                <Route
                  path="/ai-hub/mentor-recommendation"
                  element={
                    <ProtectedRoute>
                      <MentorRecommendation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-hub/job-match"
                  element={
                    <ProtectedRoute>
                      <JobMatch />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-hub/donation-prediction"
                  element={
                    <ProtectedRoute>
                      <DonationPrediction />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-hub/event-prediction"
                  element={
                    <ProtectedRoute>
                      <EventPrediction />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-hub/sentiment-analysis"
                  element={
                    <ProtectedRoute>
                      <SentimentAnalysis />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-hub/fraud-detection"
                  element={
                    <ProtectedRoute>
                      <FraudDetection />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              {/* Global ChatBot - Available on all pages except auth and landing pages */}
              <ChatBot />
            </BrowserRouter>
          </TooltipProvider>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
