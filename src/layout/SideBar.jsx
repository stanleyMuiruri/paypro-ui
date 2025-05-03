import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
} from "react-icons/fa";
import logo from '../assets/pesalink_logo_new.jpg';

const Sidebar = ({ children, isOpen, setIsOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
  ];

  return (
    <div className="flex">
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 text-white bg-[var(--color-pesalink-blue)] p-2 rounded-md md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[var(--color-pesalink-blue)] text-white transition-all duration-300 z-40
        ${isOpen ? "w-64" : "w-20"} ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}`}
      >
        <div className="flex items-center justify-between p-4">
          <img
            src={logo}
            alt="PesaLink Logo"
            className={`transition-all duration-300 ${isOpen ? "w-40" : "w-0 hidden"}`}
          />
        </div>

        <ul className="mt-4 space-y-1">
          {menuItems.map((item, index) => (
            <li key={index} className="group relative">
              <Link
                to={item.path}
                onClick={() => isMobile && setIsOpen(false)}
                className={`flex items-center gap-4 py-3 px-4 rounded-md transition-all duration-200
                ${location.pathname === item.path
                    ? "bg-[var(--color-pesalink-teal)]"
                    : "hover:bg-[var(--color-pesalink-orange)] hover:text-white"
                  }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className={`whitespace-nowrap transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 invisible"
                    }`}
                >
                  {item.name}
                </span>
              </Link>

              {!isOpen && !isMobile && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max bg-[var(--color-pesalink-teal)] text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  {item.name}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Dark overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${isMobile ? "ml-0" : isOpen ? "ml-64" : "ml-20"
          }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
