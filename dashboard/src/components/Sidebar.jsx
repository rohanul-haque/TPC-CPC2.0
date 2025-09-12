import { navLink } from "@/assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav>
      <aside className="mt-4">
        <ul>
          {navLink.map((link) => (
            <li key={link.id || link.path || link.title} className="mb-3">
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-l-md transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-500 font-medium"
                      : "hover:bg-blue-50 text-gray-700"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </nav>
  );
};

export default Sidebar;