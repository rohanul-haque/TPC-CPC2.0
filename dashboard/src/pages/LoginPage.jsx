import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { Eye, EyeOff, LoaderCircle, UserIcon } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${backendUrl}/admin/login`, {
        email,
        password,
      });

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        toast.success(data.message || "Login successful");
        navigate("/add-team-member");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center font-sans overflow-hidden px-6 sm:px-8">
      <div className="relative w-full max-w-sm p-6 space-y-6 bg-white dark:bg-black rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-lg dark:shadow-zinc-900/50">
        {/* Header */}
        <div className="text-center space-y-3">
          <div
            className="inline-flex p-2 bg-zinc-100 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-700"
            aria-hidden="true"
          >
            <UserIcon />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Enter your credentials to sign in
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={formSubmitHandler}>
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled={loading}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to={"/reset-password"}
                className="text-sm hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Input
                disabled={loading}
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
              >
                {showPassword ? (
                  <Eye size={17} className="text-gray-600" />
                ) : (
                  <EyeOff size={17} className="text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button disabled={loading} className="w-full" type="submit">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <LoaderCircle className="animate-spin" size={18} />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
