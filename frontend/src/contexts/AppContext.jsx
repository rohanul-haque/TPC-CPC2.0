import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    backendUrl,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
