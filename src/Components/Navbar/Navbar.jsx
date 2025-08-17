import React, { useState, useRef, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SkyTowerLogo from "../SkyTowerLogo/SkyTowerLogo";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const links = (
    <>
      <Link
        to="/"
        className="hover:text-secondary transition-colors font-medium text-base"
      >
        Home
      </Link>
      <Link
        to="/apartments"
        className="hover:text-secondary transition-colors font-medium text-base"
      >
        Apartments
      </Link>
      <Link
        to="/about"
        className="hover:text-secondary transition-colors font-medium text-base"
      >
        About
      </Link>
      <Link
        to="/contact"
        className="hover:text-secondary transition-colors font-medium text-base"
      >
        Contact
      </Link>
    </>
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logOutUser();
    setDropdownOpen(false);
    navigate("/");
  };

  // <nav className="w-full fixed top-0 bg-white/80 z-99 shadow flex items-center justify-between px-4 md:px-6 lg:px-10 h-16 backdrop-blur-3xl">
  //     {/* Logo and Name */}
  //       <SkyTowerLogo></SkyTowerLogo>
  //     {/* Nav Links */}
  //     <div className="flex items-center gap-8">
  //       <Link to="/" className="hover:text-secondary transition-colors font-medium text-base">Home</Link>
  //       <Link to="/apartments" className="hover:text-secondary transition-colors font-medium text-base">Apartments</Link>
  //     </div>
  //     {/* User/Login */}
  //     <div className="relative flex items-center">
  //       {!user ? (
  //         <Link
  //           to="/login"

  //           title="Login"
  //         >
  //           <span aria-label="login" className="border-2 rounded-lg border-primary  px-4 py-1 text-lg bg-primary hover:bg-secondary hover:border-secondary text-secondary-content hover:text-secondary-content transition-colors font-semibold">Login</span>
  //         </Link>
  //       ) : (
  //         <div ref={dropdownRef} className="relative">
  //           <img
  //             src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'U')}`}
  //             alt="Profile"
  //             onClick={() => setDropdownOpen((open) => !open)}
  //             className="w-11 h-11 rounded-full border-2 border-secondary cursor-pointer object-cover hover:scale-105 transition-transform"
  //           />
  //           {dropdownOpen && (
  //             <div className="absolute right-0 mt-3 bg-base-100 text-base-content shadow-lg rounded-lg min-w-[200px] flex flex-col py-2 z-30 animate-fade-in" style={{top: '48px'}}>
  //               <div className="px-5 py-3 font-semibold text-primary border-b border-base-300 cursor-default">
  //                 {user.displayName || user.email}
  //               </div>
  //               <Link
  //                 to="/dashboard"
  //                 className="px-5 py-3 hover:bg-base-200 transition-colors border-b border-base-300"
  //                 onClick={() => setDropdownOpen(false)}
  //               >
  //                 Dashboard
  //               </Link>
  //               <button
  //                 onClick={handleLogout}
  //                 className="px-5 py-3 text-error text-left hover:bg-error hover:text-error-content transition-colors rounded-b-lg"
  //               >
  //                 Logout
  //               </button>
  //             </div>
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   </nav>

  return (
    <div className="navbar fixed top-0 bg-white/80 z-99 backdrop-blur-3xl px-4 md:px-8 lg:px-10 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <SkyTowerLogo></SkyTowerLogo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">{links}</ul>
      </div>
      <div className="navbar-end">
        {!user ? (
          <Link to="/login" title="Login">
            <span
              aria-label="login"
              className="border-2 rounded-lg border-primary  px-4 py-1 text-lg bg-primary hover:bg-secondary hover:border-secondary text-secondary-content hover:text-secondary-content transition-colors font-semibold"
            >
              Login
            </span>
          </Link>
        ) : (
          <div ref={dropdownRef} className="relative">
            <img
              src={
                user.photoURL ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.displayName || user.email || "U"
                )}`
              }
              alt="Profile"
              onClick={() => setDropdownOpen((open) => !open)}
              className="w-11 h-11 rounded-full border-2 border-secondary cursor-pointer object-cover hover:scale-105 transition-transform"
            />
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-3 bg-base-100 text-base-content shadow-lg rounded-lg min-w-[200px] flex flex-col py-2 z-30 animate-fade-in"
                style={{ top: "48px" }}
              >
                <div className="px-5 py-3 font-semibold text-primary border-b border-base-300 cursor-default">
                  {user.displayName || user.email}
                </div>
                <Link
                  to="/dashboard"
                  className="px-5 py-3 hover:bg-base-200 transition-colors border-b border-base-300"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-3 text-error text-left hover:bg-error hover:text-error-content transition-colors rounded-b-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
