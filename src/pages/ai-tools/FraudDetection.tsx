import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Lock,
  Users,
  CreditCard,
  MapPin,
  Clock,
  TrendingUp,
  BarChart3,
  Filter,
  Download,
  RefreshCw,
  Loader2,
  Bell,
  Search,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const FraudDetection = () => {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("24hours");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Dummy security data
  const securityMetrics = {
    totalScans: 15647,
    threatsDetected: 23,
    falsePositives: 3,
    systemHealth: 98.7,
    lastScan: "2 minutes ago",
    activeMonitoring: true,
  };

  const riskCategories = [
    {
      category: "Account Security",
      riskLevel: "Low",
      incidents: 2,
      color: "bg-green-500",
      description: "Unusual login patterns and password attempts",
    },
    {
      category: "Payment Fraud",
      riskLevel: "Medium",
      incidents: 5,
      color: "bg-yellow-500",
      description: "Suspicious payment activities and donation patterns",
    },
    {
      category: "Identity Verification",
      riskLevel: "High",
      incidents: 8,
      color: "bg-red-500",
      description: "Fake profiles and identity mismatches",
    },
    {
      category: "Data Breaches",
      riskLevel: "Low",
      incidents: 0,
      color: "bg-green-500",
      description: "Unauthorized data access attempts",
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "Identity Fraud",
      severity: "High",
      description: "Multiple accounts created with similar personal information",
      timestamp: "15 minutes ago",
      status: "Under Review",
      details: {
        affectedUsers: 3,
        ipAddress: "192.168.1.100",
        location: "Unknown Location",
        pattern: "Bulk account creation",
      },
      actions: ["Block IP", "Verify Identity", "Send Alert"],
    },
    {
      id: 2,
      type: "Payment Anomaly",
      severity: "Medium",
      description: "Unusually large donation amount from new user",
      timestamp: "2 hours ago",
      status: "Investigating",
      details: {
        amount: "$15,000",
        userAge: "< 1 day",
        paymentMethod: "Credit Card",
        pattern: "First-time large donation",
      },
      actions: ["Verify Payment", "Contact User", "Hold Transaction"],
    },
    {
      id: 3,
      type: "Login Anomaly",
      severity: "Low",
      description: "Login from unusual geographic location",
      timestamp: "6 hours ago",
      status: "Resolved",
      details: {
        user: "Sarah Chen",
        location: "Tokyo, Japan",
        normalLocation: "San Francisco, CA",
        pattern: "Geographic anomaly",
      },
      actions: ["Two-Factor Auth", "Email Notification", "Monitor"],
    },
    {
      id: 4,
      type: "Data Access",
      severity: "Medium",
      description: "Rapid data extraction detected",
      timestamp: "1 day ago",
      status: "Blocked",
      details: {
        dataType: "Alumni Directory",
        requestCount: 500,
        timeFrame: "10 minutes",
        pattern: "Automated scraping",
      },
      actions: ["Rate Limiting", "CAPTCHA", "IP Block"],
    },
  ];

  const fraudPatterns = [
    {
      pattern: "Bulk Account Creation",
      confidence: 94,
      instances: 12,
      description: "Multiple accounts created from same IP in short timeframe",
      riskLevel: "High",
    },
    {
      pattern: "Fake Alumni Profiles",
      confidence: 87,
      instances: 8,
      description: "Profiles with inconsistent graduation years and information",
      riskLevel: "High",
    },
    {
      pattern: "Donation Reversal Attempts",
      confidence: 76,
      instances: 15,
      description: "Pattern of donations followed by chargeback requests",
      riskLevel: "Medium",
    },
    {
      pattern: "Data Harvesting",
      confidence: 89,
      instances: 6,
      description: "Automated data extraction from alumni directory",
      riskLevel: "Medium",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "low":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "bg-green-500/10 text-green-600";
      case "blocked":
        return "bg-red-500/10 text-red-600";
      case "investigating":
      case "under review":
        return "bg-yellow-500/10 text-yellow-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  const runSecurityScan = async () => {
    setIsScanning(true);
    
    // Simulate security scan
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setIsScanning(false);
    toast({
      title: "Security Scan Complete!",
      description: "System scan completed. No new threats detected.",
    });
  };

  const handleTakeAction = (alertId: number, action: string) => {
    toast({
      title: "Action Executed!",
      description: `${action} has been applied to alert #${alertId}.`,
    });
  };

  const exportReport = () => {
    toast({
      title: "Security Report Generated!",
      description: "Fraud detection report has been downloaded.",
    });
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
                    <h3 className="text-lg font-semibold">Initializing Security Systems</h3>
                    <p className="text-muted-foreground">AI is analyzing security patterns and threats...</p>
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
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Fraud & Anomaly Detection</h1>
                  <p className="text-muted-foreground">AI-powered security monitoring and threat detection</p>
                </div>
              </div>
            </div>

            {/* Security Status */}
            <Card className="professional-card border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-green-500/10">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">System Secure</h3>
                      <p className="text-muted-foreground">
                        Last scan: {securityMetrics.lastScan} • Health: {securityMetrics.systemHealth}%
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={runSecurityScan}
                    disabled={isScanning}
                    className="alma-gradient text-primary-foreground"
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Run Security Scan
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="professional-card">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Scans
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">{securityMetrics.totalScans.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card className="professional-card">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Threats Detected
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-red-600">{securityMetrics.threatsDetected}</span>
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">Active incidents</p>
                </CardContent>
              </Card>

              <Card className="professional-card">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    False Positives
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold text-yellow-600">{securityMetrics.falsePositives}</div>
                  <p className="text-sm text-muted-foreground">This week</p>
                </CardContent>
              </Card>

              <Card className="professional-card">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">{securityMetrics.systemHealth}%</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <Progress value={securityMetrics.systemHealth} className="h-2 mt-2" />
                </CardContent>
              </Card>
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
                        <SelectItem value="1hour">Last Hour</SelectItem>
                        <SelectItem value="24hours">Last 24 Hours</SelectItem>
                        <SelectItem value="7days">Last 7 Days</SelectItem>
                        <SelectItem value="30days">Last 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Risk Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="low">Low Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportReport}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="alerts" className="space-y-6">
              <TabsList>
                <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
                <TabsTrigger value="patterns">Fraud Patterns</TabsTrigger>
                <TabsTrigger value="categories">Risk Categories</TabsTrigger>
              </TabsList>

              <TabsContent value="alerts" className="space-y-6">
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <Card key={alert.id} className="professional-card">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-2">
                              <Badge className={getSeverityColor(alert.severity)}>
                                {alert.severity} Risk
                              </Badge>
                              <Badge variant="outline">{alert.type}</Badge>
                              <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                            </div>
                            <h3 className="font-semibold text-lg">{alert.description}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              {Object.entries(alert.details).map(([key, value]) => (
                                <div key={key}>
                                  <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                  <p className="font-medium">{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge className={getStatusColor(alert.status)}>
                              {alert.status}
                            </Badge>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Alert Details - {alert.type}</DialogTitle>
                                  <DialogDescription>
                                    Detailed information and available actions
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Description</h4>
                                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Available Actions</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {alert.actions.map((action, index) => (
                                        <Button
                                          key={index}
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleTakeAction(alert.id, action)}
                                        >
                                          {action}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="patterns" className="space-y-6">
                <Card className="professional-card">
                  <CardHeader>
                    <CardTitle>Detected Fraud Patterns</CardTitle>
                    <p className="text-muted-foreground">
                      AI-identified patterns of suspicious activity
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {fraudPatterns.map((pattern, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{pattern.pattern}</h4>
                              <Badge
                                variant={pattern.riskLevel === "High" ? "destructive" : "outline"}
                                className={pattern.riskLevel === "High" ? "" : "border-yellow-500 text-yellow-600"}
                              >
                                {pattern.riskLevel} Risk
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{pattern.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span>Instances: <strong>{pattern.instances}</strong></span>
                              <span>Confidence: <strong>{pattern.confidence}%</strong></span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{pattern.confidence}%</div>
                            <Progress value={pattern.confidence} className="h-2 w-24 mt-1" />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {riskCategories.map((category, index) => (
                    <Card key={index} className="professional-card">
                      <CardHeader className="p-6">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{category.category}</CardTitle>
                          <Badge
                            variant={category.riskLevel === "High" ? "destructive" : 
                                   category.riskLevel === "Medium" ? "outline" : "secondary"}
                            className={category.riskLevel === "Low" ? "bg-green-500/10 text-green-600" :
                                     category.riskLevel === "Medium" ? "border-yellow-500 text-yellow-600" : ""}
                          >
                            {category.riskLevel} Risk
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 space-y-4">
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold">{category.incidents}</div>
                            <div className="text-sm text-muted-foreground">Active incidents</div>
                          </div>
                          <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
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

export default FraudDetection;