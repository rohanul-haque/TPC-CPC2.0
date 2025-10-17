import { assets, navLink } from "@/assets/assets";
import { ThemeContext } from "@/contexts/ThemeContext";
import { UserContext } from "@/contexts/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  DiamondPlus,
  LoaderCircle,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { loading, userData, fetchUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const dropdownRef = useRef();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfileDropdown(false);
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 overflow-hidden relative">
        <motion.div
          className="flex whitespace-nowrap text-sm md:text-base tracking-wide"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          <span className="mr-10">
            🚀{" "}
            <span className="font-medium">
              🚀 Python Workshop — Coming Soon! Learn Python A→Z with hands-on
              AI modules. Real Python assignments ✅, official certificate ✅.
              Seats limited — register now! ✨
            </span>{" "}
            <span className="font-medium">
              🚀 Python Workshop — Coming Soon! Learn Python A→Z with hands-on
              AI modules. Real Python assignments ✅, official certificate ✅.
              Seats limited — register now! ✨
            </span>{" "}
          </span>
        </motion.div>
      </div>

      <nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`transition-all ${
          scrolled
            ? "bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-b dark:border-b-gray-700 border-b-gray-300"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-10 py-3 container mx-auto">
          {" "}
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              className="w-[100px] h-[50px] object-cover"
              src={assets.logo}
              alt="logo"
            />
          </Link>
          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-2">
            {navLink.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3 py-1.5 rounded transition-colors duration-300 ${
                      isActive
                        ? "bg-indigo-500 text-white font-medium"
                        : "text-gray-700 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-500"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Right Side */}
          <div className="flex items-center gap-2 relative">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Loader while fetching user data */}
            {loading ? (
              <LoaderCircle className="animate-spin h-6 w-6" />
            ) : userData ? (
              // User logged in: show profile avatar and dropdown
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => setProfileDropdown(!profileDropdown)}
                >
                  {userData?.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt={userData.fullName}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                      {userData.fullName.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      profileDropdown ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {profileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50 border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileDropdown(false)}
                      >
                        <User size={16} className="inline mr-2" /> Profile
                      </Link>
                      <Link
                        to="/add-review"
                        className="block px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileDropdown(false)}
                      >
                        <DiamondPlus size={16} className="inline mr-2" /> Add
                        Review
                      </Link>
                      <button
                        className="w-full text-left px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} className="inline mr-2" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // User not logged in: show Join Us button
              <Button
                onClick={() => navigate("/signup")}
                variant={"destructive"}
                className="hidden sm:inline-flex cursor-pointer"
              >
                Join Us
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 w-3/4 max-w-xs h-full bg-white dark:bg-gray-900 shadow-lg flex flex-col z-50 border-r border-r-gray-400 dark:border-r-gray-700"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <img
                  className="w-[90px] h-[50px] object-cover"
                  src={assets.logo}
                  alt="logo"
                />
                <button
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="text-gray-700 dark:text-gray-200" size={22} />
                </button>
              </div>

              <ul className="flex flex-col gap-2 p-4">
                {navLink.map((link) => (
                  <li key={link.id}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-3 py-2.5 rounded transition ${
                          isActive
                            ? "bg-indigo-500 text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`
                      }
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {!userData && (
                <div className="mt-auto p-4 border-t">
                  <Button
                    onClick={() => {
                      navigate("/signup");
                      setMobileOpen(false);
                    }}
                    variant={"destructive"}
                    className="w-full"
                  >
                    Join Us
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
