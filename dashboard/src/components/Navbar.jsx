import { assets, navLink } from "@/assets/assets";
import { UserContext } from "@/contexts/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, LogOut, Menu, X } from "lucide-react"; // 👈 extra icons
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const { adminData, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // 👇 profile dropdown state
  const [profileOpen, setProfileOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    navigate("/login");
  };

  return (
    <header className="pt-5 pb-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <nav className="flex items-center justify-between">
        {/* Dashboard Text as Logo */}
        <NavLink to={"/"} className="text-xl font-bold text-blue-500">
          Dashboard
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3 ml-auto relative">
          {/* Profile with dropdown */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="hidden md:block h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : (
              <>
                <img
                  className="w-10 h-10 rounded-full object-cover border"
                  src={adminData?.adminProfile}
                  alt="profile"
                />
                <span className="hidden md:block font-medium text-gray-700 dark:text-gray-200">
                  {adminData?.name}
                </span>
                {profileOpen ? (
                  <ChevronUp
                    size={18}
                    className="text-gray-600 dark:text-gray-300"
                  />
                ) : (
                  <ChevronDown
                    size={18}
                    className="text-gray-600 dark:text-gray-300"
                  />
                )}
              </>
            )}
          </div>
          <AnimatePresence>
            {profileOpen && !loading && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-md border dark:border-gray-800 z-50 overflow-hidden"
              >
                {/* Profile link */}
                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Profile
                </Link>

                {/* Logout button */}
                <button
                  onClick={logoutHandler}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-black shadow-lg border-r z-50 flex flex-col"
            >
              {/* Header (Dashboard text + close) */}
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                <span className="text-xl font-bold text-blue-500">
                  Dashboard
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMenuOpen(false)}
                >
                  <X />
                </Button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 flex flex-col gap-1 p-4">
                <div className="flex items-center gap-2 border-b pb-3 mb-2 dark:border-gray-800">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  ) : (
                    <>
                      <img
                        className="w-10 h-10 rounded-full object-cover border"
                        src={adminData?.adminProfile || assets.teamMember}
                        alt="profile"
                      />
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {adminData?.name || "Admin"}
                      </span>
                    </>
                  )}
                </div>

                {navLink.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `py-2 px-3 rounded-md transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-600 font-medium dark:bg-gray-800"
                          : "hover:bg-blue-50 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {/* Bottom Logout */}
              <div className="border-t p-4 dark:border-gray-800">
                <Button
                  onClick={logoutHandler}
                  className="w-full flex gap-2 items-center"
                  variant="ghost"
                  disabled={loading}
                >
                  <LogOut /> Logout
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
