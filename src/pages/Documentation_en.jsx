import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen, Code, FileText, PlayCircle, Download, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Documentation = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} min-h-screen`}>
      <Helmet>
        <title>Documentation - OnHireApp</title>
        <meta name="description" content="Complete OnHireApp Guide - Draft surveys, reports, calculations" />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid-slate-900/10 [mask-image:linear-gradient(to-bottom,transparent_20%,white)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Documentation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Complete <span className="text-blue-200">OnHireApp</span> Guide
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Everything you need to know to master your maritime survey platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Link to="#guides" className="group bg-white text-indigo-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Get Started <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="#video" className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="guides" className={`py-24 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get started in 3 minutes</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From signup to your first report, everything explained step by step
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="group bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-slate-200 dark:border-slate-700">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Create survey</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">New draft survey in 30 seconds. Specifications, initial readings, automatic calculations.</p>
              <Link to="/docs/survey-creation" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-2">
                Read guide <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="group bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-slate-200 dark:border-slate-700">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Download className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">PDF Reports</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">Automatic IACS-compliant generation. Export in 1 click.</p>
              <Link to="/docs/pdf-reports" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-2">
                Read guide <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="group bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-slate-200 dark:border-slate-700">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PlayCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Video tutorials</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">5 step-by-step videos (5-10min each) to master the platform.</p>
              <Link to="/videos" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-2">
                Watch videos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link to="/docs/full-guide" className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-[length:200%_200%] hover:bg-[position:100%_0] bg-right text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 inline-block">
              Full Guide (PDF 48p)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;

