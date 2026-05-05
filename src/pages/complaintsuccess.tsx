import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ComplaintSuccess = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const complaintCode = location.state?.complaintCode;

  return (

    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1 flex items-center justify-center bg-gradient-hero px-4">

        <Card className="max-w-lg w-full shadow-elevated text-center">

          <CardHeader>

            <CardTitle className="text-3xl text-green-600">
              Complaint Submitted Successfully 🎉
            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-6">

            <p className="text-lg">
              Your complaint has been registered.
            </p>

            <div className="bg-muted p-4 rounded-lg">

              <p className="text-sm text-muted-foreground">
                Your Complaint Code
              </p>

              <p className="text-2xl font-bold text-primary mt-1">
                {complaintCode}
              </p>

            </div>

            <p className="text-sm text-muted-foreground">
              Please save this code to track your complaint status.
            </p>

            <div className="flex flex-col gap-3">

              <Button
                onClick={() => navigate("/track-status")}
                className="bg-gradient-civic"
              >
                Track Complaint
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/citizen-dashboard")}
              >
                Go to Dashboard
              </Button>

            </div>

          </CardContent>

        </Card>

      </main>

      <Footer />

    </div>
  );
};

export default ComplaintSuccess;