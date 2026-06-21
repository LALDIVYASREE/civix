import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import OfficerNavbar from "@/components/officernavbar";
import Footer from "@/components/Footer";

const OfficerDashboard = () => {

  const { toast } = useToast();

  /* ================= GET USER EMAIL ================= */

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const email = user?.email?.toLowerCase();   // 🔥 IMPORTANT FIX

  const [complaints, setComplaints] = useState<any[]>([]);
  const [forwardEmails, setForwardEmails] = useState<any>({});

  /* ================= FETCH ================= */

  const fetchComplaints = async () => {

    if (!email) {
      console.log("No email found");
      return;
    }

    try {

      console.log("Fetching for:", email); // 🔥 DEBUG

      const res = await fetch(
        `https://project-backend-i2n7.onrender.com/api/officer/${email}`
      );

      const data = await res.json();

      console.log("Complaints:", data); // 🔥 DEBUG

      setComplaints(data);

    } catch (error) {

      console.error("Error fetching complaints", error);

    }

  };

  useEffect(() => {
    fetchComplaints();
  }, [email]);


  /* ================= STATUS UPDATE ================= */

  const handleStatusUpdate = async (id: string, status: string) => {

    await fetch(
      `https://project-backend-i2n7.onrender.com/api/officer/status/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      }
    );

    toast({ title: "Status Updated" });

    fetchComplaints();
  };


  /* ================= FORWARD ================= */

  const handleForward = async (id: string) => {

    const emailToForward = forwardEmails[id]?.toLowerCase();

    if (!emailToForward) {
      toast({
        title: "Error",
        description: "Please enter email",
        variant: "destructive"
      });
      return;
    }

    try {

      const res = await fetch(
        `https://project-backend-i2n7.onrender.com/api/officer/forward/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailToForward })
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast({
        title: "Forwarded",
        description: "Complaint forwarded successfully"
      });

      fetchComplaints();

    } catch (err: any) {

      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });

    }
  };


  /* ================= STATUS COLOR ================= */

  const getStatusColor = (status: string) => {

    switch (status) {
      case "Pending": return "bg-yellow-500 text-white";
      case "In Progress": return "bg-blue-500 text-white";
      case "Resolved": return "bg-green-500 text-white";
      default: return "";
    }

  };


  return (

    <div className="min-h-screen flex flex-col">

      <OfficerNavbar />

      <main className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Officer Dashboard
        </h1>

        {complaints.length === 0 && (
          <p className="text-gray-500">
            No complaints assigned to you
          </p>
        )}

        {complaints.map((c) => (

          <Card key={c._id} className="mb-4">

            <CardContent className="p-4">

              <p className="font-bold">{c.complaintCode}</p>
              <p>{c.description}</p>

              <p className="text-sm text-gray-500">
                Assigned to: {c.assignedTo}
              </p>

              {/* STATUS */}
              <div className="flex gap-3 mt-3">

                <Badge className={getStatusColor(c.status)}>
                  {c.status}
                </Badge>

                <Select
                  value={c.status}
                  onValueChange={(val) =>
                    handleStatusUpdate(c._id, val)
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>

                </Select>

              </div>

              {/* FORWARD */}
              <div className="flex gap-2 mt-4">

                <input
                  type="email"
                  placeholder="Enter officer email"
                  className="border px-2 py-1 rounded text-sm"
                  value={forwardEmails[c._id] || ""}
                  onChange={(e) =>
                    setForwardEmails({
                      ...forwardEmails,
                      [c._id]: e.target.value
                    })
                  }
                />

                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleForward(c._id)}
                >
                  Forward
                </button>

              </div>

            </CardContent>

          </Card>

        ))}

      </main>

      <Footer />

    </div>

  );

};

export default OfficerDashboard;