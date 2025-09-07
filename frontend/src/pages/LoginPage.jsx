import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => setPasswordVisible(!passwordVisible);

  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(`${backendUrl}/user/login`, {
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-md rounded-lg border border-gray-400/60 dark:border-gray-600/80 backdrop-blur-md p-6">
        {/* Header */}
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to login
          </p>
        </div>

        {/* Form Card */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium block text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400/60 dark:border-gray-600"
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium block text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <Link
                  className="text-sm font-medium underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-gray-400/60 dark:border-gray-600 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin h-5 w-5" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Link to Signup */}
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-5">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="hover:underline underline-offset-4 text-blue-600 dark:text-blue-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
