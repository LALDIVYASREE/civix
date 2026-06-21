import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_BASE_URL = "https://project-backend-i2n7.onrender.com";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!name || !email || !password || !role) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    /* 🔥 OFFICER FLOW (NO SIGNUP) */

    if (role === "officer") {

      localStorage.setItem("role", "officer");
      localStorage.setItem("department", "Road"); // default department

      toast({
        title: "Officer Access",
        description: "Redirecting to Officer Dashboard...",
      });

      navigate("/officer-dashboard");
      return;
    }

    /* ✅ CITIZEN SIGNUP */

    try {

      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      toast({
        title: "Success",
        description: "Account created successfully!",
      });

      navigate("/login");

    } catch (err: any) {

      console.error("Signup error:", err);

      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });

    }

  };


  return (

    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1 flex items-center justify-center bg-gradient-hero py-12 px-4">

        <Card className="w-full max-w-md shadow-elevated">

          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Create Account
            </CardTitle>

            <CardDescription className="text-center">
              Join Civix to start submitting complaints
            </CardDescription>
          </CardHeader>


          <CardContent>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>


              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>


              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>


              {/* ROLE SELECT */}
              <div className="space-y-2">

                <Label>Role</Label>

                <Select value={role} onValueChange={setRole}>

                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="citizen">Citizen</SelectItem>
                    <SelectItem value="officer">Officer</SelectItem>
                  </SelectContent>

                </Select>

              </div>


              <Button type="submit" className="w-full bg-gradient-civic">
                Continue
              </Button>

            </form>


            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </div>

          </CardContent>

        </Card>

      </main>

      <Footer />

    </div>
  );
};

export default Signup;