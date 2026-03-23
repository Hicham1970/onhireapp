import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, CheckCircle, Ship } from "lucide-react";
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
        {/* Simplified waves */}
        <div className="absolute bottom-0 left-0 w-full h-48 md:h-64 opacity-15">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#3b82f6" fillOpacity="0.25" d="M0,160L48,170C96,180,192,200,288,210C384,220,480,220,576,210C672,200,768,180,864,170C960,160,1056,160,1152,170C1248,180,1344,200,1392,220L1440,240L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-24 left-8 w-48 h-48 bg-blue-400/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-24 right-8 w-64 h-64 bg-cyan-400/15 rounded-full blur-xl"></div>
        
        {/* Grid */}
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAxMDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMSI8L2NpcmNsZT48L2c+PC9nPjwvc3ZnPg==')] ${isDark ? 'opacity-20' : 'opacity-10'}`}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
        <div className="grid lg:grid-cols-12 items-center gap-12">
          {/* Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in ${
              isDark 
                ? 'bg-blue-500/20 border border-blue-400/30 text-blue-300'
                : 'bg-blue-100 border border-blue-200 text-blue-700'
            }`}>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Nouveau: Essai gratuit de 14 jours
            </div>

            {/* Title */}
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
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto lg:mx-0 mb-10 leading-relaxed ${
              isDark ? 'text-blue-100/80' : 'text-slate-600'
            }`}>
              Gérez vos expertises OnHire, OffHire, Draft Surveys et Bunker Survey, créez des rapports d'inspection 
              professionnels et calculez vos quantitées de carburant avec précision. Tout ce dont 
              vous avez besoin en un seul endroit.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 items-center lg:justify-start justify-center">
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

            {/* Badges */}
            <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-8 ${
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

          {/* Right Demo */}
          <div className="lg:col-span-5 order-1 lg:order-2 justify-self-end">
            <div className="relative">
              {/* Glow */}
              <div className={`absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-emerald-500/30 dark:from-blue-500/30 dark:to-cyan-500/30 rounded-3xl blur-xl animate-pulse`}></div>
              
              {/* Mock Dashboard */}
              <div className={`relative rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl ${
                isDark 
                  ? 'bg-slate-800/80 border border-white/10'
                  : 'bg-white/80 border border-slate-200/50'
              }`}>
                <div className={`flex items-center gap-2 px-6 py-4 border-b ${
                  isDark ? 'bg-slate-900/50 border-white/10' : 'bg-slate-100/50 border-slate-200'
                }`}>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className={`ml-auto text-sm font-medium ${
                    isDark ? 'text-blue-300' : 'text-slate-700'
                  }`}>
                    OnHireApp Dashboard
                  </div>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className={`group rounded-2xl p-6 h-28 flex flex-col justify-between transition-all cursor-default hover:scale-[1.02] ${
                    isDark ? 'bg-slate-700/60 hover:bg-slate-700/80' : 'bg-slate-50/80 hover:bg-slate-100'
                  }`}>
                    <div className="flex items-center justify-between">
                      <Ship className={`w-10 h-10 p-2 rounded-xl bg-blue-500/20 group-hover:bg-blue-500/30 transition-all ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                      <span className={`text-2xl font-black ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>12</span>
                    </div>
                    <p className={`text-xs font-medium uppercase tracking-wide ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>Navires actifs</p>
                  </div>

                  {/* Card 2 */}
                  <div className={`group rounded-2xl p-6 h-28 flex flex-col justify-between transition-all cursor-default hover:scale-[1.02] ${
                    isDark ? 'bg-slate-700/60 hover:bg-slate-700/80' : 'bg-slate-50/80 hover:bg-slate-100'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 p-2 rounded-xl bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-all flex items-center justify-center ${
                        isDark ? 'text-emerald-400' : 'text-emerald-600'
                      }`}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className={`text-2xl font-black ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>48</span>
                    </div>
                    <p className={`text-xs font-medium uppercase tracking-wide ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>Expertises ce mois</p>
                  </div>

                  {/* Card 3 */}
                  <div className={`group rounded-2xl p-6 h-28 flex flex-col justify-between transition-all cursor-default hover:scale-[1.02] ${
                    isDark ? 'bg-slate-700/60 hover:bg-slate-700/80' : 'bg-slate-50/80 hover:bg-slate-100'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 p-2 rounded-xl bg-amber-500/20 group-hover:bg-amber-500/30 transition-all flex items-center justify-center ${
                        isDark ? 'text-amber-400' : 'text-amber-600'
                      }`}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <span className={`text-2xl font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>+24%</span>
                    </div>
                    <p className={`text-xs font-medium uppercase tracking-wide ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>Croissance mensuelle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-75">
        <div className={`w-6 h-10 border-2 rounded-full flex items-start justify-center pt-2 mx-auto ${
          isDark ? 'border-white/30' : 'border-slate-300'
        }`}>
          <div className={`w-px h-3 rounded-full bg-gradient-to-b from-transparent via-white/50 to-transparent animate-[pulse_2s_ease-in-out_infinite] ${
            !isDark && 'via-slate-400'
          }`}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

