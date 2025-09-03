import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
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
              <Route path="/dashboard" element={<Index />} />
              <Route path="/network" element={<Network />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/events" element={<Events />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/ai" element={<AIHub />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/storytimeline" element={<StoryTimeline />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* Global ChatBot - Available on all pages except auth and landing pages */}
            <ChatBot />
          </BrowserRouter>
        </TooltipProvider>
      </SidebarProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
