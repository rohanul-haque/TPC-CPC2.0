import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { Toaster } from "react-hot-toast";
import { AppContextProvider } from "./contexts/AppContext.jsx";
import { UserContextProvider } from "./contexts/UserContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <UserContextProvider>
        <App />
        <Toaster />
      </UserContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
