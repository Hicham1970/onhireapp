import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  getUsers, updateUser, deleteUser,
  getAllSurveys, getAllReports, deleteSurvey, deleteFullReport,
  getContactMessages, deleteContactMessage
} from "../api/api";
import {  
  Users, Package, FileText, BarChart3, Settings, Search, Ship,
  Edit3, Trash2, Shield, TrendingUp, DollarSign, Eye, Loader2,
  Menu, X, Mail
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser, userData, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [allSurveys, setAllSurveys] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [loadingSurveys, setLoadingSurveys] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);
  const [contactMessages, setContactMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Load data
  useEffect(() => {
    if (!currentUser || !isAdmin()) return;
    
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        const usersList = Object.keys(data || {}).map(key => ({
          id: key,
          ...data[key]
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadAdminData = async () => {
      setLoadingSurveys(true);
      setLoadingReports(true);
      setLoadingMessages(true);
      try {
        const surveys = await getAllSurveys() || [];
        setAllSurveys(surveys);
        const reports = await getAllReports() || [];
        setAllReports(reports);
        const messages = await getContactMessages() || [];
        setContactMessages(messages);
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setLoadingSurveys(false);
        setLoadingReports(false);
        setLoadingMessages(false);
      }
    };

    loadUsers();
    loadAdminData();
  }, [currentUser, isAdmin]);

  // Admin access check
  useEffect(() => {
    if (!loading && (!currentUser || !isAdmin())) {
      navigate("/");
    }
  }, [currentUser, isAdmin, loading, navigate]);

  const handleDeleteSurvey = async (userId, surveyId) => {
    if (!window.confirm(`Supprimer ce survey?`)) return;
    try {
      await deleteSurvey(userId, surveyId);
      setAllSurveys(allSurveys.filter(s => s.id !== surveyId || s.userId !== userId));
    } catch (error) {
      alert(`Erreur: ${error.message}`);
    }
  };

  const handleDeleteReport = async (userId, reportId) => {
    if (!window.confirm('Supprimer ce rapport?')) return;
    try {
      await deleteFullReport(userId, reportId);
      setAllReports(allReports.filter(r => r.id !== reportId || r.userId !== userId));
    } catch (error) {
      alert(`Erreur: ${error.message}`);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Supprimer ce message?')) return;
    try {
      await deleteContactMessage(messageId);
      setContactMessages(contactMessages.filter(m => m.id !== messageId));
    } catch (error) {
      alert(`Erreur: ${error.message}`);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Supprimer cet utilisateur?")) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
      } catch (error) {
        alert("Erreur suppression utilisateur");
      }
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUser(userId, { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      alert("Erreur mise à jour rôle");
    }
  };

  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const adminTabs = [
    { id: "overview", label: "Aperçu", icon: BarChart3 },
    { id: "messages", label: "Messages", icon: Mail },
    { id: "surveys", label: "Surveys", icon: Ship },
    { id: "rapports", label: "Rapports", icon: FileText },
    { id: "clients", label: "Clients", icon: Users },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!currentUser || !isAdmin()) {
    return null;
  }

  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const clientCount = totalUsers - adminCount;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
                <Shield className="w-8 h-8 text-blue-600" />
                <span>Admin</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm">
              <span className="text-slate-600 dark:text-slate-400">Admin:</span>
              <span className="font-semibold text-slate-900 dark:text-white truncate max-w-xs">{userData?.username}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`lg:block ${mobileMenuOpen ? 'block' : 'hidden'} w-64 bg-white/80 dark:bg-slate-800/95 backdrop-blur-md border-r border-slate-200 dark:border-slate-700`}>
          <nav className="p-4 space-y-1">
            {adminTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  activeTab === tab.id
                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-md"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:shadow-sm"
                }`}
              >
                <tab.icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="p-8 max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Tableau de bord Admin</h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Mail className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{contactMessages.length}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Messages</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <Users className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full dark:bg-emerald-900/50 dark:text-emerald-200">+12%</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalUsers}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Utilisateurs</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{adminCount}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Admins</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                    <DollarSign className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{clientCount}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Clients</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <button 
                  onClick={() => setActiveTab("messages")}
                  className="group bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all shadow-lg"
                >
                  <Mail className="w-12 h-12 mx-auto mb-4 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                  <p className="text-xl font-bold mb-1">{contactMessages.length}</p>
                  <p className="text-orange-100">Messages</p>
                </button>
                <button 
                  onClick={() => setActiveTab("surveys")}
                  className="group bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-8 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all shadow-lg"
                >
                  <Ship className="w-12 h-12 mx-auto mb-4 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                  <p className="text-xl font-bold mb-1">{allSurveys.length}</p>
                  <p className="text-emerald-100">Surveys</p>
                </button>
                <button 
                  onClick={() => setActiveTab("rapports")}
                  className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all shadow-lg"
                >
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                  <p className="text-xl font-bold mb-1">{allReports.length}</p>
                  <p className="text-blue-100">Rapports</p>
                </button>
                <button 
                  onClick={() => setActiveTab("clients")}
                  className="group bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all shadow-lg"
                >
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                  <p className="text-xl font-bold mb-1">{totalUsers}</p>
                  <p className="text-indigo-100">Clients</p>
                </button>
              </div>

              {/* OnHire Quick Links */}
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-slate-900/20 rounded-3xl p-8 text-center border border-slate-200/50 dark:border-slate-700/50">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">🚀 Accès Rapide OnHireApp</h2>
                <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
                  <Link 
                    to="/onhire" 
                    className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl px-10 py-6 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300 text-center min-w-[280px]"
                  >
                    <Ship className="w-12 h-12 mx-auto mb-4 text-blue-600 group-hover:rotate-6 group-hover:scale-110 transition-all" />
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">OnHire Principal</h3>
                      <p className="text-slate-600 dark:text-slate-400">Rapports d'inspection complets</p>
                    </div>
                  </Link>
                  <Link 
                    to="/onhire?tab=pictures" 
                    className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl px-10 py-6 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 hover:border-emerald-300 text-center min-w-[280px]"
                  >
                    <FileText className="w-12 h-12 mx-auto mb-4 text-emerald-600 group-hover:scale-110 transition-all" />
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Photos Inspection</h3>
                      <p className="text-slate-600 dark:text-slate-400">Galerie photos dédiée</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="p-8 max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">📧 Messages Contact ({contactMessages.length})</h1>
              {loadingMessages ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-600 mr-4" />
                  <span className="text-xl">Chargement...</span>
                </div>
              ) : contactMessages.length === 0 ? (
                <div className="text-center py-20">
                  <Mail className="w-20 h-20 mx-auto mb-6 text-slate-300 dark:text-slate-600" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Aucun message</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-lg">La boîte est vide pour le moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contactMessages.map((msg, index) => (
                    <div key={msg.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl -mt-4">
                          {msg.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3 mb-3">
                            <h3 className="font-bold text-2xl text-slate-900 dark:text-white truncate">{msg.name}</h3>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full dark:bg-emerald-900/50 dark:text-emerald-200 font-medium">
                              {msg.interest}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                            <a href={`mailto:${msg.email}`} className="font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                              ✉️ {msg.email}
                            </a>
                            <a href={`tel:${msg.phone}`} className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                              📱 {msg.phone || 'Non fourni'}
                            </a>
                            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                              🏢 {msg.company || 'Individuel'}
                            </div>
                          </div>
                          <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl mb-6 prose prose-sm max-w-none">
                            <p>{msg.message}</p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            📅 Reçu le {new Date(msg.createdAt).toLocaleString('fr-FR')}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => window.open(`mailto:${msg.email}?subject=Re: ${msg.interest}&body=Bonjour ${msg.name},`)}
                            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                            title="Répondre"
                          >
                            <Mail className="w-5 h-5" />
                            Répondre
                          </button>
                          <button 
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Surveys Tab */}
          {activeTab === "surveys" && (
            <div className="p-8">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">📊 Draft Surveys ({allSurveys.length})</h1>
                {loadingSurveys ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mr-4" />
                    <span className="text-xl">Chargement...</span>
                  </div>
                ) : allSurveys.length === 0 ? (
                  <div className="text-center py-20">
                    <Ship className="w-24 h-24 mx-auto mb-6 text-slate-300 dark:text-slate-600" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Aucun survey</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Les utilisateurs n'ont pas encore créé de surveys</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {allSurveys.map((survey) => (
                      <div key={`${survey.userId}-${survey.id}`} className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all shadow-sm">
                        <div className="flex items-start gap-6 mb-6">
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center">
                              <Ship className="w-10 h-10 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 truncate">{survey.name}</h3>
                            <div className="flex items-center gap-4 text-sm mb-2">
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900/50 dark:text-blue-200">
                                {survey.userId.slice(0, 8)}
                              </span>
                              <span className="text-slate-500 dark:text-slate-400">IMO: {survey.imo}</span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{survey.date}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                              <div className="flex items-center gap-2">
                                <span className="font-mono bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg text-lg font-bold text-slate-900 dark:text-white">
                                  {survey.finalHFO || 0}
                                </span>
                                <span className="text-slate-600 dark:text-slate-400">HFO MT</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg text-lg font-bold text-slate-900 dark:text-white">
                                  {survey.finalMGO || 0}
                                </span>
                                <span className="text-slate-600 dark:text-slate-400">MGO MT</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                          <button
                            onClick={() => navigate(`/admin/edit-survey/${survey.userId}/${survey.id}`)}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-2 justify-center"
                          >
                            <Edit3 className="w-5 h-5" />
                            Éditer
                          </button>
                          <button
                            onClick={() => handleDeleteSurvey(survey.userId, survey.id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-2 justify-center"
                          >
                            <Trash2 className="w-5 h-5" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Clients Tab */}
          {activeTab === "clients" && (
            <div className="p-8 max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">👥 Gestion Clients ({filteredUsers.length}/{users.length})</h1>
              </div>

              {/* Search */}
              <div className="mb-8">
                <div className="relative max-w-2xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-lg placeholder-slate-400 dark:placeholder-slate-500 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800">
                      <tr>
                        <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Utilisateur</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Email</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Rôle</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Date</th>
                        <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-b-0">
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">{user.username?.charAt(0)?.toUpperCase() || 'U'}</span>
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white">{user.username || 'N/A'}</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">ID: {user.id.slice(-6)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 max-w-md">
                            <div className="font-mono text-slate-900 dark:text-white truncate">{user.email}</div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <select
                              value={user.role || 'user'}
                              onChange={(e) => handleRoleChange(user.id, e.target.value)}
                              className="px-4 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-w-[100px]"
                            >
                              <option value="user">👤 Client</option>
                              <option value="admin">🔐 Admin</option>
                            </select>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/admin/users/${user.id}`}
                                className="p-3 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm hover:shadow-md"
                                title="Détails"
                              >
                                <Eye className="w-5 h-5" />
                              </Link>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-3 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm hover:shadow-md"
                                title="Supprimer"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredUsers.length === 0 && searchTerm && (
                  <div className="p-12 text-center">
                    <Search className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Aucun résultat</h3>
                    <p className="text-slate-500 dark:text-slate-400">Aucun utilisateur ne correspond à "{searchTerm}"</p>
                  </div>
                )}
                {filteredUsers.length === 0 && !searchTerm && (
                  <div className="p-12 text-center border-t border-slate-200 dark:border-slate-700">
                    <Users className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Aucun utilisateur</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Commencez par créer vos premiers comptes.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Other tabs simplified */}
          {activeTab === "rapports" && (
            <div className="p-8">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">📄 Rapports ({allReports.length})</h1>
                {loadingReports ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mr-4" />
                    <span className="text-xl">Chargement...</span>
                  </div>
                ) : allReports.length === 0 ? (
                  <div className="text-center py-20">
                    <FileText className="w-24 h-24 mx-auto mb-6 text-slate-300" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Aucun rapport</h3>
                  </div>
                ) : (
                  allReports.map((report) => (
                    <div key={`${report.userId}-${report.id}`} className="bg-white dark:bg-slate-800 border rounded-2xl p-8 mb-6 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                          <FileText className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{report.vesselName || 'Rapport'}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            {report.createdAt ? new Date(report.createdAt).toLocaleDateString('fr-FR') : 'N/A'} • {report.userId.slice(0,8)}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <button 
                            onClick={() => navigate(`/admin/edit-report/${report.userId}/${report.id}`)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
                          >
                            Éditer
                          </button>
                          <button 
                            onClick={() => handleDeleteReport(report.userId, report.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-8 max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">⚙️ Paramètres</h1>
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 border border-slate-200 dark:border-slate-700 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Site Web</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Nom du site</label>
                        <input type="text" defaultValue="OnHireApp" className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Email contact</label>
                        <input type="email" defaultValue="contact@onhireapp.com" className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Tarification</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Mensuel (€)</label>
                        <input type="number" defaultValue="99" className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-lg focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Annuel (€)</label>
                        <input type="number" defaultValue="890" className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-lg focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-12">
                  <button className="px-12 py-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all">
                    💾 Enregistrer les modifications
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;

