import React, { useState } from 'react';
import { LayoutDashboard, ClipboardList, Bot, Ship, LogOut, Camera, Sun, Moon, Settings, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useUser } from '../hooks/Hooks';
import { useTheme } from '../context/ThemeContext';
import { Analytics } from "@vercel/analytics/react";


export const Layout = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'surveys', label: 'Surveys', icon: ClipboardList },
    { id: 'ai', label: 'AI Consultant', icon: Bot },
    { id: 'vessels', label: 'Vessels', icon: Ship },
    { id: 'pictures', label: 'Pictures Report', icon: Camera },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const navigate = useNavigate();
  const { dispatchUser } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    try {
      await signOut(auth);
      dispatchUser({ type: "LOG_OUT" });
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Analytics />
      {/* Sidebar */}
      <aside className="w-64 bg-maritime-900 dark:bg-slate-950 text-white fixed top-16 h-[calc(100vh-4rem)] z-20 flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <Link to="/" className="text-xl font-bold flex items-center gap-2 tracking-tight">
            <Ship className="text-blue-400" />
            OnHire
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-maritime-600 to-maritime-500 text-white shadow-lg shadow-maritime-900/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-slate-800/50 mb-2"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button onClick={handleLogoutClick} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-slate-800">
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 mt-16">
        {children}
      </main>

      {/* Custom Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-2xl max-w-sm w-full mx-4 border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Confirmer la déconnexion</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Êtes-vous sûr de vouloir quitter l'application ?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-200"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};