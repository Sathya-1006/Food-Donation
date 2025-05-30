import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, userType, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (userType === 'restaurant') {
      return '/restaurant/dashboard';
    } else if (userType === 'volunteer') {
      return '/volunteer/dashboard';
    }
    return '/';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full">
              <span className="text-xl font-bold">FS</span>
            </div>
            <span className={`text-xl font-bold ${isScrolled ? 'text-green-700' : 'text-green-600'}`}>
              FoodShare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-gray-800'} hover:text-green-600 transition-colors`}>
              Home
            </Link>
            <Link to="/about" className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-gray-800'} hover:text-green-600 transition-colors`}>
              About
            </Link>
            {isAuthenticated && (
              <Link to={getDashboardLink()} className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-gray-800'} hover:text-green-600 transition-colors`}>
                Dashboard
              </Link>
            )}

            <div className="pl-6 border-l border-gray-300">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile\" className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {user?.profileImage ? (
                        <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium group-hover:text-green-600 transition-colors">
                      {user?.name}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <Button variant="outline">Log In</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 flex flex-col space-y-4 border-t border-gray-100">
          <Link to="/" className="text-gray-800 font-medium hover:text-green-600 transition-colors py-2">
            Home
          </Link>
          <Link to="/about" className="text-gray-800 font-medium hover:text-green-600 transition-colors py-2">
            About
          </Link>
          {isAuthenticated && (
            <Link to={getDashboardLink()} className="text-gray-800 font-medium hover:text-green-600 transition-colors py-2">
              Dashboard
            </Link>
          )}

          <div className="pt-4 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <Link to="/profile\" className="flex items-center space-x-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <span className="font-medium">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 text-red-500 py-2 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link to="/login" className="w-full">
                  <Button variant="outline" fullWidth>
                    Log In
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button fullWidth>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;