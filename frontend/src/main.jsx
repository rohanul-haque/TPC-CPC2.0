import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AppContextProvider } from "./contexts/AppContext";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { UserContextProvider } from "./contexts/UserContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <ThemeContextProvider>
        <UserContextProvider>
          <App />
          <Toaster />
        </UserContextProvider>
      </ThemeContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
