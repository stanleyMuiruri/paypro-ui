import { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from '../assets/pesalink_logo_new.jpg'

const Navbar = ({ role, isOpen, isMobile }) => {

  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("Select Company");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  // Dummy Company List (Replace with API data later)
  const companies = ["Rift Cars", "AutoX", "Speed Motors", "Elite Rides"];

  // Handle Logout
  const handleLogout = () => {
    localStorage.clear();         
    window.location.reload();     
  };


  return (

    <nav
      className={`bg-white shadow-md fixed top-0 z-20 h-16 px-4 py-4 flex items-center justify-between transition-all duration-300 ${isMobile
          ? 'left-0 w-full'
          : isOpen
            ? 'left-64 w-[calc(100%-16rem)]'
            : 'left-20 w-[calc(100%-5rem)]'
        }`}
    >
      {/* Full-width container for layout control */}
      <div className="relative flex items-center w-full">

        {/* Logo - Only show on larger screens */}
        {!isMobile && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="Rift Cars Logo" className="w-36" />
          </div>
        )}

        {/* Profile Icon - Right aligned */}
        <div className="ml-auto relative">
          <button onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
            <FaUserCircle size={isMobile ? 24 : 28} className="text-[#0056A6]" />
          </button>
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 w-full hover:bg-[#F0F5FF]"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>



  );
};

export default Navbar;
