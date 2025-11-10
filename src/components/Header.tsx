import { Stethoscope, Menu, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2">
            <Stethoscope className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">BookMyDoctor</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Find Doctors
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Specialties
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              For Doctors
            </a>
            <Link to="/help" className="text-gray-700 hover:text-blue-600 transition-colors">
              Help
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/signin"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Find Doctors
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Specialties
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                For Doctors
              </a>
              <button
                onClick={() => { navigate('/help'); setIsMenuOpen(false); }}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                Help
              </button>
              <Link
                to="/signin"
                onClick={() => setIsMenuOpen(false)}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-left inline-block"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
