import { navLink } from "@/assets/assets";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";
import { NavLink } from "react-router-dom";

const FooterPage = () => {
  return (
    <footer className="bg-gray-900 px-4 sm:px-8 lg:px-16 mt-20 pt-16 pb-10 rounded-tl-xl rounded-tr-xl text-white dark:border-t dark:border-gray-700 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-5">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-2">
            {navLink.map((link) => (
              <li key={link.id}>
                <NavLink
                  className={({ isActive }) =>
                    `transition-all duration-300 block w-fit ${
                      isActive
                        ? "text-blue-400 font-medium"
                        : "hover:text-blue-500 dark:hover:text-blue-300"
                    }`
                  }
                  to={link.path}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-bold mb-5">Follow Us</h3>
          <div className="flex space-x-4 relative z-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://web.facebook.com/groups/tpicpc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gray-800 flex items-center justify-center rounded-md hover:bg-purple-600 transition-all duration-300 cursor-pointer"
                >
                  <Facebook size={20} />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Our Official Facebook Group</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://github.com/tpicpc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gray-800 flex items-center justify-center rounded-md hover:bg-purple-600 transition-all duration-300 cursor-pointer"
                >
                  <Github size={20} />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Github</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://www.linkedin.com/company/tpicpc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gray-800 flex items-center justify-center rounded-md hover:bg-purple-600 transition-all duration-300 cursor-pointer"
                >
                  <Linkedin size={20} />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://www.youtube.com/@tpicpc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gray-800 flex items-center justify-center rounded-md hover:bg-purple-600 transition-all duration-300 cursor-pointer"
                >
                  <Youtube size={20} />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>YouTube</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://www.instagram.com/tpicpc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gray-800 flex items-center justify-center rounded-md hover:bg-purple-600 transition-all duration-300 cursor-pointer"
                >
                  <Instagram size={20} />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Instagram</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-5">Contact Info</h3>
          <ul className="space-y-3 text-gray-300 relative">
            <li>
              <b className="text-white">Email:</b> tpicpc@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <b className="text-white">Official Page:</b>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://web.facebook.com/TPICPCThakurgonPolytechnicInstitute"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Facebook Official Page
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Contact us on our Facebook Official Page</p>
                </TooltipContent>
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center">
        <p className="text-gray-400 text-sm md:text-base">
          &copy; {new Date().getFullYear()} All rights reserved by
          <b className="ml-1 text-white">
            ❤️‍🔥 TPI CPC - Computer and Programming Club ❤️‍🔥
          </b>
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;
