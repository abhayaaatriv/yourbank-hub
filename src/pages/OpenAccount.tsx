import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Upload } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function OpenAccount() {
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
    toast.success("Application submitted successfully! We'll review and contact you soon.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Account Application Form</h1>
          <p className="text-muted-foreground mt-2">Please provide accurate information for verification</p>
        </div>
        <Button onClick={handleCall} variant="outline" size="lg" className="gap-2">
          <Phone className="h-5 w-5" />
          Call Us
        </Button>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>All fields marked with * are required</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
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

            {/* Row 2 */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>

            {/* Row 3 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="aadhar">Aadhar Number *</Label>
                <Input id="aadhar" placeholder="1234 5678 9012" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number *</Label>
                <Input id="pan" placeholder="ABCDE1234F" required />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Residential Address *</Label>
              <Textarea id="address" placeholder="Enter your complete address" rows={3} required />
            </div>

            {/* Row 4 */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input id="city" placeholder="City" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input id="state" placeholder="State" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code *</Label>
                <Input id="pincode" placeholder="123456" required />
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="documents">Upload Documents (Optional)</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="documents"
                  type="file"
                  onChange={handleFileChange}
                  className="flex-1"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById('documents')?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
              {file && <p className="text-sm text-muted-foreground">Selected: {file.name}</p>}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 text-base" size="lg">
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
