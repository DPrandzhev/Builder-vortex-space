import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Target, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-fitness-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-fitness-primary" />
            <span className="text-2xl font-bold text-fitness-dark">
              FitnessPlan AI
            </span>
          </div>
        </div>
      </header>

      <div
        className="flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold text-fitness-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-fitness-dark mb-4">
            Страницата не е намерена
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Страницата, която търсите, не съществува или е била преместена.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="btn-primary text-lg px-8 py-3 h-auto"
          >
            <Home className="h-5 w-5 mr-2" />
            Към началото
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
