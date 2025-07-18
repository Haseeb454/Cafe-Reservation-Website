import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/Logo.png";

const AdminIcon = ({ isLoggedIn }) => (
  <div className="relative cursor-pointer">
    <IoPersonCircleSharp className="text-white hover:scale-110 transition-transform text-2xl" />
    {isLoggedIn && (
      <span className="absolute -top-1 -right-1 bg-green-500 border-2 border-black rounded-full h-3 w-3" />
    )}
  </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [adminDropdown, setAdminDropdown] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdminLoggedIn(!!token);
  }, [location]);

  const closeDropdown = () => setAdminDropdown(false);

  const handleLogin = () => {
    closeDropdown();
    navigate("/AdminLogin");
  };

  const handleSignup = () => {
    closeDropdown();
    navigate("/AdminSignup");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn(false);
    closeDropdown();
    navigate("/");
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300 },
    },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-4/5 lg:w-3/4 z-50 rounded-4xl bg-black/70 backdrop-blur-xl text-white shadow-2xl border border-gray-800">
      <div className="flex items-center justify-between flex-wrap px-4 md:px-6 py-4 md:py-6 relative z-10">
        <div className="text-xs sm:text-sm font-semibold text-yellow-500 font-mono w-full md:w-auto mb-2 md:mb-0 text-center md:text-left">
          🕒 Open: 10:00 AM - 11:00 PM
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 z-20">
          <Link to="/" className="cursor-pointer">
            <img
              src={logo}
              alt="Cafe Delight Logo"
              className="h-20 sm:h-24 drop-shadow-xl"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 ml-auto relative">
          <button
            onClick={() => setAdminDropdown(!adminDropdown)}
            title="Admin Menu"
            className="cursor-pointer"
          >
            <AdminIcon isLoggedIn={isAdminLoggedIn} />
          </button>

          <AnimatePresence>
            {adminDropdown && (
              <motion.div
                key="adminDropdown"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
                className="absolute right-0 top-10 bg-black border border-yellow-400/30 rounded-lg shadow-lg p-3 space-y-2 z-50 min-w-[150px]"
              >
                {!isAdminLoggedIn ? (
                  <>
                    <button
                      onClick={handleLogin}
                      className="w-full text-left hover:text-yellow-400 transition duration-200 cursor-pointer"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleSignup}
                      className="w-full text-left hover:text-yellow-400 transition duration-200 cursor-pointer"
                    >
                      Signup
                    </button>
                  </>
                ) : (
                  <>
                    {location.pathname !== "/AdminDashboard" && (
                      <Link
                        to="/AdminDashboard"
                        className="block hover:text-yellow-400 transition duration-200 cursor-pointer"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left hover:text-yellow-400 transition duration-200 cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Icons */}
          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:text-yellow-400 transition duration-200 cursor-pointer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-yellow-400 transition duration-200 cursor-pointer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:text-yellow-400 transition duration-200 cursor-pointer"
          >
            <FaTwitter />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden ml-auto z-20">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none cursor-pointer"
          >
            <svg
              className="h-6 w-6 fill-current text-white"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="px-6 pb-6 pt-4 md:hidden flex flex-col space-y-4 bg-black/90 backdrop-blur-md rounded-b-3xl text-white">
          <Link to="/" className="hover:text-yellow-400 transition duration-200 cursor-pointer">
            Home
          </Link>
          <Link to="/reserve" className="hover:text-yellow-400 transition duration-200 cursor-pointer">
            Reserve
          </Link>
          <Link to="/confirmation" className="hover:text-yellow-400 transition duration-200 cursor-pointer">
            Confirmation
          </Link>

          <div className="relative">
            <button
              onClick={() => setAdminDropdown(!adminDropdown)}
              className="flex items-center gap-2 hover:text-yellow-400 transition duration-200 cursor-pointer"
            >
              <AdminIcon isLoggedIn={isAdminLoggedIn} /> Admin
            </button>
            <AnimatePresence>
              {adminDropdown && (
                <motion.div
                  key="mobileDropdown"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className="mt-2 bg-black border border-yellow-400/30 rounded-lg shadow-lg p-3 space-y-2"
                >
                  {!isAdminLoggedIn ? (
                    <>
                      <button
                        onClick={handleLogin}
                        className="w-full text-left hover:text-yellow-400 transition duration-200 cursor-pointer"
                      >
                        Login
                      </button>
                      <button
                        onClick={handleSignup}
                        className="w-full text-left hover:text-yellow-400 transition duration-200 cursor-pointer"
                      >
                        Signup
                      </button>
                    </>
                  ) : (
                    <>
                      {location.pathname !== "/AdminDashboard" && (
                        <Link
                          to="/AdminDashboard"
                          className="block hover:text-yellow-400 transition duration-200 cursor-pointer"
                        >
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left hover:text-yellow-400 transition duration-200 cursor-pointer"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </nav>
  );
}
