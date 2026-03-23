import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSurveys, getVessels, getFullReports, getUsers, deleteSurvey, deleteFullReport, getContactMessages, deleteContactMessage } from '../api/api';
import { deleteDraftSurvey, getAllDraftSurveys } from '../services/draftSurveyServices.ts';
import { generateDraftSurveyPDF } from '../utils/pdfDraftSurveyGenerator.js';
import { Trash2, FileText, Edit3, Download, Search, User, Calendar, Package, BadgeCheck, Plus, Eye, Camera } from 'lucide-react';
import Profile from '../components/Profile';
import { Mail, ClipboardCheck, Shield, ChevronLeft, Loader2, Users, BarChart3 } from 'lucide-react';

const DashboardAdmin = () => {
  const { currentUser, loading, isAdmin, userData } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [surveys, setSurveys] = useState([]);
  const [fullReports, setFullReports] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allDraftSurveys, setAllDraftSurveys] = useState([]);

  const [contactMessages, setContactMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (loading || !currentUser || !isAdmin()) {
      navigate('/dashboard');
      return;
    }

    // Load admin data
    Promise.all([
      getSurveys(currentUser.uid),
      getFullReports(currentUser.uid),
getUsers(),
      // getVessels(currentUser.uid), removed unused
getAllDraftSurveys(),
      getContactMessages()
    ]).then(([userSurveys, reports, usersData, dbVessels, allDraftSurveysData, contactMessagesData]) => {
      setContactMessages(contactMessagesData || []);
      setSurveys(userSurveys || []);
      setFullReports(reports || []);
      setAllUsers(Object.keys(usersData || {}).map(key => ({ id: key, ...usersData[key] })));
      setAllDraftSurveys(allDraftSurveysData || []);
    })
    .catch(err => console.error("Dashboard Admin load error:", err))
    .finally(() => setIsLoading(false));
  }, [currentUser, loading, isAdmin, navigate]);

  const refetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [, , , , allDraftSurveysData] = await Promise.all([
        getSurveys(currentUser.uid),
        getFullReports(currentUser.uid),
        getUsers(),
        getVessels(currentUser.uid),
        getAllDraftSurveys()
      ]);
      setAllDraftSurveys(allDraftSurveysData || []);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  const refetchContactMessages = useCallback(async () => {
    try {
      const data = await getContactMessages();
      setContactMessages(data || []);
    } catch (error) {
      console.error("Error refetching messages:", error);
    }
  }, []);  


  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    try {
      if (itemToDelete.type === 'Draft') {
        await deleteDraftSurvey(itemToDelete.userId, itemToDelete.id);
      } else if (itemToDelete.type === 'OnHire') {
        await deleteSurvey(itemToDelete.userId, itemToDelete.id);
      } else if (itemToDelete.type === 'Inspection') {
        await deleteFullReport(itemToDelete.userId, itemToDelete.id);
      }
      
      await refetchData();
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Delete failed:', error);
      // TODO: Add toast/error
      alert("Erreur lors de la suppression: " + error.message);
    }
  };

  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;
    try {
      await deleteContactMessage(messageToDelete.id);
      await refetchContactMessages();
      setShowDeleteConfirm(false);
      setMessageToDelete(null);
    } catch (error) {
      console.error('Delete message failed:', error);
      alert("Erreur lors de la suppression du message: " + error.message);
    }
  };


const totalUsers = allUsers.length;
  const totalSurveys = surveys.length;
  const totalReports = fullReports.length;
