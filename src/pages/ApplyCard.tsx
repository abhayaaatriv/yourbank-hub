import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone } from "lucide-react";
import { toast } from "sonner";

export default function ApplyCard() {
  const handleCall = () => {
    window.location.href = "tel:+18632814984";
    toast.success("Initiating call to +1 (863) 281-4984");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Card application submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Apply for Card</h1>
          <p className="text-muted-foreground mt-2">Choose and apply for your preferred card</p>
        </div>
        <Button onClick={handleCall} variant="outline" size="lg" className="gap-2">
          <Phone className="h-5 w-5" />
          Call Us
        </Button>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Card Application</CardTitle>
          <CardDescription>Select your card type and provide details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cardType">Card Type *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debit">Debit Card</SelectItem>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="prepaid">Prepaid Card</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" placeholder="As per bank records" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="+1 234 567 8900" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Income *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input id="annualIncome" placeholder="Annual Income" className="pl-8" type="number" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="creditLimit">Desired Credit Limit</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input id="creditLimit" placeholder="Credit Limit" className="pl-8" type="number" />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base" size="lg">
              Submit Card Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
