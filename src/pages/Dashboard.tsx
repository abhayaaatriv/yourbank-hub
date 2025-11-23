import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, AlertTriangle, Clock, Users } from "lucide-react";

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
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="gradient-hero text-white rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, John Doe</h1>
            <p className="text-white/80 text-lg">Here's what's happening with your accounts today</p>
          </div>
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur">
            <Users className="h-10 w-10" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === "up" ? "text-success" : 
                stat.trend === "neutral" ? "text-muted-foreground" :
                "text-destructive"
              } mt-1`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Information */}
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
              <span className="font-medium">John Doe</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">john.doe@example.com</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">+1 (555) 123-4567</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Account Type</span>
              <span className="font-medium">Premium</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Member Since</span>
              <span className="font-medium">Jan 2023</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href="/transaction" className="block p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors cursor-pointer">
              <div className="font-medium">Transfer Money</div>
              <div className="text-sm opacity-80">Send money to anyone</div>
            </a>
            <a href="/apply-loan" className="block p-3 bg-muted hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors cursor-pointer">
              <div className="font-medium">Apply for Loan</div>
              <div className="text-sm opacity-80">Get instant approval</div>
            </a>
            <a href="/create-fd" className="block p-3 bg-muted hover:bg-success hover:text-white rounded-lg transition-colors cursor-pointer">
              <div className="font-medium">Create Fixed Deposit</div>
              <div className="text-sm opacity-80">Earn higher interest</div>
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Opened Sheet */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Accounts Opened</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-border">
            <iframe
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTTcRZdOZ6J4cd0Z-rO_T9TA5z-QrYFnAU_q-_d24sEgOCms_VZFH-JGzEnOVaGEpCFBmVfMH_k4TdG/pubhtml?gid=0&single=true&widget=true&headers=false"
              className="w-full h-full"
              title="Accounts Opened"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
