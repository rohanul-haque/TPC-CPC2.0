import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${backendUrl}/user/data`, {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const value = {
    userData,
    setUserData,
    loading,
    fetchUserData,
    backendUrl,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
