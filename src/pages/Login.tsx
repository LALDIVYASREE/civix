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
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_BASE_URL = "https://project-backend-i2n7.onrender.com";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!email || !password) {

      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });

      return;
    }

    try {

      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Store login data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user?.role || "citizen");
      localStorage.setItem("department", data.user?.department || "");

      toast({
        title: "Success",
        description: "Logged in successfully!",
      });

      // Redirect to Home Page
      navigate("/");

    } catch (error: any) {

      console.error("Login error:", error);

      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });

    }

  };


  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1 flex items-center justify-center bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">

        <Card className="w-full max-w-md shadow-elevated">

          <CardHeader className="space-y-1">

            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>

            <CardDescription className="text-center">
              Login to access your Civix account
            </CardDescription>

          </CardHeader>

          <CardContent>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-2">

                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

              <div className="space-y-2">

                <div className="flex items-center justify-between">

                  <Label htmlFor="password">Password</Label>

                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </a>

                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>

              <Button type="submit" className="w-full bg-gradient-civic">
                Login
              </Button>

            </form>

            <div className="mt-6 text-center text-sm">

              <span className="text-muted-foreground">
                Don't have an account?
              </span>{" "}

              <Link
                to="/signup"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>

            </div>

          </CardContent>

        </Card>

      </main>

      <Footer />

    </div>
  );
};

export default Login;