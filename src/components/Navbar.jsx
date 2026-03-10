import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAlert, useUser } from "../hooks/Hooks";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Ship, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { dispatchAlert } = useAlert();
  const { user, dispatchUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatchUser({ type: "LOG_OUT" });
      dispatchAlert({
        type: "SHOW",
        payload: "Déconnexion réussie",
        variant: "Success",
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
  };

  // Navigation links for home page
  const navLinks = [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Témoignages", href: "#testimonials" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to={currentUser ? "/dashboard" : "/"} 
            className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white hover:opacity-80 transition-opacity"
          >
            <Ship className="w-8 h-8 text-blue-600" />
            <span>OnHireApp</span>
          </Link>

          {/* Desktop Navigation */}
          {!currentUser && location.pathname === "/" && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Desktop Actions */}
          <div className="flex items-center gap-3">
            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  className="hidden md:flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium text-sm px-5 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center bg-blue-600 text-white font-medium text-sm px-5 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                >
                  Essai gratuit
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/users"
                  className="flex items-center justify-center bg-blue-600 text-white font-medium text-sm px-5 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white font-medium text-sm px-5 py-2 rounded-full hover:bg-red-700 transition-colors shadow-sm"
                >
                  Déconnexion
                </button>
              </>
            )}

            {/* Mobile Menu Button */}
            {!currentUser && location.pathname === "/" && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {!currentUser && location.pathname === "/" && isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-3 text-slate-600 dark:text-slate-300 font-medium hover:text-blue-600"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center bg-blue-600 text-white font-medium py-3 rounded-full hover:bg-blue-700"
                >
                  Essai gratuit
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

