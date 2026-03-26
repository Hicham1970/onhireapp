import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Ship, Users, Briefcase, MapPin, Phone, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900' } min-h-screen`}>
      <Helmet>
        <title>About - OnHireApp</title>
        <meta name="description" content="Discover OnHireApp, the SaaS platform for maritime surveys." />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-blue-200">OnHireApp</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            The reference in digital maritime expertise
          </p>
          <Link to="/" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 inline-block">
            Discover our services
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our mission</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Simplifying on-hire/off-hire surveys with intuitive, accurate and internationally compliant software.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-blue-50 dark:bg-slate-800">
              <Ship className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Maritime Expertise</h3>
              <p>25+ years of experience in naval inspections and draft calculations.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-green-50 dark:bg-slate-800">
              <Users className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Satisfied Clients</h3>
              <p>Over 500 vessels inspected with 100% client satisfaction.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-purple-50 dark:bg-slate-800">
              <Briefcase className="w-16 h-16 text-purple-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p>Built-in AI for predictive analysis and automatic report generation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white">
                HG
              </div>
              <h3 className="text-2xl font-bold mb-2">H. Garroum</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">Founder & Maritime Expert</p>
              <p className="text-sm text-slate-500">25 years experience in on-hire surveys</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to simplify your surveys?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center">
              <MapPin className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="font-bold mb-2">Marseille, France</h4>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-12 h-12 text-green-600 mb-4" />
              <h4 className="font-bold mb-2">+33 1 23 45 67 89</h4>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-12 h-12 text-purple-600 mb-4" />
              <h4 className="font-bold mb-2">contact@onhireapp.com</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

