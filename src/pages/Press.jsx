import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, MapPin, Users, Award, Download, ChevronRight, Ship } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Press = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const pressReleases = [
    {
      date: "March 15, 2024",
      title: "OnHireApp Named Morocco's Top Marine Survey Tech Platform",
      description: "Awarded for digital transformation in maritime inspections by Port of Casablanca Association.",
      type: "Award",
      link: "#"
    },
    {
      date: "January 28, 2024",
      title: "25 Years Survey Milestone: 5,000+ Inspections All Moroccan Ports",
      description: "Casablanca - Leading inspector celebrates quarter century serving Tangier-Med to Dakhla.",
      type: "Milestone",
      link: "#"
    },
    {
      date: "November 10, 2023",
      title: "Tangier-Med Port Authority Partners with OnHireApp for Digital Surveys",
      description: "Mega-port adopts paperless draft survey platform for all container terminals.",
      type: "Partnership",
      link: "#"
    },
    {
      date: "August 22, 2023",
      title: "Moroccan Shipping Gazette: Interview with 25-Year Veteran Surveyor",
      description: "Exclusive on career spanning Casablanca 1999 to modern digital inspections.",
      type: "Interview",
      link: "#"
    },
    {
      date: "June 05, 2023",
      title: "Jorf Lasfar Bulk Terminal Contract: 200+ Annual Phosphate Surveys",
      description: "Multi-year agreement for continuous bulk cargo condition surveys.",
      type: "Contract",
      link: "#"
    },
    {
      date: "April 18, 2023",
      title: "Agadir Fishing Fleet Safety Program Launched",
      description: "500+ vessel inspections improving southern Morocco fishing industry safety.",
      type: "Initiative",
      link: "#"
    }
  ];

  return (
    <div className={`${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} min-h-screen`}>
      <Helmet>
        <title>Press - OnHireApp Morocco Marine Experts</title>
        <meta name="description" content="Press releases, awards, partnerships. Morocco's leading marine surveyor 25+ years all ports." />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl mb-12">
            <Newspaper className="w-8 h-8" />
            <span className="font-bold text-2xl">Media Center</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Press & <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Media</span>
          </h1>
          <p className="text-2xl md:text-3xl opacity-90 mb-12 max-w-4xl mx-auto leading-relaxed">
            25 years headlines from Morocco's ports. Leading marine surveyor in national & international press.
          </p>
        </div>
      </section>

      {/* Latest Release */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="p-12 lg:p-20 text-center bg-gradient-to-r from-emerald-500/5 to-teal-500/5">
              <div className="inline-flex items-center gap-3 bg-emerald-500 text-white px-6 py-3 rounded-2xl mb-8 font-bold">
                <Award className="w-6 h-6" />
                Latest Award
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Morocco's Top Marine <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Survey Tech</span>
              </h2>
              <p className="text-xl opacity-90 mb-12 max-w-3xl mx-auto">
                Port of Casablanca Association recognizes OnHireApp for digital transformation in marine inspections. March 2024.
              </p>
              <Link href="#" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-12 py-6 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                Press Release <Download className="w-6 h-6 inline ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-4xl font-black mb-6">Press Releases</h3>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Official news from Morocco's leading marine surveyor
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressReleases.map((release) => (
              <div key={release.date} className="group bg-white dark:bg-slate-800 rounded-3xl p-10 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-slate-200 dark:border-slate-700 cursor-pointer">
                <div className="flex items-center gap-3 text-emerald-600 mb-6">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center">
                    <Newspaper className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-bold text-lg block">{release.type}</span>
                    <span className="text-sm opacity-75">{release.date}</span>
                  </div>
                </div>
                <h4 className="text-2xl font-black mb-6 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {release.title}
                </h4>
                <p className="text-lg opacity-80 mb-8 leading-relaxed line-clamp-3">
                  {release.description}
                </p>
                <Link to={release.link} className="inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group-hover:translate-x-2 transition-all">
                  Read Full Release <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Mentions */}
      <section className="py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h3 className="text-3xl md:text-4xl font-black mb-6">Media Coverage</h3>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Featured in Morocco's leading maritime publications
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { logo: "moroccan-shipping-gazette", title: "Exclusive Interview", date: "Aug 2023" },
              { logo: "port-casablanca-magazine", title: "Digital Survey Pioneer", date: "Mar 2024" },
              { logo: "tangier-med-news", title: "Heavy Lift Expert", date: "Nov 2023" },
              { logo: "maroc-maritime-review", title: "25 Years Milestone", date: "Jan 2024" },
              { logo: "afrique-shipping", title: "West Africa Expansion", date: "Jun 2023" }
            ].map((mention, index) => (
              <div key={index} className="group bg-white dark:bg-slate-800 rounded-2xl p-10 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-700 h-64 flex flex-col justify-center">
                <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
                  <img src={mention.logo + '.svg'} alt={mention.title} className="w-16 h-16" />
                </div>
                <h4 className="font-bold text-xl mb-4">{mention.title}</h4>
                <span className="text-lg opacity-75">{mention.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Press */}
      <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-black mb-8">Media Inquiries</h3>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
            Interviews, expert quotes, port stories from 25 years Morocco experience
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur p-8 rounded-3xl">
              <Users className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
              <h4 className="font-bold text-2xl mb-4">Expert Interviews</h4>
              <p>25 years Morocco ports experience</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-8 rounded-3xl">
              <Ship className="w-16 h-16 text-teal-400 mx-auto mb-6" />
              <h4 className="font-bold text-2xl mb-4">Port Stories</h4>
              <p>Casablanca to Dakhla insights</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-8 rounded-3xl">
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h4 className="font-bold text-2xl mb-4">Awards Coverage</h4>
              <p>Recent industry recognition</p>
            </div>
          </div>
          <Link to="mailto:press@onhireapp.com" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-16 py-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500">
            Contact Press Team
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Press;

