import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "./AppContext";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useContext(AppContext);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/admin/data`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (data.success) {
        setAdminData(data.admin);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchAdminData();
    }
  }, []);

  const value = {
    adminData,
    setAdminData,
    loading,
    fetchAdminData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
