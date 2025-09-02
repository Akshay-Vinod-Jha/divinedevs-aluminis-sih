import { MessageCircle, Send, Paperclip, Search, Phone, Video, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";
import { PageLayout, AnimatedCard, StaggeredList } from "@/components/animations/PageAnimations";

const Messages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const { isOpen } = useSidebar();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const conversations = [
    {
      id: 1,
      name: "Alex Chen",
      lastMessage: "Hey! How's the new job going?",
      time: "2m ago",
      unread: 2,
      avatar: "/api/placeholder/40/40",
      online: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      lastMessage: "Thanks for the referral!",
      time: "1h ago",
      unread: 0,
      avatar: "/api/placeholder/40/40",
      online: false
    },
    {
      id: 3,
      name: "Alumni Group Chat",
      lastMessage: "Who's joining the reunion?",
      time: "3h ago",
      unread: 5,
      avatar: "/api/placeholder/40/40",
      online: false,
      isGroup: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Alex Chen",
      content: "Hey Sarah! How's everything going at your new role?",
      time: "10:30 AM",
      isMe: false
    },
    {
      id: 2,
      sender: "You",
      content: "Hi Alex! It's going great, thanks for asking. Really enjoying the challenges here.",
      time: "10:32 AM",
      isMe: true
    },
    {
      id: 3,
      sender: "Alex Chen",
      content: "That's awesome! We should grab coffee sometime and catch up properly.",
      time: "10:35 AM",
      isMe: false
    },
    {
      id: 4,
      sender: "You",
      content: "Absolutely! Are you free this weekend?",
      time: "10:36 AM",
      isMe: true
    }
  ];

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  // Professional Loader for Messages
  const ProfessionalLoader = () => (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Conversations List Loader */}
      <div className="w-80 border-r border-border bg-surface flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="h-6 w-24 bg-muted/50 rounded animate-pulse mb-3"></div>
          <div className="h-10 bg-muted/50 rounded-md animate-pulse"></div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 w-24 bg-muted/50 rounded animate-pulse"></div>
                    <div className="h-3 w-12 bg-muted/40 rounded animate-pulse"></div>
                  </div>
                  <div className="h-3 w-40 bg-muted/40 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area Loader */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border bg-surface flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted/50 rounded animate-pulse"></div>
              <div className="h-3 w-20 bg-muted/40 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-muted/50 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-xs lg:max-w-md h-16 rounded-lg animate-pulse ${
                i % 2 === 0 ? "bg-muted/50" : "bg-gradient-to-r from-primary/20 to-accent/20"
              }`}></div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border bg-surface">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted/50 rounded animate-pulse"></div>
            <div className="h-10 flex-1 bg-muted/50 rounded-md animate-pulse"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-3 bg-background/80 backdrop-blur-sm rounded-lg p-4">
          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
          <div className="text-sm font-medium text-foreground">Loading messages</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className={`flex transition-all duration-300 ${isOpen ? '' : 'ml-0'}`}>
        <Sidebar />
        <main className={`flex-1 flex h-[calc(100vh-64px)] transition-all duration-300 ${isOpen ? '' : 'max-w-full'}`}>
          {isLoading ? (
            <ProfessionalLoader />
          ) : (
            <PageLayout className="flex w-full max-w-none p-0">
              <AnimatedCard delay={200} className="w-80 border-r border-border bg-surface flex flex-col">
                <div className="p-4 border-b border-border">
                  <h1 className="text-xl font-bold text-foreground flex items-center gap-2 mb-3">
                    <MessageCircle className="h-5 w-5" />
                    Messages
                  </h1>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search conversations..." className="pl-10" />
                  </div>
                </div>
            
                <div className="flex-1 overflow-y-auto">
                  <StaggeredList delay={400}>
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`p-4 border-b border-border cursor-pointer alma-transition ${
                          selectedChat === conv.id ? "bg-surface-hover" : "hover:bg-surface-hover"
                        }`}
                        onClick={() => setSelectedChat(conv.id)}
                      >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conv.avatar} />
                        <AvatarFallback>{conv.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm truncate">{conv.name}</h3>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                    ))}
                  </StaggeredList>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={600} className="flex-1 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-border bg-surface flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedConversation.avatar} />
                          <AvatarFallback>{selectedConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{selectedConversation.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {selectedConversation.online ? "Active now" : "Last seen 1h ago"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      <StaggeredList delay={800}>
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.isMe
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-surface border border-border"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`}>
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </StaggeredList>
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-border bg-surface">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1"
                        />
                        <Button size="sm" className="alma-gradient text-primary-foreground">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-center">
                    <div>
                      <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Select a conversation</h3>
                      <p className="text-muted-foreground">Choose from your existing conversations or start a new one</p>
                    </div>
                  </div>
                )}
              </AnimatedCard>
            </PageLayout>
          )}
        </main>
      </div>
    </div>
  );
};

export default Messages;