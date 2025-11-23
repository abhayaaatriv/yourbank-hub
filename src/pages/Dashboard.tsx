import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, AlertTriangle, Clock, Users, Eye, EyeOff, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePinProtection } from "@/hooks/usePinProtection";
import { PinDialog } from "@/components/PinDialog";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Current Balance",
    value: "$125,430.50",
    icon: DollarSign,
    change: "+12.5%",
    trend: "up" as const,
  },
  {
    title: "Total Transactions",
    value: "1,234",
    icon: TrendingUp,
    change: "+8.2%",
    trend: "up" as const,
  },
  {
    title: "Fraud Alerts",
    value: "0",
    icon: AlertTriangle,
    change: "No alerts",
    trend: "neutral" as const,
  },
  {
    title: "Last Login",
    value: "Today 10:45 AM",
    icon: Clock,
    change: "2 hours ago",
    trend: "neutral" as const,
  },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { isPinVerified, isVerifying, verifyPin } = usePinProtection();
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) setUserProfile(data);
        });
    }
  }, [user]);

  const handleShowBalance = () => {
    if (isPinVerified) {
      setShowBalance(!showBalance);
    } else {
      setShowPinDialog(true);
    }
  };

  const handlePinVerify = async (pin: string) => {
    const success = await verifyPin(pin);
    if (success) setShowBalance(true);
    return success;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PinDialog
        open={showPinDialog}
        onOpenChange={setShowPinDialog}
        onVerify={handlePinVerify}
        isVerifying={isVerifying}
      />

      {/* Welcome Section */}
      <div className="gradient-hero text-white rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userProfile?.full_name || user?.email || "User"}
            </h1>
            <p className="text-white/80 text-lg">
              Here's what's happening with your accounts today
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={signOut}
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur">
              <Users className="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const isBalanceCard = stat.title === "Current Balance";
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-foreground">
                    {isBalanceCard ? (showBalance ? stat.value : "••••••") : stat.value}
                  </div>
                  {isBalanceCard && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleShowBalance}
                    >
                      {showBalance ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
                <p
                  className={`text-xs ${
                    stat.trend === "up"
                      ? "text-success"
                      : stat.trend === "neutral"
                      ? "text-muted-foreground"
                      : "text-destructive"
                  } mt-1`}
                >
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* User Info */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Full Name</span>
              <span className="font-medium">{userProfile?.full_name || "N/A"}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{userProfile?.email || user?.email || "N/A"}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{userProfile?.phone || "N/A"}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Account Type</span>
              <span className="font-medium">{userProfile?.account_type || "Premium"}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Member Since</span>
              <span className="font-medium">
                {userProfile?.member_since
                  ? new Date(userProfile.member_since).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">

            <Link
              to="/Transaction"
              className="block p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors cursor-pointer"
            >
              <div className="font-medium">Transfer Money</div>
              <div className="text-sm opacity-80">Send money to anyone</div>
            </Link>

            <Link
              to="/ApplyLoan"
              className="block p-3 bg-muted hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors cursor-pointer"
            >
              <div className="font-medium">Apply for Loan</div>
              <div className="text-sm opacity-80">Get instant approval</div>
            </Link>

            <Link
              to="/CreateFD"
              className="block p-3 bg-muted hover:bg-success hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <div className="font-medium">Create Fixed Deposit</div>
              <div className="text-sm opacity-80">Earn higher interest</div>
            </Link>

          </CardContent>
        </Card>
      </div>

      {/* Google Sheet */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl">Accounts Opened</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Real-time account opening data
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <div className="relative w-full h-[550px] overflow-hidden rounded-b-lg bg-muted/10">
            <div
              className="absolute top-0 left-0 origin-top-left"
              style={{ transform: "scale(1.15)", width: "87%", height: "87%" }}
            >
              <iframe
                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTTcRZdOZ6J4cd0Z-rO_T9TA5z-QrYFnAU_q-_d24sEgOCms_VZFH-JGzEnOVaGEpCFBmVfMH_k4TdG/pubhtml?gid=0&single=true&widget=true&headers=false"
                className="w-full h-full border-0"
                title="Accounts Opened"
                loading="lazy"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
