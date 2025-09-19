import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AboutPage from "./pages/AboutPage";
import AddReviewPage from "./pages/AddReviewPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import ErrorPage from "./pages/ErrorPage";
import EventPage from "./pages/EventPage";
import Faqs from "./pages/Faqs";
import ForgotPasswordPage from "./pages/ForgotPassowordPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import SignupPage from "./pages/SignupPage";
import TeamPage from "./pages/TeamPage";
import Testimonials from "./pages/Testimonials";
import ViewBlogPage from "./pages/ViewBlogPage";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const path = window.location.pathname;

    // Redirect logged-in users away from login/signup
    if (token && (path === "/login" || path === "/signup")) {
      navigate("/", { replace: true });
    }

    // Redirect non-logged-in users away from protected pages
    if (!token && (path === "/profile" || path === "/add-review")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AppLayout>
      {/* Scroll to Top Button */}
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 w-10 h-10 bg-indigo-500 shadow-lg rounded-md flex items-center justify-center hover:bg-indigo-600"
          aria-label="Scroll to top"
        >
          <ChevronUp className="text-white" />
        </button>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/teams" element={<TeamPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:id" element={<ViewBlogPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-review"
          element={
            <ProtectedRoute>
              <AddReviewPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
