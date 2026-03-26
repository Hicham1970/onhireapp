import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Briefcase, Ship, ClipboardList, FileText, Camera, Ruler, Anchor, Layers, AlertTriangle, Users, BarChart3, Download, Smartphone, Globe, Award, Clock, Shield, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Careers = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const moroccanPorts = [
    { name: 'Casablanca', year: '1999', icon: '🏭' },
    { name: 'Tangier-Med', year: '2007', icon: '🌊' },
    { name: 'Agadir', year: '2000', icon: '⚓' },
    { name: 'Jorf Lasfar', year: '2002', icon: '🚢' },
    { name: 'Nador', year: '2005', icon: '📦' },
    { name: 'Safi', year: '1999', icon: '🛢️' },
    { name: 'Mohammedia', year: '2001', icon: '🏢' },
    { name: 'Dakhla', year: '2015', icon: '🏝️' }
  ];

  const inspectorActivities = [
    'On-Hire / Off-Hire Condition Surveys',
    'Draft Surveys & Bunker Surveys',
    'Cargo Hold Cleanliness Inspections',
    'Pre-Purchase Condition Surveys',
    'Ultrasonic Thickness Measurements (UTM)',
    'Hull & Machinery (H&M) Damage Surveys',
    'Protection & Indemnity (P&I) Surveys',
    'Container Condition & Lashing Surveys',
    'Heavy Lift & Project Cargo Supervision',
    'Port Captain / Towage Supervision',
    'Load Line & Stability Surveys',
    'Cargo Sampling & Weight Verification',
    'Damage Cargo & Shortage Surveys',
    'Marine Warranty Surveys (MWS)',
    'Ship to Ship Transfer (STS) Supervision',
    'Pre-Loading & Discharge Surveys',
    'Hold Bilge Sounding & Tightness Tests',
    'Weather Routing & Voyage Analysis',
    'ISM / ISPS / MLC Compliance Audits',
    'Incidental & General Average Surveys',
    'Refrigerated Cargo Pre-Loading Surveys',
    'Bulk Liquid Cargo Tank Inspections',
    'Vessel Vetting & SIRE Inspections',
    'Newbuilding Supervision & Trials',
    'Ship Recycling & Pre-Demolition Surveys'
  ];

  return (
    <div className={`${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} min-h-screen`}>
      <Helmet>
        <title>Careers - OnHireApp | Maritime Inspector Morocco</title>
        <meta name="description" content="Join Morocco's premier maritime inspector with 25+ years experience in all Moroccan ports since 1999." />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-800 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-blue-400/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-6 py-3 rounded-2xl mb-8">
            <MapPin className="w-6 h-6" />
            <span className="font-bold text-lg">Morocco's Maritime Expert | 25+ Years</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Morocco's Leading<br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">Marine Surveyor</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto opacity-95 leading-relaxed">
            Serving ALL Moroccan ports since 1999. 5,000+ surveys completed. Join the expert team trusted by shipowners worldwide.
          </p>
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <Link to="#timeline" className="group bg-white text-teal-700 px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 flex items-center gap-3">
              View Career Timeline <TrendingUp className="w-6 h-6 group-hover:translate-y-1" />
            </Link>
            <Link to="#services" className="border-2 border-white/30 hover:border-white text-white px-12 py-6 rounded-3xl font-bold text-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center gap-3">
              Our Services <ChevronRight className="w-6 h-6 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 rounded-full mb-8">
              <Calendar className="w-6 h-6" />
              <span className="font-bold text-2xl">25 Years Experience</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Career Timeline</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              From first draft survey in Casablanca 1999 to leading Morocco's largest marine surveying firm
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-blue-500" />
            <div className="space-y-12">
              {[
                { year: '1999', port: 'Casablanca', event: 'Started career as junior surveyor. First draft survey on bulk carrier.', icon: '🚢' },
                { year: '2001', port: 'Mohammedia', event: 'Promoted to lead surveyor. Specialized in chemical tankers.', icon: '🛢️' },
                { year: '2005', port: 'Nador', event: 'Opened North Morocco office. Container inspections expert.', icon: '📦' },
                { year: '2007', port: 'Tangier-Med', event: 'New mega-port launch. Heavy lift project cargo specialist.', icon: '🚛' },
                { year: '2010', port: 'Agadir', event: 'South Morocco expansion. Fishing vessel surveys leader.', icon: '🎣' },
                { year: '2015', port: 'Dakhla', event: 'West Africa gateway. Offshore wind farm surveys pioneer.', icon: '🌬️' },
                { year: '2020', port: 'All Ports', event: 'Digital transformation. OnHireApp launched - paperless surveys.', icon: '💻' },
                { year: '2024', port: 'Morocco Leader', event: '5,000+ surveys. Largest independent marine surveyor in Morocco.', icon: '🏆' }
              ].map((milestone, index) => (
                <div key={index} className="flex items-start space-x-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white dark:border-slate-800 mt-1">
                    <span className="text-2xl">{milestone.icon}</span>
                  </div>
                  <div className="flex-1 max-w-2xl">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-3xl font-black text-teal-600 dark:text-teal-400">{milestone.year}</span>
                      <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">{milestone.port}</span>
                    </div>
                    <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ports Map */}
      <section className="py-32 bg-slate-900/5 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6">All Moroccan Ports Covered</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Rapid response in 24h anywhere in Morocco
            </p>
          </div>
          <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-6">
            {moroccanPorts.map((port, index) => (
              <div key={index} className="group bg-white dark:bg-slate-800 rounded-2xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-700 h-32 flex flex-col items-center justify-center">
                <div className="text-3xl mb-3">{port.icon}</div>
                <h4 className="font-bold text-lg">{port.name}</h4>
                <span className="text-sm text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{port.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 rounded-full mb-8 shadow-lg">
              <ClipboardList className="w-6 h-6" />
              <span className="font-bold text-2xl">50+ Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Complete Marine Survey Services</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Every type of marine survey since 1999. Approved by all major P&I clubs and charterers.
            </p>
          </div>

          <div className="max-h-96 overflow-y-auto rounded-3xl bg-slate-900/5 dark:bg-slate-900/20 p-8 border border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {inspectorActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition-all group">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="font-bold text-white text-xs">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <span className="font-medium group-hover:translate-x-2 transition-transform">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-t from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl px-8 py-4 rounded-3xl mb-12">
            <Shield className="w-8 h-8" />
            <span className="font-bold text-2xl">Approved by all Major P&I Clubs</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            Join the <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Moroccan</span><br />
            Marine Survey Leader
          </h2>
          <p className="text-2xl opacity-90 mb-12 leading-relaxed max-w-2xl mx-auto">
            25 years experience • All ports covered • 5,000+ surveys • Digital platform
          </p>
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <Link to="/register" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-12 py-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 flex items-center gap-4">
              Start Your Career <Zap className="w-8 h-8" />
            </Link>
            <Link to="/about" className="border-4 border-white/30 hover:border-white text-white px-12 py-8 rounded-3xl font-bold text-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;

