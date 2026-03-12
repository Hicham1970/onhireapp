import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAlert, useUser } from "../hooks/Hooks";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Ship, Menu, X, Shield, Home, User, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { dispatchAlert } = useAlert();
  const { user, dispatchUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userData, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
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

  // Get user display name
  const userName = userData?.username || currentUser?.displayName || "Utilisateur";

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg" 
        : "bg-white/80 dark:bg-transparent"
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
                {/* Home Link */}
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium text-sm px-4 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  title="Tableau de bord"
                >
                  <Home className="w-5 h-5" />
                </Link>

                {/* Admin Link - Only for admins */}
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="flex items-center justify-center gap-2 bg-purple-600 text-white font-medium text-sm px-4 py-2 rounded-full hover:bg-purple-700 transition-colors shadow-sm"
                    title="Admin Dashboard"
                  >
                    <Shield className="w-4 h-4" />
                    <span className="hidden md:inline">Admin</span>
                  </Link>
                )}

                {/* User Profile */}
                <Link
                  to="/users"
                  className="flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium text-sm px-4 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  title="Profil"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white font-medium text-sm px-4 py-2 rounded-full hover:bg-red-700 transition-colors shadow-sm"
                  title="Déconnexion"
                >
                  <span className="hidden md:inline">Déconnexion</span>
                  <span className="md:hidden">Exit</span>
                </button>
              </>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={() => {
                console.log('Theme toggle clicked! Current theme:', theme);
                toggleTheme();
              }}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

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

        {/* Mobile Menu - Home Page */}
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

        {/* Mobile Menu - Logged In User */}
        {currentUser && isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col gap-3">
              <div className="px-4 py-2 text-sm text-slate-500">
                Connecté: <span className="font-semibold text-slate-900 dark:text-white">{userName}</span>
              </div>
              
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
              >
                <Home className="w-5 h-5" />
                Tableau de bord
              </Link>

              {isAdmin() && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg"
                >
                  <Shield className="w-5 h-5" />
                  Admin Dashboard
                </Link>
              )}

              <Link
                to="/users"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
              >
                <User className="w-5 h-5" />
                Profil
              </Link>

              {/* Theme Toggle in Mobile Menu */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{theme === 'dark' ? 'Mode clair' : 'Mode sombre'}</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg mx-4 mb-2"
              >
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

