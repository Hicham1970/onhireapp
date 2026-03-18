import React from "react";
import { Link } from "react-router-dom";
import { Ship, ArrowRight, Play, CheckCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
        : 'bg-gradient-to-br from-blue-50 via-white to-slate-100'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Simplified waves - reduced complexity */}
        <div className="absolute bottom-0 left-0 w-full h-48 md:h-64 opacity-15">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#3b82f6" fillOpacity="0.25" d="M0,160L48,170C96,180,192,200,288,210C384,220,480,220,576,210C672,200,768,180,864,170C960,160,1056,160,1152,170C1248,180,1344,200,1392,220L1440,240L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        {/* Optimized floating elements - smaller, no pulse */}
        <div className="absolute top-24 left-8 w-48 h-48 bg-blue-400/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-24 right-8 w-64 h-64 bg-cyan-400/15 rounded-full blur-xl"></div>
        
        {/* Lighter grid - reduced opacity */}
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAxMDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMSI8L2NpcmNsZT48L2c+PC9nPjwvc3ZnPg==')] ${isDark ? 'opacity-20' : 'opacity-10'}`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in ${
            isDark 
              ? 'bg-blue-500/20 border border-blue-400/30 text-blue-300'
              : 'bg-blue-100 border border-blue-200 text-blue-700'
          }`}>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Nouveau: Essai gratuit de 14 jours
          </div>

          {/* Main Title */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            La plateforme SaaS pour
            <span className={`block mt-2 bg-clip-text text-transparent ${
              isDark
                ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400'
                : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500'
            }`}>
              les expertises maritimes
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed ${
            isDark ? 'text-blue-100/80' : 'text-slate-600'
          }`}>
            Gérez vos expertises OnHire, OffHire et Bunker, créez des rapports d'inspection 
            professionnels et calculez vos besoins en carburant avec précision. Tout ce dont 
            vous avez besoin en un seul endroit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/register"
              className="group relative inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className={`inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 font-semibold text-lg transition-all duration-300 ${
              isDark 
                ? 'border-white/30 text-white hover:bg-white/10'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}>
              <Play className="w-5 h-5" />
              <span>Voir la démo</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className={`flex flex-wrap items-center justify-center gap-8 ${
            isDark ? 'text-blue-200/60' : 'text-slate-500'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Sans carte de crédit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Support 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Équipe disponible</span>
            </div>
          </div>
        </div>


            {/* Glow effect */}
            <div className={`absolute -inset-4 bg-gradient-to-r rounded-3xl blur-2xl ${
              isDark 
                ? 'from-blue-500/30 to-cyan-500/30'
                : 'from-blue-200/50 to-cyan-200/50'
            }`}></div>
            
            {/* Dashboard mockup */}
            <div className={`relative rounded-2xl shadow-2xl overflow-hidden ${
              isDark 
                ? 'bg-slate-800/80 backdrop-blur-xl border border-white/10'
                : 'bg-white/80 backdrop-blur-xl border border-slate-200'
            }`}>
              <div className={`flex items-center gap-2 px-4 py-3 ${
                isDark ? 'bg-slate-900/50 border-b border-white/10' : 'bg-slate-100/50 border-b border-slate-200'
              }`}>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className={`ml-4 text-sm ${
                  isDark ? 'text-blue-300' : 'text-slate-600'
                }`}>OnHireApp Dashboard</div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mock cards */}
                <div className={`rounded-xl p-4 h-32 flex flex-col justify-between ${
                  isDark ? 'bg-slate-700/50' : 'bg-slate-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <Ship className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>12</span>
                  </div>
                  <div className={`text-sm ${isDark ? 'text-blue-200/70' : 'text-slate-500'}`}>Navires actifs</div>
                </div>
                <div className={`rounded-xl p-4 h-32 flex flex-col justify-between ${
                  isDark ? 'bg-slate-700/50' : 'bg-slate-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <svg className={`w-8 h-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>48</span>
                  </div>
                  <div className={`text-sm ${isDark ? 'text-blue-200/70' : 'text-slate-500'}`}>Expertises ce mois</div>
                </div>
                <div className={`rounded-xl p-4 h-32 flex flex-col justify-between ${
                  isDark ? 'bg-slate-700/50' : 'bg-slate-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <svg className={`w-8 h-8 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>+24%</span>
                  </div>
                  <div className={`text-sm ${isDark ? 'text-blue-200/70' : 'text-slate-500'}`}>Croissance mensuelle</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center pt-2 ${
          isDark ? 'border-white/30' : 'border-slate-300'
        }`}>
          <div className={`w-1 h-3 rounded-full animate-pulse ${
            isDark ? 'bg-white/50' : 'bg-slate-400'
          }`}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

