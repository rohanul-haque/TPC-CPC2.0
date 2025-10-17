import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AppContextProvider } from "./contexts/AppContext";
import { HomePageDataContextProvider } from "./contexts/HomePageDataContext.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { UserContextProvider } from "./contexts/UserContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <ThemeContextProvider>
        <HomePageDataContextProvider>
          <UserContextProvider>
            <App />
            <Toaster />
          </UserContextProvider>
        </HomePageDataContextProvider>
      </ThemeContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
