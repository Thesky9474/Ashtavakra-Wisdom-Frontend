import React, { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-cream/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          
          <img src="/om.png" alt="Ashtavakra Logo" className="h-8 w-8" />
          <a href="/">
          <span className="text-xl font-bold text-charcoal font-lora">
            Ashtavakra Gita
          </span>
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-saffron">Home</Link>
          <Link to="/chatbot" className="hover:text-saffron">Chatbot</Link>
          <Link to="/newsletter" className="hover:text-saffron">Newsletter</Link>
          <Link to="/about" className="hover:text-saffron">About</Link>
          {!user ? (
            <>
              <Link to="/login" className="hover:text-saffron">Login</Link>
              <Link to="/register" className="hover:text-saffron">Register</Link>
            </>
          ) : (
            <>
              <span className="text-charcoal">{user.name}</span>
              <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3 text-sm font-medium">
          <Link to="/" className="block text-gray-700 hover:text-saffron" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/chatbot" className="block text-gray-700 hover:text-saffron" onClick={() => setMenuOpen(false)}>Chatbot</Link>
          <Link to="/newsletter" className="block text-gray-700 hover:text-saffron" onClick={() => setMenuOpen(false)}>Newsletter</Link>
          <Link to="/about" className="block text-gray-700 hover:text-saffron" onClick={() => setMenuOpen(false)}>About</Link>
          {!user ? (
            <>
              <Link to="/login" className="block text-gray-700 hover:text-saffron" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="block text-gray-700 hover:text-saffron" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          ) : (
            <>
              <span className="block text-charcoal">{user.name}</span>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block text-red-600 hover:underline">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
