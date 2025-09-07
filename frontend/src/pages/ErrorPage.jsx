import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightLeftIcon, ArrowRightToLine, MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col items-center text-center space-y-6">
        <img
          className="w-80"
          src={assets.error}
          alt="Error illustration"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Oops! Page Not Found
        </h1>
        <p className="text-sm sm:text-base">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="cursor-pointer"
          variant={"destructive"}
        >
          Go to Home Page <MoveRight />
        </Button>
      </div>
    </section>
  );
};

export default ErrorPage;
