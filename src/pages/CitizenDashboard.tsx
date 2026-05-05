import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { API_BASE_URL } from "@/config";

const CitizenDashboard = () => {

  const [complaints, setComplaints] = useState<any[]>([]);

  // Fetch complaints from backend
  const fetchComplaints = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/api/complaints`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      setComplaints(data);

    } catch (error) {

      console.error("Error fetching complaints", error);

    }

  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (

    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1 bg-gradient-hero py-12 px-4">

        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">

          <h2 className="text-3xl font-bold mb-6">
            Your Complaints
          </h2>

          {complaints.length === 0 ? (

            <p>No complaints submitted yet.</p>

          ) : (

            complaints.map((complaint) => (

              <div
                key={complaint._id}
                className="border rounded p-4 mb-4"
              >

                <p><b>Complaint Code:</b> {complaint.complaintCode}</p>

                <p><b>Title:</b> {complaint.title}</p>

                <p><b>Description:</b> {complaint.description}</p>

                <p><b>Status:</b> {complaint.status}</p>

                <p>
                  <b>Date:</b>{" "}
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </p>

              </div>

            ))

          )}

        </div>

      </main>

      <Footer />

    </div>

  );

};

export default CitizenDashboard;