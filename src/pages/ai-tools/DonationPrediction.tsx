import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Users,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle,
  Loader2,
  Download,
  Filter,
  RefreshCw,
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

const DonationPrediction = () => {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("12months");
  const [selectedCampaign, setSelectedCampaign] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Dummy prediction data
  const donationMetrics = {
    totalPredictedAmount: 245000,
    predictedDonors: 187,
    averageDonation: 1310,
    confidenceScore: 87,
    growthRate: 15.3,
    topDonorProbability: 23.5,
  };

  const donorSegments = [
    {
      segment: "High-Value Donors",
      probability: 92,
      estimatedAmount: 85000,
      count: 12,
      characteristics: [
        "Alumni 10+ years",
        "Previous major gifts",
        "Business leaders",
      ],
      riskLevel: "Low",
      color: "bg-green-500",
    },
    {
      segment: "Regular Contributors",
      probability: 78,
      estimatedAmount: 95000,
      count: 67,
      characteristics: [
        "Annual givers",
        "Event participants",
        "Active network",
      ],
      riskLevel: "Low",
      color: "bg-blue-500",
    },
    {
      segment: "Potential Donors",
      probability: 65,
      estimatedAmount: 45000,
      count: 89,
      characteristics: [
        "Recent graduates",
        "Career progression",
        "Alumni engagement",
      ],
      riskLevel: "Medium",
      color: "bg-yellow-500",
    },
    {
      segment: "Unlikely Donors",
      probability: 34,
      estimatedAmount: 20000,
      count: 156,
      characteristics: [
        "No previous donations",
        "Low engagement",
        "Recent financial changes",
      ],
      riskLevel: "High",
      color: "bg-red-500",
    },
  ];

  const campaigns = [
    {
      id: "scholarship",
      name: "Scholarship Fund 2025",
      target: 500000,
      predicted: 245000,
      probability: 87,
      timeline: "6 months",
      status: "Active",
    },
    {
      id: "infrastructure",
      name: "Campus Infrastructure",
      target: 1200000,
      predicted: 780000,
      probability: 65,
      timeline: "12 months",
      status: "Planning",
    },
    {
      id: "research",
      name: "Research Initiative",
      target: 300000,
      predicted: 285000,
      probability: 95,
      timeline: "9 months",
      status: "Active",
    },
  ];

  const topProspects = [
    {
      id: 1,
      name: "Sarah Chen",
      class: "2015",
      profession: "Tech Executive",
      donationProbability: 94,
      predictedAmount: 25000,
      lastDonation: "2023",
      factors: ["High income", "Previous donor", "Alumni leader"],
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      class: "2012",
      profession: "Investment Banker",
      donationProbability: 89,
      predictedAmount: 18000,
      lastDonation: "2022",
      factors: ["Finance industry", "Regular giver", "Event attendee"],
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      class: "2010",
      profession: "Medical Director",
      donationProbability: 87,
      predictedAmount: 22000,
      lastDonation: "2024",
      factors: ["Healthcare leader", "Major gift history", "Board member"],
    },
    {
      id: 4,
      name: "James Wilson",
      class: "2018",
      profession: "Startup Founder",
      donationProbability: 76,
      predictedAmount: 15000,
      lastDonation: "Never",
      factors: ["Entrepreneur", "Recent success", "Young achiever"],
    },
  ];

  const runPredictionAnalysis = async () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 4000));

    setIsAnalyzing(false);
    toast({
      title: "Prediction Analysis Complete!",
      description:
        "Updated donation forecasts based on latest alumni data and market trends.",
    });
  };

  const exportReport = () => {
    toast({
      title: "Report Generated!",
      description: "Donation prediction report has been downloaded.",
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
                      Analyzing Donation Patterns
                    </h3>
                    <p className="text-muted-foreground">
                      AI is processing alumni data and donation history...
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
                <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    Donation Likelihood Prediction
                  </h1>
                  <p className="text-muted-foreground">
                    AI-powered fundraising analytics and predictions
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
                        <SelectItem value="6months">6 Months</SelectItem>
                        <SelectItem value="12months">12 Months</SelectItem>
                        <SelectItem value="24months">24 Months</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={selectedCampaign}
                      onValueChange={setSelectedCampaign}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Campaign" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Campaigns</SelectItem>
                        <SelectItem value="scholarship">
                          Scholarship Fund
                        </SelectItem>
                        <SelectItem value="infrastructure">
                          Infrastructure
                        </SelectItem>
                        <SelectItem value="research">
                          Research Initiative
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={exportReport}>
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

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="professional-card">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Predicted Total Amount
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      ${donationMetrics.totalPredictedAmount.toLocaleString()}
                    </span>
                    <Badge className="bg-green-500/10 text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />+
                      {donationMetrics.growthRate}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="professional-card">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Predicted Donors
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {donationMetrics.predictedDonors}
                    </span>
                    <Badge variant="outline">
                      <Users className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="professional-card">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Confidence Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {donationMetrics.confidenceScore}%
                      </span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <Progress
                      value={donationMetrics.confidenceScore}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="segments" className="space-y-6">
              <TabsList>
                <TabsTrigger value="segments">Donor Segments</TabsTrigger>
                <TabsTrigger value="campaigns">
                  Campaign Predictions
                </TabsTrigger>
                <TabsTrigger value="prospects">Top Prospects</TabsTrigger>
              </TabsList>

              <TabsContent value="segments" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {donorSegments.map((segment, index) => (
                    <Card key={index} className="professional-card">
                      <CardHeader className="p-6">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {segment.segment}
                          </CardTitle>
                          <Badge
                            variant={
                              segment.riskLevel === "Low"
                                ? "secondary"
                                : segment.riskLevel === "Medium"
                                ? "outline"
                                : "destructive"
                            }
                          >
                            {segment.riskLevel} Risk
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Donation Probability
                            </p>
                            <p className="text-2xl font-bold">
                              {segment.probability}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Estimated Amount
                            </p>
                            <p className="text-2xl font-bold">
                              ${segment.estimatedAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Alumni Count: {segment.count}
                          </p>
                          <Progress
                            value={segment.probability}
                            className="h-2"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">
                            Key Characteristics:
                          </p>
                          <div className="space-y-1">
                            {segment.characteristics.map((char, charIndex) => (
                              <div
                                key={charIndex}
                                className="flex items-center gap-2 text-sm"
                              >
                                <div
                                  className={`w-2 h-2 rounded-full ${segment.color}`}
                                ></div>
                                <span className="text-muted-foreground">
                                  {char}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="campaigns" className="space-y-6">
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="professional-card">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">
                                {campaign.name}
                              </h3>
                              <Badge
                                variant={
                                  campaign.status === "Active"
                                    ? "secondary"
                                    : "outline"
                                }
                                className={
                                  campaign.status === "Active"
                                    ? "bg-green-500/10 text-green-600"
                                    : ""
                                }
                              >
                                {campaign.status}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Target Amount
                                </p>
                                <p className="font-semibold">
                                  ${campaign.target.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Predicted Amount
                                </p>
                                <p className="font-semibold">
                                  ${campaign.predicted.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Timeline
                                </p>
                                <p className="font-semibold">
                                  {campaign.timeline}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Success Probability</span>
                                <span>{campaign.probability}%</span>
                              </div>
                              <Progress
                                value={campaign.probability}
                                className="h-2"
                              />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Progress to Target</span>
                                <span>
                                  {Math.round(
                                    (campaign.predicted / campaign.target) * 100
                                  )}
                                  %
                                </span>
                              </div>
                              <Progress
                                value={
                                  (campaign.predicted / campaign.target) * 100
                                }
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="prospects" className="space-y-6">
                <div className="space-y-4">
                  {topProspects.map((prospect) => (
                    <Card key={prospect.id} className="professional-card">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {prospect.name}
                                </h3>
                                <p className="text-muted-foreground">
                                  {prospect.profession} • Class of{" "}
                                  {prospect.class}
                                </p>
                              </div>
                              <Badge className="bg-blue-500/10 text-blue-600">
                                {prospect.donationProbability}% Likelihood
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">
                                  Predicted Amount:
                                </span>
                                <p className="font-semibold">
                                  ${prospect.predictedAmount.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Last Donation:
                                </span>
                                <p className="font-semibold">
                                  {prospect.lastDonation}
                                </p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Probability:
                                </span>
                                <Progress
                                  value={prospect.donationProbability}
                                  className="h-2 mt-1"
                                />
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-2">
                                Key Factors:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {prospect.factors.map((factor, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {factor}
                                  </Badge>
                                ))}
                              </div>
                            </div>
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

export default DonationPrediction;
