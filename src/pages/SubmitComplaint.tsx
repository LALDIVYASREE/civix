import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SubmitComplaint = () => {

  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];

    if (file) {

      setImage(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {

      toast({
        title: "Login Required",
        description: "Please login or signup to submit a complaint.",
        variant: "destructive",
      });

      navigate("/login");

      return;
    }

    if (!name || !address || !location || !complaintType || !description) {

      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });

      return;
    }

    try {

      const response = await fetch("http://localhost:5000/api/complaints", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title: complaintType,
          description: description,
          complaintType: complaintType,
          region: location,
        }),

      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit complaint");
      }

      localStorage.setItem("complaintCode", data.complaintCode);

      toast({
        title: "Complaint Submitted Successfully 🎉",
        description: (
          <div>
            <p>Your complaint has been registered.</p>
            <p className="font-semibold mt-2">
              Complaint Code: {data.complaintCode}
            </p>
            <p className="text-sm mt-1">
              Please save this code to track your complaint.
            </p>
          </div>
        ),
      });

      setName("");
      setAddress("");
      setLocation("");
      setComplaintType("");
      setDescription("");
      setImage(null);
      setImagePreview("");

    } catch (error) {

      toast({
        title: "Error",
        description: "Failed to submit complaint",
        variant: "destructive",
      });

    }
  };


  return (

    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1 bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">

        <div className="container mx-auto max-w-3xl">

          <Card className="shadow-elevated">

            <CardHeader>

              <CardTitle className="text-3xl">
                Submit Complaint
              </CardTitle>

              <CardDescription>
                Help us improve public services by reporting issues in your area
              </CardDescription>

            </CardHeader>


            <CardContent>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid md:grid-cols-2 gap-4">

                  <div className="space-y-2">
                    <Label>Your Name *</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>


                  <div className="space-y-2">
                    <Label>Location *</Label>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Area / Landmark"
                      required
                    />
                  </div>

                </div>


                <div className="space-y-2">

                  <Label>Address *</Label>

                  <Textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter complete address"
                    rows={3}
                    required
                  />

                </div>


                <div className="space-y-2">

                  <Label>Complaint Type *</Label>

                  <Select value={complaintType} onValueChange={setComplaintType}>

                    <SelectTrigger>
                      <SelectValue placeholder="Select complaint category" />
                    </SelectTrigger>

                    <SelectContent>

                      <SelectItem value="Road">Road</SelectItem>
                      <SelectItem value="Railway">Railway</SelectItem>
                      <SelectItem value="Water">Water Supply</SelectItem>
                      <SelectItem value="Electricity">Electricity</SelectItem>
                      <SelectItem value="Sanitation">Sanitation</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>

                    </SelectContent>

                  </Select>

                </div>


                <div className="space-y-2">

                  <Label>Description *</Label>

                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue in detail..."
                    rows={5}
                    required
                  />

                </div>


                <div className="space-y-2">

                  <Label>Upload Photo (Optional)</Label>

                  <div className="flex items-center gap-4">

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    <Upload className="h-5 w-5 text-muted-foreground" />

                  </div>

                  {imagePreview && (

                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-48 object-cover rounded-lg border"
                    />

                  )}

                </div>


                <Button
                  type="submit"
                  className="w-full bg-gradient-civic"
                  size="lg"
                >
                  Submit Complaint
                </Button>

              </form>

            </CardContent>

          </Card>

        </div>

      </main>

      <Footer />

    </div>

  );

};

export default SubmitComplaint;