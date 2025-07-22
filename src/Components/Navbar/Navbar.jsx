import React, { useState, useRef, useEffect } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import SkyTowerLogo from '../SkyTowerLogo/SkyTowerLogo';

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logOutUser();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="w-full  shadow flex items-center justify-between px-6 h-16 relative z-20">
      {/* Logo and Name */}
        <SkyTowerLogo></SkyTowerLogo>
      {/* Nav Links */}
      <div className="flex items-center gap-8">
        <Link to="/" className="hover:text-secondary transition-colors font-medium text-base">Home</Link>
        <Link to="/apartments" className="hover:text-secondary transition-colors font-medium text-base">Apartments</Link>
      </div>
      {/* User/Login */}
      <div className="relative flex items-center">
        {!user ? (
          <Link
            to="/login"
            
            title="Login"
          >
            <span aria-label="login" className="border-2 rounded-lg border-primary  px-4 py-1 text-lg bg-primary hover:bg-secondary hover:border-secondary text-secondary-content hover:text-secondary-content transition-colors font-semibold">Login</span>
          </Link>
        ) : (
          <div ref={dropdownRef} className="relative">
            <img
              src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'U')}`}
              alt="Profile"
              onClick={() => setDropdownOpen((open) => !open)}
              className="w-11 h-11 rounded-full border-2 border-secondary cursor-pointer object-cover hover:scale-105 transition-transform"
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 bg-base-100 text-base-content shadow-lg rounded-lg min-w-[200px] flex flex-col py-2 z-30 animate-fade-in" style={{top: '48px'}}>
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
    </nav>
  );
};

export default Navbar;