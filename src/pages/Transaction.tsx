import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Transaction() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Transaction completed successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Make Transaction</h1>
        <p className="text-muted-foreground mt-2">Transfer money securely</p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Transfer Money</CardTitle>
          <CardDescription>Enter transaction details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fromAccount">From Account *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings Account - ****1234</SelectItem>
                  <SelectItem value="current">Current Account - ****5678</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="beneficiary">Beneficiary Name *</Label>
              <Input id="beneficiary" placeholder="Enter beneficiary name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input id="accountNumber" placeholder="Enter account number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ifsc">IFSC Code *</Label>
              <Input id="ifsc" placeholder="Enter IFSC code" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input id="amount" placeholder="Enter amount" className="pl-8" type="number" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks (Optional)</Label>
              <Input id="remarks" placeholder="Enter remarks" />
            </div>

            <Button type="submit" className="w-full h-12 text-base" size="lg">
              Transfer Money
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
