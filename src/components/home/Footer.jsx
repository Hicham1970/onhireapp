import React from "react";
import { Link } from "react-router-dom";
import { Ship, Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { footerLinks } from "../../data/footerLinks";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${isDark ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}`}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className={`flex items-center gap-2 text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Ship className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <span>OnHireApp</span>
            </Link>
            <p className={`mb-6 max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              La plateforme SaaS nouvelle génération pour les expertises maritimes. 
              Simplifiez vos opérations et gagnez en efficacité.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className={`flex items-center gap-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <Mail className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <span>contact@onhireapp.com</span>
              </div>
              <div className={`flex items-center gap-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <Phone className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className={`flex items-center gap-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <MapPin className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <span>Marseille, France</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.values(footerLinks).map((section, index) => (
            <div key={index}>
              <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className={`hover:text-blue-500 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              © {currentYear} Marinesurveydev. Tous droits réservés.
              <span className="mx-2">·</span>
              <span>Créé par H. Garroum</span>
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isDark 
                    ? 'bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white'
                    : 'bg-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isDark 
                    ? 'bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white'
                    : 'bg-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white'
                }`}
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isDark 
                    ? 'bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white'
                    : 'bg-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white'
                }`}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

