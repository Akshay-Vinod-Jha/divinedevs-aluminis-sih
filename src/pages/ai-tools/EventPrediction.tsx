import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ArrowLeft,
  TrendingUp,
  Users,
  MapPin,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Loader2,
  Download,
  RefreshCw,
  Star,
  Thermometer,
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

const EventPrediction = () => {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("upcoming");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Dummy event prediction data
  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Alumni Reunion 2025",
      date: "2025-10-15",
      time: "6:00 PM",
      location: "University Campus",
      category: "Social",
      capacity: 500,
      predictedAttendance: 387,
      confidenceScore: 92,
      registrations: 245,
      factors: {
        popularity: 95,
        timing: 88,
        location: 92,
        weather: 85,
        competition: 78,
      },
      demographics: {
        "2015-2020": 35,
        "2010-2015": 28,
        "2005-2010": 22,
        "2000-2005": 15,
      },
      riskFactors: ["Weather dependent", "Peak season"],
      recommendations: [
        "Consider backup indoor venue",
        "Increase early bird promotion",
        "Target 2015-2020 graduates",
      ],
    },
    {
      id: 2,
      title: "Tech Career Workshop",
      date: "2025-09-25",
      time: "2:00 PM",
      location: "Virtual Event",
      category: "Professional",
      capacity: 200,
      predictedAttendance: 156,
      confidenceScore: 87,
      registrations: 89,
      factors: {
        popularity: 88,
        timing: 95,
        location: 100,
        weather: 100,
        competition: 72,
      },
      demographics: {
        "2015-2020": 45,
        "2010-2015": 35,
        "2005-2010": 15,
        "2000-2005": 5,
      },
      riskFactors: ["Virtual fatigue", "Competing events"],
      recommendations: [
        "Add interactive breakout sessions",
        "Promote hands-on workshops",
        "Send calendar reminders",
      ],
    },
    {
      id: 3,
      title: "Sports Alumni Meet",
      date: "2025-11-08",
      time: "4:00 PM",
      location: "Sports Complex",
      category: "Sports",
      capacity: 150,
      predictedAttendance: 98,
      confidenceScore: 78,
      registrations: 67,
      factors: {
        popularity: 75,
        timing: 82,
        location: 88,
        weather: 70,
        competition: 85,
      },
      demographics: {
        "2015-2020": 25,
        "2010-2015": 30,
        "2005-2010": 25,
        "2000-2005": 20,
      },
      riskFactors: ["Weather dependent", "Sports season conflict"],
      recommendations: [
        "Create alumni team matches",
        "Include family activities",
        "Provide covered seating",
      ],
    },
  ];

  const pastEventAnalysis = [
    {
      event: "Spring Networking Event",
      predicted: 120,
      actual: 114,
      accuracy: 95,
      outcome: "Success",
    },
    {
      event: "Alumni Golf Tournament",
      predicted: 80,
      actual: 92,
      accuracy: 87,
      outcome: "Exceeded",
    },
    {
      event: "Virtual Webinar Series",
      predicted: 200,
      actual: 156,
      accuracy: 78,
      outcome: "Under-performed",
    },
    {
      event: "Class of 2020 Reunion",
      predicted: 150,
      actual: 148,
      accuracy: 98,
      outcome: "Success",
    },
  ];

  const attendanceFactors = [
    {
      factor: "Event Type",
      weight: 25,
      description: "Professional events have 35% higher attendance than social events",
    },
    {
      factor: "Timing",
      weight: 20,
      description: "Weekend evening events see 40% better attendance",
    },
    {
      factor: "Location",
      weight: 18,
      description: "Campus events have 25% higher attendance than off-site",
    },
    {
      factor: "Historical Engagement",
      weight: 15,
      description: "Alumni with previous event attendance are 60% more likely to attend",
    },
    {
      factor: "Weather Forecast",
      weight: 12,
      description: "Good weather increases outdoor event attendance by 30%",
    },
    {
      factor: "Competition",
      weight: 10,
      description: "Competing events reduce attendance by up to 25%",
    },
  ];

  const runPredictionAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setIsAnalyzing(false);
    toast({
      title: "Event Analysis Complete!",
      description: "Updated attendance predictions based on latest data and trends.",
    });
  };

  const exportReport = () => {
    toast({
      title: "Report Generated!",
      description: "Event prediction report has been downloaded.",
    });
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 85) return "bg-green-500/10 text-green-600";
    if (score >= 70) return "bg-yellow-500/10 text-yellow-600";
    return "bg-red-500/10 text-red-600";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className={`flex transition-all duration-300 ${isOpen ? "" : "ml-0"}`}>
          <Sidebar />
          <main className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${isOpen ? "" : "max-w-full"}`}>
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Analyzing Event Patterns</h3>
                    <p className="text-muted-foreground">AI is processing attendance data and event factors...</p>
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
      <div className={`flex transition-all duration-300 ${isOpen ? "" : "ml-0"}`}>
        <Sidebar />
        <main className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${isOpen ? "" : "max-w-full"}`}>
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
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Event Attendance Prediction</h1>
                  <p className="text-muted-foreground">AI-powered event planning and attendance forecasting</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <Card className="professional-card">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex gap-4">
                    <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="thismonth">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportReport}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                    <Button
                      onClick={runPredictionAnalysis}
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
                          Update Predictions
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="predictions" className="space-y-6">
              <TabsList>
                <TabsTrigger value="predictions">Event Predictions</TabsTrigger>
                <TabsTrigger value="factors">Attendance Factors</TabsTrigger>
                <TabsTrigger value="historical">Historical Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="predictions" className="space-y-6">
                <div className="space-y-6">
                  {upcomingEvents.map((event) => (
                    <Card key={event.id} className="professional-card">
                      <CardHeader className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-semibold">{event.title}</h3>
                              <Badge variant="outline">{event.category}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {event.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                              </div>
                            </div>
                          </div>
                          <Badge className={getConfidenceColor(event.confidenceScore)}>
                            {event.confidenceScore}% Confidence
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 space-y-6">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">
                              {event.predictedAttendance}
                            </div>
                            <div className="text-sm text-muted-foreground">Predicted Attendance</div>
                            <div className={`text-sm font-medium ${getAttendanceColor((event.predictedAttendance / event.capacity) * 100)}`}>
                              {Math.round((event.predictedAttendance / event.capacity) * 100)}% of capacity
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{event.registrations}</div>
                            <div className="text-sm text-muted-foreground">Current Registrations</div>
                            <div className="text-sm text-green-600 font-medium">
                              {Math.round((event.registrations / event.predictedAttendance) * 100)}% of predicted
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{event.capacity}</div>
                            <div className="text-sm text-muted-foreground">Event Capacity</div>
                            <div className="text-sm text-muted-foreground">
                              {event.capacity - event.predictedAttendance} spots available
                            </div>
                          </div>
                        </div>

                        {/* Attendance Factors */}
                        <div className="space-y-3">
                          <h4 className="font-semibold">Attendance Factors Analysis</h4>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {Object.entries(event.factors).map(([factor, score]) => (
                              <div key={factor} className="text-center">
                                <div className="text-lg font-semibold">{score}%</div>
                                <div className="text-xs text-muted-foreground capitalize">{factor}</div>
                                <Progress value={score} className="h-1 mt-1" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Demographics Prediction */}
                        <div className="space-y-3">
                          <h4 className="font-semibold">Expected Demographics</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(event.demographics).map(([range, percentage]) => (
                              <div key={range} className="text-center">
                                <div className="text-lg font-semibold">{percentage}%</div>
                                <div className="text-xs text-muted-foreground">{range}</div>
                                <Progress value={percentage} className="h-1 mt-1" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Risk Factors & Recommendations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h4 className="font-semibold flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              Risk Factors
                            </h4>
                            <div className="space-y-2">
                              {event.riskFactors.map((risk, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                  <span className="text-muted-foreground">{risk}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-semibold flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              AI Recommendations
                            </h4>
                            <div className="space-y-2">
                              {event.recommendations.map((rec, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                  <span className="text-muted-foreground">{rec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="factors" className="space-y-6">
                <Card className="professional-card">
                  <CardHeader>
                    <CardTitle>Attendance Prediction Factors</CardTitle>
                    <p className="text-muted-foreground">
                      AI-identified factors that influence event attendance
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {attendanceFactors.map((factor, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{factor.factor}</h4>
                              <Badge variant="outline">{factor.weight}% Weight</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{factor.description}</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{factor.weight}%</div>
                            <Progress value={factor.weight} className="h-2 w-16 mt-1" />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="historical" className="space-y-6">
                <Card className="professional-card">
                  <CardHeader>
                    <CardTitle>Historical Prediction Accuracy</CardTitle>
                    <p className="text-muted-foreground">
                      Analysis of past event predictions vs actual attendance
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pastEventAnalysis.map((analysis, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <h4 className="font-semibold">{analysis.event}</h4>
                            <div className="text-sm text-muted-foreground">
                              Predicted: {analysis.predicted} | Actual: {analysis.actual}
                            </div>
                          </div>
                          <div className="text-right space-y-1">
                            <Badge
                              variant={analysis.outcome === "Success" ? "secondary" : 
                                     analysis.outcome === "Exceeded" ? "default" : "outline"}
                              className={analysis.outcome === "Success" ? "bg-green-500/10 text-green-600" :
                                        analysis.outcome === "Exceeded" ? "bg-blue-500/10 text-blue-600" : ""}
                            >
                              {analysis.outcome}
                            </Badge>
                            <div className="text-sm font-semibold">{analysis.accuracy}% Accurate</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold">89.5%</div>
                        <div className="text-sm text-muted-foreground">Average Prediction Accuracy</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventPrediction;