import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppLayout from "./layout/AppLayout";
import AddBlogPage from "./pages/AddBlogPage";
import AddEventPage from "./pages/AddEventPage";
import AddOurAdvisorPage from "./pages/AddOurAdvisorPage";
import AddTeamMember from "./pages/AddTeamMember";
import AdvisorListPage from "./pages/AdvisorListPage";
import BlogList from "./pages/BlogList";
import EvenetListPage from "./pages/EvenetListPage";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import TeamListPage from "./pages/TeamListPage";
import ViewBlogPage from "./pages/ViewBlogPage";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // যদি token না থাকে এবং ইউজার লগিন বা পাসওয়ার্ড রিসেট পেজে না থাকে → login এ পাঠাও
    if (
      !token &&
      location.pathname !== "/login" &&
      location.pathname !== "/reset-password"
    ) {
      navigate("/login", { replace: true });
    }
    // যদি token থাকে এবং রুট "/" হয় → ড্যাশবোর্ড এ পাঠাও
    else if (token && location.pathname === "/") {
      navigate("/add-team-member", { replace: true });
    }
  }, [navigate, location.pathname, token]);

  const isAuthFreePage =
    location.pathname === "/login" || location.pathname === "/reset-password";

  return (
    <>
      {isAuthFreePage ? (
        // Public routes (no layout)
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
        </Routes>
      ) : (
        // Protected routes (with layout)
        <AppLayout>
          <Navbar />
          <div className="flex gap-3 min-h-screen">
            <div className="w-48 hidden lg:block border-r">
              <Sidebar />
            </div>
            <div className="flex-1 pt-3 overflow-y-auto">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add-team-member" element={<AddTeamMember />} />
                <Route path="/team-list" element={<TeamListPage />} />
                <Route path="/add-advisor" element={<AddOurAdvisorPage />} />
                <Route path="/advisor-list" element={<AdvisorListPage />} />
                <Route path="/add-event" element={<AddEventPage />} />
                <Route path="/event-list" element={<EvenetListPage />} />
                <Route path="/add-blog" element={<AddBlogPage />} />
                <Route path="/blog-list" element={<BlogList />} />
                <Route path="/blog/:id" element={<ViewBlogPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </div>
          </div>
        </AppLayout>
      )}
    </>
  );
};

export default App;
