import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const officernavbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="w-full border-b bg-card px-6 py-3 flex justify-between items-center">

      <h1 className="text-xl font-bold text-primary">
        Civix Officer Panel
      </h1>

      <div className="flex gap-4">

        <Link to="/officer-dashboard">
          <Button variant="outline">
            Dashboard
          </Button>
        </Link>

        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>

      </div>

    </nav>
  );
};

export default officernavbar;