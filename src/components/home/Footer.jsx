import React from "react";
import { Link } from "react-router-dom";
import { Ship, Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: {
      title: "Produit",
      links: [
        { label: "Fonctionnalités", href: "#features" },
        { label: "Tarification", href: "#pricing" },
        { label: "Demo", href: "#" },
        { label: "Mises à jour", href: "#" }
      ]
    },
    company: {
      title: "Entreprise",
      links: [
        { label: "À propos", href: "#" },
        { label: "Carrières", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Presse", href: "#" }
      ]
    },
    resources: {
      title: "Ressources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Centre d'aide", href: "#" },
        { label: "API", href: "#" },
        { label: "Statut", href: "#" }
      ]
    },
    legal: {
      title: "Légal",
      links: [
        { label: "Confidentialité", href: "#" },
        { label: "Conditions", href: "#" },
        { label: "CGU", href: "#" },
        { label: "Cookies", href: "#" }
      ]
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <Ship className="w-8 h-8 text-blue-400" />
              <span>OnHireApp</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              La plateforme SaaS nouvelle génération pour les expertises maritimes. 
              Simplifiez vos opérations et gagnez en efficacité.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>contact@onhireapp.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Marseille, France</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.values(footerLinks).map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
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
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-slate-400 text-sm">
              © {currentYear} OnHireApp. Tous droits réservés.
              <span className="mx-2">·</span>
              <span>Créé par H. Garroum</span>
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors"
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

