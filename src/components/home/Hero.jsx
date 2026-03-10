import React from "react";
import { Link } from "react-router-dom";
import { Ship, ArrowRight, Play, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated waves */}
        <div className="absolute bottom-0 left-0 w-full h-64 md:h-96 opacity-20">
          <svg className="absolute bottom-0 w-full animate-pulse" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#3b82f6" fillOpacity="0.3" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Nouveau: Essai gratuit de 14 jours
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            La plateforme SaaS pour
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              les expertises maritimes
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-blue-100/80 max-w-3xl mx-auto mb-10 leading-relaxed">
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
            <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              <Play className="w-5 h-5" />
              <span>Voir la démo</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-blue-200/60">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Sans carte de crédit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Support 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Équipe disponible</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 relative">
          <div className="relative mx-auto max-w-5xl">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-3xl blur-2xl"></div>
            
            {/* Dashboard mockup */}
            <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/50 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-sm text-blue-300">OnHireApp Dashboard</div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mock cards */}
                <div className="bg-slate-700/50 rounded-xl p-4 h-32 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <Ship className="w-8 h-8 text-blue-400" />
                    <span className="text-2xl font-bold text-white">12</span>
                  </div>
                  <div className="text-blue-200/70 text-sm">Navires actifs</div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-4 h-32 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-2xl font-bold text-white">48</span>
                  </div>
                  <div className="text-blue-200/70 text-sm">Expertises ce mois</div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-4 h-32 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-2xl font-bold text-white">+24%</span>
                  </div>
                  <div className="text-blue-200/70 text-sm">Croissance mensuelle</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

