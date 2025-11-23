import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Phone } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function CreateFD() {
  const [date, setDate] = useState<Date>();

  const handleCall = () => {
    window.location.href = "tel:+18632814984";
    toast.success("Initiating call to +1 (863) 281-4984");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("FD account created successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">FD Account Details</h1>
          <p className="text-muted-foreground mt-2">Create a new Fixed Deposit account</p>
        </div>
        <Button onClick={handleCall} variant="outline" size="lg" className="gap-2">
          <Phone className="h-5 w-5" />
          Call Us
        </Button>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Fixed Deposit Information</CardTitle>
          <CardDescription>Enter details for your FD account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type Requested</Label>
                <Input id="accountType" placeholder="Savings / Current / NRO / NRE" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="depositAmount">Initial Deposit Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input id="depositAmount" placeholder="Amount" className="pl-8" type="number" />
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monthly Income</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input id="monthlyIncome" placeholder="Monthly Income" className="pl-8" type="number" />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nomineeName">Nominee Name</Label>
                <Input id="nomineeName" placeholder="Full Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomineeRelation">Nominee Relation</Label>
                <Input id="nomineeRelation" placeholder="e.g., Father, Mother, Spouse, Brother" />
              </div>
            </div>

            {/* FD Start Date */}
            <div className="space-y-2">
              <Label>FD Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 text-base" size="lg">
              Create FD Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
