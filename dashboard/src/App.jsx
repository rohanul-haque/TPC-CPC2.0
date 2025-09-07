import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AddEventPage from "./pages/AddEventPage";
import AddOurAdvisorPage from "./pages/AddOurAdvisorPage";
import AddTeamMember from "./pages/AddTeamMember";
import AdvisorListPage from "./pages/AdvisorListPage";
import BlogList from "./pages/BlogList";
import EventListPage from "./pages/EvenetListPage";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TeamListPage from "./pages/TeamListPage";

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-team-member" element={<AddTeamMember />} />
        <Route path="/team-list" element={<TeamListPage />} />
        <Route path="/add-advisor" element={<AddOurAdvisorPage />} />
        <Route path="/advisor-list" element={<AdvisorListPage />} />
        <Route path="/add-event" element={<AddEventPage />} />
        <Route path="/event-list" element={<EventListPage />} />
        <Route path="/add-blog" element={<BlogList />} />
        <Route path="/admin-login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
