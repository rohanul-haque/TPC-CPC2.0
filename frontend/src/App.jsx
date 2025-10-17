import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { HomePageDataContext } from "./contexts/HomePageDataContext";
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

const App = () => {
  const navigate = useNavigate();

  const { eventData, blogData, reviewData, loading, error } =
    useContext(HomePageDataContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const path = window.location.pathname;

    if (token && (path === "/login" || path === "/signup")) {
      navigate("/", { replace: true });
    }

    if (!token && (path === "/profile" || path === "/add-review")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/teams" element={<TeamPage />} />
        <Route
          path="/blogs"
          element={
            <BlogPage blogData={blogData} loading={loading} error={error} />
          }
        />
        <Route path="/blog/:id" element={<ViewBlogPage />} />
        <Route
          path="/events"
          element={
            <EventPage eventData={eventData} loading={loading} error={error} />
          }
        />
        <Route path="/faqs" element={<Faqs />} />
        <Route
          path="/testimonials"
          element={
            <Testimonials
              reviewData={reviewData}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

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
