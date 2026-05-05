import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/civix-logo.png";

const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear(); // 🔥 clear everything
    navigate("/");
  };

  /* ✅ CLEAN ROLE BASED NAV */

  let navLinks: { path: string; label: string }[] = [];

  if (role === "officer") {

    navLinks = [
      { path: "/", label: "Home" },
      { path: "/officer-dashboard", label: "Officer Dashboard" }
    ];

  } else {

    navLinks = [
      { path: "/", label: "Home" },
      { path: "/submit-complaint", label: "Submit Complaint" },
      { path: "/track-status", label: "Track Status" },
      ...(token ? [{ path: "/citizen-dashboard", label: "My Dashboard" }] : [])
    ];

  }

  return (

    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex h-16 items-center justify-between">

          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Civix Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-primary">Civix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1 ml-auto">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}

          </div>

          {/* Login / Logout */}
          <div className="hidden md:flex md:items-center md:space-x-2">

            {token ? (
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>

                <Link to="/signup">
                  <Button className="bg-gradient-civic">Sign Up</Button>
                </Link>
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (

        <div className="md:hidden border-t bg-card">

          <div className="space-y-1 px-4 pb-3 pt-2">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col space-y-2 pt-4">

              {token ? (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>

                  <Link to="/signup">
                    <Button className="w-full bg-gradient-civic">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}

            </div>

          </div>

        </div>

      )}

    </nav>
  );
};

export default Navbar;