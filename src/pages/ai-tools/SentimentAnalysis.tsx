import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  BarChart3,
  PieChart,
  Calendar,
  Users,
  Filter,
  Download,
  RefreshCw,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Star,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const SentimentAnalysis = () => {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("30days");
  const [selectedSource, setSelectedSource] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Dummy sentiment data
  const overallSentiment = {
    positive: 68,
    neutral: 22,
    negative: 10,
    score: 7.8,
    trend: "+5.2",
    totalAnalyzed: 1247,
  };

  const sentimentSources = [
    {
      source: "Event Feedback",
      positive: 78,
      neutral: 15,
      negative: 7,
      volume: 324,
      trend: "+8.5",
    },
    {
      source: "Social Media",
      positive: 65,
      neutral: 25,
      negative: 10,
      volume: 892,
      trend: "+3.2",
    },
    {
      source: "Newsletter Responses",
      positive: 72,
      neutral: 20,
      negative: 8,
      volume: 156,
      trend: "+12.1",
    },
    {
      source: "Job Portal Reviews",
      positive: 58,
      neutral: 28,
      negative: 14,
      volume: 89,
      trend: "-2.3",
    },
  ];

  const recentFeedback = [
    {
      id: 1,
      text: "The annual reunion was absolutely fantastic! Great organization and wonderful to see everyone again.",
      sentiment: "positive",
      score: 0.89,
      source: "Event Feedback",
      timestamp: "2 hours ago",
      topics: ["reunion", "organization", "networking"],
    },
    {
      id: 2,
      text: "Love the new job portal features. Makes it so much easier to find relevant opportunities.",
      sentiment: "positive",
      score: 0.76,
      source: "Job Portal",
      timestamp: "5 hours ago",
      topics: ["job portal", "features", "opportunities"],
    },
    {
      id: 3,
      text: "The website could use some improvements in mobile responsiveness.",
      sentiment: "neutral",
      score: 0.12,
      source: "Website Feedback",
      timestamp: "1 day ago",
      topics: ["website", "mobile", "improvements"],
    },
    {
      id: 4,
      text: "Disappointed with the limited networking opportunities at the recent virtual event.",
      sentiment: "negative",
      score: -0.65,
      source: "Event Feedback",
      timestamp: "2 days ago",
      topics: ["virtual event", "networking", "limited"],
    },
    {
      id: 5,
      text: "The mentorship program has been incredibly valuable for my career growth!",
      sentiment: "positive",
      score: 0.92,
      source: "Program Feedback",
      timestamp: "3 days ago",
      topics: ["mentorship", "career growth", "valuable"],
    },
  ];

  const topTopics = [
    { topic: "Events", mentions: 324, sentiment: 0.78, trend: "up" },
    { topic: "Job Portal", mentions: 156, sentiment: 0.65, trend: "up" },
    { topic: "Networking", mentions: 298, sentiment: 0.72, trend: "stable" },
    { topic: "Website", mentions: 89, sentiment: 0.45, trend: "down" },
    { topic: "Mentorship", mentions: 145, sentiment: 0.85, trend: "up" },
    { topic: "Mobile App", mentions: 67, sentiment: 0.38, trend: "down" },
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Smile className="h-4 w-4 text-green-500" />;
      case "negative":
        return <Frown className="h-4 w-4 text-red-500" />;
      default:
        return <Meh className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "border-l-green-500 bg-green-50/50";
      case "negative":
        return "border-l-red-500 bg-red-50/50";
      default:
        return "border-l-yellow-500 bg-yellow-50/50";
    }
  };

  const runSentimentAnalysis = async () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsAnalyzing(false);
    toast({
      title: "Sentiment Analysis Complete!",
      description: "Updated sentiment insights based on latest feedback data.",
    });
  };

  const exportReport = () => {
    toast({
      title: "Report Generated!",
      description: "Sentiment analysis report has been downloaded.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div
          className={`flex transition-all duration-300 ${isOpen ? "" : "ml-0"}`}
        >
          <Sidebar />
          <main
            className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${
              isOpen ? "" : "max-w-full"
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      Analyzing Community Sentiment
                    </h3>
                    <p className="text-muted-foreground">
                      AI is processing feedback and social data...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div
        className={`flex transition-all duration-300 ${isOpen ? "" : "ml-0"}`}
      >
        <Sidebar />
        <main
          className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${
            isOpen ? "" : "max-w-full"
          }`}
        >
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/ai-hub")}
                className="shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <TrendingUp className="h-8 w-8 text-rose-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    Sentiment Analysis Dashboard
                  </h1>
                  <p className="text-muted-foreground">
                    Real-time alumni community sentiment insights
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <Card className="professional-card">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex gap-4">
                    <Select
                      value={selectedTimeframe}
                      onValueChange={setSelectedTimeframe}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">Last 7 Days</SelectItem>
                        <SelectItem value="30days">Last 30 Days</SelectItem>
                        <SelectItem value="90days">Last 90 Days</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={selectedSource}
                      onValueChange={setSelectedSource}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="events">Event Feedback</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="newsletter">Newsletter</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={exportReport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                    <Button
                      onClick={runSentimentAnalysis}
                      disabled={isAnalyzing}
                      className="alma-gradient text-primary-foreground"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Refresh Analysis
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overall Sentiment */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="professional-card">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Overall Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">
                      {overallSentiment.score}
                    </span>
                    <Badge className="bg-green-500/10 text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {overallSentiment.trend}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Out of 10</p>
                </CardContent>
              </Card>

              <Card className="professional-card">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Positive Sentiment
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-green-600">
                      {overallSentiment.positive}%
                    </span>
                    <ThumbsUp className="h-5 w-5 text-green-500" />
                  </div>
                  <Progress
                    value={overallSentiment.positive}
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>

              <Card className="professional-card">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Neutral Sentiment
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-yellow-600">
                      {overallSentiment.neutral}%
                    </span>
                    <Meh className="h-5 w-5 text-yellow-500" />
                  </div>
                  <Progress
                    value={overallSentiment.neutral}
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>

              <Card className="professional-card">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Negative Sentiment
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-red-600">
                      {overallSentiment.negative}%
                    </span>
                    <ThumbsDown className="h-5 w-5 text-red-500" />
                  </div>
                  <Progress
                    value={overallSentiment.negative}
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="sources" className="space-y-6">
              <TabsList>
                <TabsTrigger value="sources">By Source</TabsTrigger>
                <TabsTrigger value="topics">Top Topics</TabsTrigger>
                <TabsTrigger value="recent">Recent Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="sources" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sentimentSources.map((source, index) => (
                    <Card key={index} className="professional-card">
                      <CardHeader className="p-6">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {source.source}
                          </CardTitle>
                          <Badge
                            variant={
                              source.trend.startsWith("+")
                                ? "secondary"
                                : "outline"
                            }
                            className={
                              source.trend.startsWith("+")
                                ? "bg-green-500/10 text-green-600"
                                : "bg-red-500/10 text-red-600"
                            }
                          >
                            {source.trend}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {source.volume} responses analyzed
                        </p>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-green-600">
                              {source.positive}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Positive
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-yellow-600">
                              {source.neutral}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Neutral
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-red-600">
                              {source.negative}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Negative
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Progress value={source.positive} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Overall Sentiment</span>
                            <span>
                              {source.positive > 60
                                ? "Very Positive"
                                : source.positive > 40
                                ? "Positive"
                                : "Mixed"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="topics" className="space-y-6">
                <Card className="professional-card">
                  <CardHeader>
                    <CardTitle>Trending Topics</CardTitle>
                    <p className="text-muted-foreground">
                      Most discussed topics and their sentiment scores
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{topic.topic}</h4>
                            <Badge variant="outline">
                              {topic.mentions} mentions
                            </Badge>
                            {topic.trend === "up" && (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            )}
                            {topic.trend === "down" && (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Sentiment Score: {(topic.sentiment * 10).toFixed(1)}
                            /10
                          </div>
                        </div>
                        <div className="text-right">
                          <Progress
                            value={topic.sentiment * 100}
                            className="h-2 w-24"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recent" className="space-y-6">
                <div className="space-y-4">
                  {recentFeedback.map((feedback) => (
                    <Card
                      key={feedback.id}
                      className={`professional-card border-l-4 ${getSentimentColor(
                        feedback.sentiment
                      )}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-2">
                              {getSentimentIcon(feedback.sentiment)}
                              <Badge variant="outline">{feedback.source}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {feedback.timestamp}
                              </span>
                            </div>
                            <p className="text-foreground leading-relaxed">
                              {feedback.text}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {feedback.topics.map((topic, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold">
                              Score: {feedback.score > 0 ? "+" : ""}
                              {feedback.score.toFixed(2)}
                            </div>
                            <Progress
                              value={Math.abs(feedback.score) * 100}
                              className="h-1 w-16 mt-1"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
