import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-algo-blue' : 'text-algo-light hover:text-algo-blue';
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;