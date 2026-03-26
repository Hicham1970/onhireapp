import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ship, FileText, Users, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Blog = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const posts = [
    {
      id: 1,
      title: "25 Years of Marine Surveys in Morocco: Casablanca Port Evolution",
      excerpt: "From first draft survey in 1999 to modern digital platform - how Casablanca shaped Morocco's maritime expertise.",
      date: "Jan 15, 2024",
      readTime: "8 min",
      image: "casablanca-port.jpg",
      port: "Casablanca"
    },
    {
      id: 2,
      title: "Tangier-Med: Africa's Busiest Port - Heavy Lift Survey Lessons",
      excerpt: "Project cargo challenges and solutions at Morocco's mega-hub since 2007 opening.",
      date: "Dec 28, 2023",
      readTime: "12 min",
      image: "tangier-med.jpg",
      port: "Tangier-Med"
    },
    {
      id: 3,
      title: "Draft Survey Masterclass: Moroccan Practice Since 1999",
      excerpt: "Step-by-step draft survey methodology refined over 5,000 inspections across all Moroccan ports.",
      date: "Nov 20, 2023",
      readTime: "15 min",
      image: "draft-survey.jpg",
      port: "All Ports"
    },
    {
      id: 4,
      title: "Agadir Fishing Fleet: 25 Years Condition Surveys",
      excerpt: "Safety inspections evolution for Morocco's southern fishing powerhouse.",
      date: "Oct 10, 2023",
      readTime: "10 min",
      image: "agadir-fishing.jpg",
      port: "Agadir"
    },
    {
      id: 5,
      title: "Jorf Lasfar Bulk Terminal: Cargo Hold Inspection Guide",
      excerpt: "Best practices for phosphate and bulk carrier hold cleanliness surveys.",
      date: "Sep 05, 2023",
      readTime: "9 min",
      image: "jorf-lasfar.jpg",
      port: "Jorf Lasfar"
    },
    {
      id: 6,
      title: "Digital Transformation: Paperless Surveys Morocco 2020+",
      excerpt: "From manual logs to OnHireApp - revolutionizing marine surveys.",
      date: "Aug 22, 2023",
      readTime: "11 min",
      image: "digital-survey.jpg",
      port: "All Ports"
    }
  ];

  return (
    <div className={`${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} min-h-screen`}>
      <Helmet>
        <title>Blog - OnHireApp Morocco Maritime Experts</title>
        <meta name="description" content="25+ years marine survey insights from all Moroccan ports. Draft surveys, inspections, industry news." />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white py-32 relative">
        <div className="absolute inset-0 bg-grid bg-grid-slate-900/20 [grid-size:60px]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-blue-900/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              Maritime Insights
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-90 leading-relaxed">
              25 years surveying Morocco's ports. Draft surveys, inspections, port news from the expert who lived it.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg font-medium">
              <span className="bg-white/10 backdrop-blur px-6 py-3 rounded-full">Casablanca</span>
              <span className="bg-white/10 backdrop-blur px-6 py-3 rounded-full">Tangier-Med</span>
              <span className="bg-white/10 backdrop-blur px-6 py-3 rounded-full">Draft Surveys</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 mb-6">
                <Calendar className="w-4 h-4" />
                <span>Jan 15, 2024 • 8 min read</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                25 Years Casablanca Port: 
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Evolution</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                First draft survey 1999 on rusty bulk carrier. Today digital OnHireApp platform serving 100+ clients. How Morocco's busiest port transformed marine surveying.
              </p>
              <Link to="/blog/casablanca-25-years" className="inline-flex items-center gap-3 font-bold text-2xl hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Read Full Story →
              </Link>
            </div>
            <div className="relative group">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden">
                <img src="casablanca-port-hero.jpg" alt="Casablanca Port 1999 vs Today" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 left-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 w-80">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-lg">Casablanca Port</span>
                </div>
                <div className="flex items-center gap-4 text-sm opacity-80">
                  <span><Ship className="w-4 h-4 inline" /> 25+ years</span>
                  <span><FileText className="w-4 h-4 inline" /> Draft surveys</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h3 className="text-3xl md:text-4xl font-black mb-6">Recent Articles</h3>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Practical insights from 25 years surveying Morocco's ports
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <article key={post.id} className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-3 duration-500 border border-slate-200 dark:border-slate-700">
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-flex items-center gap-2 bg-emerald-500/90 text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm">
                      <MapPin className="w-4 h-4" />
                      {post.port}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span><Calendar className="w-4 h-4 inline" /> {post.date}</span>
                    <span>• {post.readTime} read</span>
                  </div>
                  <h4 className="text-2xl font-black mb-4 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-3 font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-lg transition-colors">
                    Read Article <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Stay Updated</h2>
          <p className="text-2xl opacity-90 mb-12">Morocco maritime news, survey tips, port updates from 25 years experience</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link to="/careers" className="bg-white text-emerald-700 px-12 py-6 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Join Our Team
            </Link>
            <Link to="/about" className="border-2 border-white hover:border-emerald-200 text-white px-12 py-6 rounded-3xl font-bold text-xl hover:bg-white/10 transition-all">
              About Morocco's Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

