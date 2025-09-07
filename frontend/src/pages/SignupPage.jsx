import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { AppContext } from "@/contexts/AppContext";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Clock,
  Eye,
  EyeOff,
  IdCard,
  KeyRound,
  LoaderCircle,
  Mail,
  Phone,
  User,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [step, setStep] = useState(1);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [shift, setShift] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("mobileNumber", mobileNumber);
      formData.append("rollNumber", rollNumber);
      formData.append("department", department);
      formData.append("shift", shift);
      formData.append("password", password);
      if (profileImage) formData.append("profileImage", profileImage);

      const { data } = await axios.post(
        `${backendUrl}/user/register`,
        formData
      );

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium">Step {step} of 3</span>
            <span className="text-sm">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 bg-violet-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Signup Card */}
        <div className="signin-card rounded-lg border border-gray-400/60 dark:border-gray-600 backdrop-blur-md p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
              <User size={24} />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Create Account
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {step === 1 && "Enter your basic information"}
              {step === 2 && "Set up your credentials"}
              {step === 3 && "Upload your profile image"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="signin-step space-y-4">
                <InputWithIcon
                  icon={<UserRound size={16} />}
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  required
                />
                <InputWithIcon
                  icon={<Phone size={16} />}
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Mobile Number"
                  required
                />
                <InputWithIcon
                  icon={<IdCard size={16} />}
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="Roll Number"
                  required
                />
                <InputWithIcon
                  icon={<Building2 size={16} />}
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Department"
                  required
                />
                <InputWithIcon
                  icon={<Clock size={16} />}
                  type="text"
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  placeholder="Shift"
                  required
                />
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    !fullName ||
                    !mobileNumber ||
                    !rollNumber ||
                    !department ||
                    !shift
                  }
                  className="w-full flex items-center justify-center gap-2"
                >
                  Next Step <ArrowRight size={16} />
                </Button>
              </div>
            )}

            {/* Step 2: Email & Password */}
            {step === 2 && (
              <div className="signin-step space-y-4">
                <InputWithIcon
                  icon={<Mail size={16} />}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
                <div className="relative">
                  {/* Left side Icon */}
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound size={16} />
                  </div>

                  {/* Password Input */}
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password (min 6 chars)"
                    className="w-full pl-9 pr-10 border-gray-400 dark:border-gray-600"
                    required
                  />

                  {/* Show/Hide Button */}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!email || password.length < 6}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Next Step <ArrowRight size={16} />
                </Button>
              </div>
            )}

            {/* Step 3: Profile Image */}
            {step === 3 && (
              <div className="signin-step space-y-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium">
                    Profile Image
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border-gray-400 dark:border-gray-600"
                    required
                  />
                </div>
                {profileImage && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {profileImage.name}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-1"
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="animate-spin h-5 w-5" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            )}
          </form>

          {/* Back Button */}
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="mt-4 w-full text-sm flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable input with icon
const InputWithIcon = ({ icon, type = "text", ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <Input
      type={type}
      className="w-full pl-9 pr-10 py-2 border border-gray-400 dark:border-gray-600"
      {...props}
    />
  </div>
);

export default SignupPage;
