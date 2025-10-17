import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";

export const HomePageDataContext = createContext();

export const HomePageDataContextProvider = ({ children }) => {
  const [advisorData, setAdvisorData] = useState([]);
  const [exTeamData, setExTeamMemberData] = useState([]);
  const [teamMemberData, setTeamMemberData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { backendUrl } = useContext(AppContext);

  const fetchHomePageData = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(`${backendUrl}/home-page/data`);

      if (data.success) {
        setAdvisorData(data.advisors);
        setExTeamMemberData(data.exTeams);
        setTeamMemberData(data.teamMembers);
        setEventData(data.events);
        setBlogData(data.blogs);
        setReviewData(data.reviews);
      }

      console.log(blogData);
    } catch (error) {
      setError("Home Page Data Not Found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomePageData();
  }, []);

  const value = {
    advisorData,
    exTeamData,
    teamMemberData,
    eventData,
    blogData,
    reviewData,
    loading,
    error,
    fetchHomePageData,
  };

  return (
    <HomePageDataContext.Provider value={value}>
      {children}
    </HomePageDataContext.Provider>
  );
};
