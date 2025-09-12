import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(
    () => Number(localStorage.getItem("resetStep")) || 1
  );
  const [email, setEmail] = useState(
    () => localStorage.getItem("resetEmail") || ""
  );

  // OTP state (always numeric digits)
  const [code, setCode] = useState(() => {
    const savedCode = localStorage.getItem("resetOTP");
    return savedCode
      ? savedCode.split("").map((d) => Number(d) || "")
      : new Array(4).fill("");
  });

  const inputRefs = useRef([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => localStorage.setItem("resetStep", step), [step]);
  useEffect(() => {
    if (email) localStorage.setItem("resetEmail", email);
  }, [email]);
  useEffect(() => localStorage.setItem("resetOTP", code.join("")), [code]);

  // OTP Handling
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // only single digit 0-9
    const newCode = [...code];
    newCode[index] = value ? Number(value) : "";
    setCode(newCode);
    if (value && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(pasteData)) return;
    const newCode = pasteData.split("").map((d) => Number(d));
    setCode([...newCode, ...new Array(4 - newCode.length).fill("")]);
    inputRefs.current[Math.min(pasteData.length, 3)]?.focus();
  };

  useEffect(() => {
    if (step === 2) inputRefs.current[0]?.focus();
  }, [step]);

  // API Calls
  const sendCode = async () => {
    if (!email) return toast.error("Please enter your email");
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/admin/send-otp`, {
        email,
      });
      if (data.success) {
        toast.success(data.message);
        setStep(2);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (code.join("").length !== 4)
      return toast.error("Please enter the 4-digit code");

    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/admin/check-otp`, {
        email,
        otp: Number(code.join("")), // always Number
      });

      if (data.success) {
        setStep(3);
      } else {
        toast.error(data.message || "Invalid code");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");
    if (newPassword.length < 6)
      return toast.error("Password must be at least 6 characters");

    setLoading(true);
    console.log(email)
    try {
      const { data } = await axios.post(`${backendUrl}/admin/change-password`, {
        email,
        otp: Number(code.join("")),
        newPassword,
      });
      if (data.success) {
        toast.success("Password reset successful! Please login.");
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("resetStep");
        localStorage.removeItem("resetOTP");

        setStep(1);
        setEmail("");
        setCode(new Array(4).fill(""));
        setNewPassword("");
        setConfirmPassword("");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section className="flex justify-center mt-10 items-center h-screen">
      <form
        onSubmit={resetPassword}
        className="w-full max-w-md mx-auto space-y-6 p-6 rounded-xl border border-gray-400/60 dark:border-gray-600 backdrop-blur-md"
      >
        {/* Top-left Back Link */}
        {step > 1 && (
          <div
            className="flex items-center cursor-pointer text-blue-600 dark:text-blue-500 hover:underline mb-4"
            onClick={handleBack}
          >
            <ArrowLeft size={16} className="mr-1" /> Back
          </div>
        )}

        {/* Step 1: Email */}
        {step === 1 && (
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-center">
              🔑 Reset Password
            </h1>
            <p className="text-sm text-muted-foreground text-center">
              Enter your email to receive a verification code
            </p>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={18}
              />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="pl-10 border-gray-400/60 dark:border-gray-600"
                required
              />
            </div>
            <Button
              className="w-full flex items-center justify-center gap-1"
              type="button"
              disabled={loading}
              onClick={sendCode}
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Sending..." : "Send Verification Code"}
            </Button>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-center">
              📩 Verify Code
            </h1>
            <p className="text-sm text-muted-foreground text-center">
              Enter the 4-digit code sent to your email
            </p>
            <div className="flex items-center justify-center font-sans p-4">
              <div className="relative z-10">
                <div
                  className="flex justify-center gap-2 sm:gap-3 mb-8"
                  onPaste={handlePaste}
                >
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      placeholder="•"
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold bg-gray-50 dark:bg-[#0D1117] text-gray-900 dark:text-white rounded-lg outline-none border border-dashed border-gray-300 dark:border-gray-700"
                    />
                  ))}
                </div>
                <p className="text-gray-500 text-sm">
                  Didn't receive a code?{" "}
                  <button
                    type="button"
                    onClick={sendCode}
                    className="text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 font-semibold focus:outline-none focus:underline"
                  >
                    Resend code
                  </button>
                </p>
              </div>
            </div>

            <Button
              className="w-full flex items-center justify-center gap-1"
              type="button"
              disabled={loading}
              onClick={verifyCode}
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Verifying..." : "Verify & Continue"}
            </Button>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-center">
              🔒 Create New Password
            </h1>
            <p className="text-sm text-muted-foreground text-center">
              Choose a strong password for your account
            </p>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={18}
              />
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="pl-10 border-gray-400/60 dark:border-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={18}
              />
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="pl-10 border-gray-400/60 dark:border-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button
              className="w-full flex items-center justify-center gap-1"
              type="submit"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </div>
        )}
      </form>
    </section>
  );
};

export default ForgotPasswordPage;
