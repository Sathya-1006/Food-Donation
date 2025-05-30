import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-white text-green-600 rounded-full">
                <span className="text-xl font-bold">FS</span>
              </div>
              <span className="text-xl font-bold text-white">FoodShare</span>
            </div>
            <p className="text-green-100 mb-6">
              Connecting restaurants with excess food to volunteers who deliver it to those in need.
              Together, we can reduce food waste and fight hunger.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-green-100 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-green-100 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-green-100 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-100 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-green-100 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/register" className="text-green-100 hover:text-white transition-colors">Join As Restaurant</Link>
              </li>
              <li>
                <Link to="/register" className="text-green-100 hover:text-white transition-colors">Become a Volunteer</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-300 mt-0.5" />
                <span className="text-green-100">Namakkal, Tamil Nadu, 638 183</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-300" />
                <span className="text-green-100">+91 9876543210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-300" />
                <a href="mailto:info@foodshare.org" className="text-green-100 hover:text-white transition-colors">
                  info@foodshare.org
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-green-100 mb-4">
              Subscribe to our newsletter for updates on our mission and impact.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded bg-green-800 border border-green-700 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 transition-colors rounded text-white font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-6 border-t border-green-800 text-center text-green-300 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} FoodShare. All rights reserved.</p>
            <div className="flex space-x-4 mt-3 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
          <p className="mt-4 flex items-center justify-center">
            Made with <Heart className="w-4 h-4 text-red-400 mx-1" /> for a better world
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;