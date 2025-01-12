import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Handle clicks outside of the user menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? 'text-algo-blue' : 'text-algo-light hover:text-algo-blue';
  };

  const handleLogout = () => {
    try {
      logout();
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // You could add a toast notification here to show the error
    }
  };

  return (
    <nav className="bg-algo-dark shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg 
                className="h-8 w-8 text-algo-blue"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="ml-2 text-xl font-bold text-algo-light">
                AlgoViz
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${isActive('/')} transition-colors duration-200 text-sm font-medium`}
            >
              Home
            </Link>
            <Link 
              to="/heapsort" 
              className={`${isActive('/heapsort')} transition-colors duration-200 text-sm font-medium`}
            >
              HeapSort
            </Link>
            <Link 
              to="/nqueens" 
              className={`${isActive('/nqueens')} transition-colors duration-200 text-sm font-medium`}
            >
              N-Queens
            </Link>
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className="text-algo-light hover:text-algo-blue transition-colors duration-200 text-sm font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="text-algo-light hover:text-algo-blue transition-colors duration-200 text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-1 text-algo-light hover:text-algo-blue transition-colors duration-200 text-sm font-medium p-2 rounded-md hover:bg-algo-dark-lighter"
                  aria-expanded={showUserMenu}
                  aria-haspopup="true"
                >
                  <span>{user.username}</span>
                  <svg
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      showUserMenu ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {showUserMenu && (
                  <div 
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-algo-dark ring-1 ring-black ring-opacity-5 z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div className="py-1" role="none">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-algo-light hover:bg-algo-dark-lighter hover:text-algo-blue"
                        role="menuitem"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-algo-light hover:bg-algo-dark-lighter hover:text-algo-blue"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;