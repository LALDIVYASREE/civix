import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TrackStatus = () => {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await fetch(
        `http://13.201.69.69:5000/api/complaints/track/${complaintId}`
      );

      if (!response.ok) {
        throw new Error("Complaint not found");
      }

      const data = await response.json();

      setComplaint(data);
      setError("");

    } catch (err) {

      setError("Complaint not found");
      setComplaint(null);

    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "In Progress":
        return "bg-blue-500 text-white";
      case "Resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Track Complaint Status</CardTitle>
              <CardDescription>
                Enter your complaint ID to check the status
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

              <form onSubmit={handleSearch} className="space-y-4">

                <Label>Complaint ID</Label>

                <div className="flex gap-2">
                  <Input
                    value={complaintId}
                    onChange={(e) => setComplaintId(e.target.value)}
                    placeholder="Enter complaint code"
                  />

                  <Button type="submit">
                    <Search className="h-4 w-4 mr-2" />
                    Track
                  </Button>
                </div>

              </form>

              {error && (
                <p className="text-red-500">{error}</p>
              )}

              {complaint && (

                <div className="space-y-4 border-t pt-4">

                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                      Complaint Details
                    </h3>

                    <Badge className={getStatusColor(complaint.status)}>
                      {complaint.status}
                    </Badge>
                  </div>

                  <p><b>Complaint Code:</b> {complaint.complaintCode}</p>

                  <p><b>Title:</b> {complaint.title}</p>

                  <p><b>Description:</b> {complaint.description}</p>

                  <p><b>Category:</b> {complaint.complaintType}</p>

                  <p><b>Region:</b> {complaint.region}</p>

                  <p><b>Date Submitted:</b> {new Date(complaint.createdAt).toLocaleDateString()}</p>

                </div>

              )}

            </CardContent>
          </Card>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackStatus;