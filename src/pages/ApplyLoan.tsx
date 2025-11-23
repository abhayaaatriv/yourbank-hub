import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Upload } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function ApplyLoan() {
  const [file, setFile] = useState<File | null>(null);

  const handleCall = () => {
    window.location.href = "tel:+18632814984";
    toast.success("Initiating call to +1 (863) 281-4984");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success(`File "${e.target.files[0].name}" selected`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Loan application submitted successfully! We'll review and contact you soon.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Apply for Loan</h1>
          <p className="text-muted-foreground mt-2">Submit your loan application with required documents</p>
        </div>
        <Button onClick={handleCall} variant="outline" size="lg" className="gap-2">
          <Phone className="h-5 w-5" />
          Call Us
        </Button>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Loan Application</CardTitle>
          <CardDescription>Please provide accurate information for faster processing</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="loanType">Loan Type *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="home">Home Loan</SelectItem>
                    <SelectItem value="car">Car Loan</SelectItem>
                    <SelectItem value="education">Education Loan</SelectItem>
                    <SelectItem value="business">Business Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input id="loanAmount" placeholder="Amount" className="pl-8" type="number" required />
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="+1 234 567 8900" required />
              </div>
            </div>

            {/* Row 3 */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>

            {/* Row 4 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input id="monthlyIncome" placeholder="Monthly Income" className="pl-8" type="number" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employment">Employment Status *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="self-employed">Self Employed</SelectItem>
                    <SelectItem value="business">Business Owner</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Purpose */}
            <div className="space-y-2">
              <Label htmlFor="purpose">Loan Purpose *</Label>
              <Textarea id="purpose" placeholder="Briefly describe the purpose of this loan" rows={3} required />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="documents">Upload Documents *</Label>
              <p className="text-sm text-muted-foreground">Please upload: ID proof, Income proof, Address proof</p>
              <div className="flex items-center gap-4">
                <Input
                  id="documents"
                  type="file"
                  onChange={handleFileChange}
                  className="flex-1"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById('documents')?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
              {file && <p className="text-sm text-success">Selected: {file.name}</p>}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 text-base" size="lg">
              Submit Loan Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