// const totalVessels = vessels.length; removed unused
const safeNum = (v) => (isFinite(v) && !isNaN(v) ? v : 0);
  const totalMessages = contactMessages.length;

  // Combine all items for the unified table
  const allItems = useMemo(() => {
    const drafts = allDraftSurveys.map(d => ({
      ...d,
      type: 'Draft',
      date: d.updatedAt || d.createdAt,
      vesselName: d.informations?.vesselName || 'N/A'
    }));
    const onhires = surveys.map(s => ({
      ...s,
      type: 'OnHire',
      date: s.date || s.createdAt,
      vesselName: s.name || s.vesselName || 'N/A'
    }));
    const inspections = fullReports.map(r => ({
      ...r,
      type: 'Inspection',
      date: r.createdAt,
      vesselName: r.vesselName || 'N/A'
    }));
    
    return [...drafts, ...onhires, ...inspections].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [allDraftSurveys, surveys, fullReports]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-slate-500">Chargement Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl border border-emerald-200">
              <Shield className="w-6 h-6 text-emerald-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-slate-500">Gestion complète</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
<Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>

                <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalMessages}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Messages</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalSurveys}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Surveys Onhire</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{allDraftSurveys.length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Draft Surveys</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Camera className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalReports}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Rapports</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalUsers}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Utilisateurs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Users Management */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <User className="w-6 h-6 " />
              Gestion Utilisateurs
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {allUsers.slice(0, 5).map(user => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-sm font-bold">
                      {user.username?.charAt(0) || 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white truncate">{user.username || 'N/A'}</p>
                      <p className="text-sm text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">USER</span>
                    <button className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors" title="Supprimer">
<Shield className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Messages Section */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                Messages Récente ( {contactMessages.length} )
              </h4>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {contactMessages.slice(0, 5).map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">
                      {msg.name?.charAt(0).toUpperCase() || 'M'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-slate-900 dark:text-white truncate">{msg.name || 'N/A'}</p>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs rounded-full dark:bg-emerald-900/50 dark:text-emerald-300">
                          {msg.status || 'unread'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 truncate max-h-12 overflow-hidden mb-1">{msg.email}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{msg.message}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(msg.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setMessageToDelete(msg);
                        setShowDeleteConfirm(true);
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors ml-auto"
                      title="Supprimer message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {contactMessages.length === 0 && (
                  <p className="text-slate-500 dark:text-slate-400 text-center py-4">Aucun message</p>
                )}
              </div>
            </div>

          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Activité Récente</h3>
            <div className="space-y-4">
              {allItems.slice(0, 5).map((item, index) => (

                <div key={item.id || item.surveyId || index} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-600">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {item.vesselName?.charAt(0) || 'R'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-slate-900 dark:text-white">{item.vesselName}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        item.type === 'Draft' ? 'bg-cyan-500' :
                        item.type === 'OnHire' ? 'bg-emerald-500' : 'bg-purple-500'
                      }`}></span>
                      {item.type}
                    </p>
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(item.date).toLocaleDateString('fr-FR', {
                      day: 'numeric', month: 'short'
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unified Reports Management Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Gestion Tous les Rapports</h3>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher navire ou utilisateur..."
                  className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 w-64 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mr-3 text-blue-600" />
              <span className="text-slate-500">Chargement des données...</span>
            </div>
          ) : allItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <ClipboardCheck className="w-16 h-16 mx-auto mb-4 opacity-40" />
              <p>Aucun rapport trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white text-sm">Navire</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white text-sm">Type</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white text-sm">Utilisateur</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white text-sm min-w-[100px]">Date</th>
                    <th className="text-right py-4 px-4 font-semibold text-slate-900 dark:text-white text-sm w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allItems
                    .filter(item => {
                      const query = searchQuery.toLowerCase();
                      const matchesSearch = 
                        item.vesselName?.toLowerCase().includes(query) ||
                        item.userId?.toLowerCase().includes(query);
                      return matchesSearch;
                    })
                    .map((item) => {
                      const userEmail = allUsers.find(u => u.id === item.userId)?.email || item.userId?.slice(0,8) || 'N/A';
                      const date = new Date(item.date || Date.now()).toLocaleDateString('fr-FR');
                      
                      return (
                        <tr key={`${item.type}-${item.id}`} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <td className="py-4 px-4 text-sm font-medium text-slate-900 dark:text-white truncate max-w-[200px]">
                            {item.vesselName}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              item.type === 'Draft' 
                                ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-200'
                                : item.type === 'OnHire'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
                                : 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'
                            }`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-600 dark:text-slate-300 truncate max-w-[180px]" title={userEmail}>{userEmail}</td>
                          <td className="py-4 px-4 text-sm text-slate-600 dark:text-slate-300">{date}</td>
                          <td className="py-4 px-4 text-right space-x-1">
                            <button
                              onClick={() => {
                                if (item.type === 'Draft') navigate(`/admin/edit-draft-survey/${item.userId}/${item.surveyId}`);
                                if (item.type === 'OnHire') navigate(`/admin/edit-survey/${item.userId}/${item.id}`);
                                if (item.type === 'Inspection') navigate(`/admin/edit-report/${item.userId}/${item.id}`);
                              }}
                              className="p-2 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                              title="Modifier"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            {item.type === 'Draft' && (
                            <button
                              onClick={() => {
                                generateDraftSurveyPDF(item);
                              }}
                              className="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                              title="Télécharger PDF"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            )}
                            <button
                              onClick={() => {
                                setItemToDelete(item);
                                setShowDeleteConfirm(true);
                              }}
                              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Confirmer suppression
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Supprimer définitivement l'élément "{itemToDelete?.vesselName || 'N/A'}" ? Cette action est irréversible.
                </p>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setItemToDelete(null);
                  }}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteItem}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-red-500/30"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <button onClick={() => navigate('/create-survey')} className="group p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">Nouveau Survey</h4>
            <p className="opacity-90">OnHire</p>
            <p className="opacity-90">Créer expertise</p>
          </button>
          <button onClick={() => navigate('/onhire?tab=pictures')} className="group p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">

            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <ClipboardCheck className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">Rapports Photos</h4>
            <p className="opacity-90">Inspection complète</p>
          </button>
          <button onClick={() => navigate('/users')} className="group p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">Gestion Users</h4>
            <p className="opacity-90">Tous les comptes</p>
          </button>
          <button onClick={() => navigate('/onhire?tab=ai')} className="group p-6 bg-gradient-to-br from-slate-500 to-slate-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">Analytics</h4>
            <p className="opacity-90">Statistiques globales</p>
          </button>
          <button onClick={() => navigate('/draft-survey/infos')} className="group p-6 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <BadgeCheck className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">Draft Surveys</h4>
            <p className="opacity-90">Gestion complète</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
