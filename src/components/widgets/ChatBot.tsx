import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Bot, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatBot = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AlmaConnect AI assistant. I can help you find alumni, explore career opportunities, or answer questions about our platform. What would you like to know?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hide ChatBot on authentication and landing pages
  const authPages = ['/signin', '/signup', '/'];
  const isAuthPage = authPages.includes(location.pathname);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  // Smart default responses based on user input
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('alumni') || input.includes('network')) {
      return "Great! I can help you connect with alumni. You can search for alumni by graduation year, company, or location in the Network section. Would you like me to guide you to specific features?";
    }
    
    if (input.includes('job') || input.includes('career') || input.includes('opportunity')) {
      return "Excellent! For career opportunities, check out our Jobs section where you can find positions posted by alumni and partner companies. You can also set up job alerts based on your preferences. Need help setting this up?";
    }
    
    if (input.includes('event') || input.includes('reunion') || input.includes('meetup')) {
      return "Perfect! Our Events section shows upcoming alumni gatherings, professional meetups, and networking events. You can RSVP and even create your own events. Want to see what's coming up?";
    }
    
    if (input.includes('profile') || input.includes('update') || input.includes('edit')) {
      return "I can help with profile management! You can update your professional information, add achievements, and customize your visibility settings in the Profile section. What specifically would you like to update?";
    }
    
    if (input.includes('message') || input.includes('chat') || input.includes('contact')) {
      return "For messaging, you can directly reach out to other alumni through their profiles or use our messaging system. Remember to keep conversations professional and respectful. Need help finding someone specific?";
    }
    
    if (input.includes('help') || input.includes('how') || input.includes('guide')) {
      return "I'm here to help! You can navigate through different sections like Network (find alumni), Jobs (career opportunities), Events (meetups & reunions), and Messages (connect with others). What would you like to explore first?";
    }
    
    if (input.includes('settings') || input.includes('privacy') || input.includes('notification')) {
      return "For account settings, privacy controls, and notification preferences, visit the Settings page. You can customize your experience, manage privacy settings, and control how you receive updates. Need help with specific settings?";
    }
    
    if (input.includes('thank') || input.includes('thanks')) {
      return "You're very welcome! I'm always here to help you make the most of your AlmaConnect experience. Feel free to ask me anything else!";
    }
    
    if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return "Hello there! Welcome to AlmaConnect. I'm here to help you navigate our platform, connect with alumni, and discover opportunities. What can I assist you with today?";
    }
    
    // Default response for unrecognized inputs
    return "Thank you for your message! I can help you with alumni networking, job opportunities, events, profile management, and platform navigation. Could you please be more specific about what you'd like to know or do? I'm here to make your AlmaConnect experience better!";
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage("");

    // Generate contextual AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(currentMessage),
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Don't render ChatBot on auth pages
  if (isAuthPage) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 md:h-14 md:w-14 rounded-full alma-gradient alma-shadow-strong pulse-glow float-animation z-50"
          size="icon"
        >
          <Bot className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 w-80 max-w-[calc(100vw-2rem)] alma-shadow-strong z-50 transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[32rem] max-h-[calc(100vh-2rem)]'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-surface rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 alma-gradient">
                <AvatarFallback className="text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">AlmaConnect AI</h3>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? (
                  <Maximize2 className="h-3 w-3" />
                ) : (
                  <Minimize2 className="h-3 w-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-[calc(100%-4rem)]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`${
                        msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p className={`text-xs mt-2 opacity-70 ${
                        msg.sender === 'user' ? 'text-muted-foreground' : 'text-primary-foreground/70'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-surface rounded-b-lg">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-background"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="alma-gradient alma-shadow"
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
};

export default ChatBot;