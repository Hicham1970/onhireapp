import { ref, get, set, remove, update, push } from "firebase/database";
import { database } from "../firebase";

// Ajout d'un utilisateur
export const addUser = async (userId, userData) => {
    try {
        await set(ref(database, `users/${userId}`), userData);
        return { success: true };
    } catch (error) {
        throw error;
    }
};

// Sauvegarder un rapport complet pour un utilisateur
export const saveFullReport = async (userId, reportData) => {
    if (!userId) throw new Error("Un identifiant utilisateur est requis pour sauvegarder le rapport.");
    try {
        if (reportData.id) {
            // Mise à jour d'un rapport existant
            await set(ref(database, `reports/${userId}/${reportData.id}`), reportData);
            return { success: true, reportId: reportData.id };
        } else {
            // Création d'un nouveau rapport
            const userReportsRef = ref(database, `reports/${userId}`);
            const newReportRef = push(userReportsRef);
            await set(newReportRef, { ...reportData, id: newReportRef.key });
            return { success: true, reportId: newReportRef.key };
        }
    } catch (error) {
        throw error;
    }
};

// Récupérer tous les rapports complets pour un utilisateur
export const getFullReports = async (userId) => {
    if (!userId) throw new Error("Un identifiant utilisateur est requis pour récupérer les rapports.");
    try {
        const snapshot = await get(ref(database, `reports/${userId}`));
        if (snapshot.exists()) {
            const data = snapshot.val();
            return Object.keys(data).map(key => ({ id: key, ...data[key] })).reverse();
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
};

// Supprimer un rapport complet
export const deleteFullReport = async (userId, reportId) => {
    if (!userId || !reportId) throw new Error("ID utilisateur et ID rapport requis.");
    try {
        await remove(ref(database, `reports/${userId}/${reportId}`));
        return { success: true };
    } catch (error) {
        throw error;
    }
};

// Récupérer un utilisateur spécifique (pour vérifier le rôle par exemple)
export const getUser = async (userId) => {
    try {
        const snapshot = await get(ref(database, `users/${userId}`));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

// Obtention de tous les utilisateurs
export const getUsers = async () => {
    try {
        const snapshot = await get(ref(database, "users"));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return {};
        }
    } catch (error) {
        if ((error.message && error.message.toLowerCase().includes("permission denied")) || (error.code && error.code.includes("permission-denied"))) {
            console.warn("Firebase: Permission refusée pour getUsers. Vérifiez les règles de la base de données.");
            // On relance l'erreur pour que l'UI puisse l'afficher
        }
        throw error;
    }
};

// Supprimer un utilisateur (Admin)
export const deleteUser = async (userId) => {
    if (!userId) throw new Error("ID utilisateur requis.");
    try {
        await remove(ref(database, `users/${userId}`));
        return { success: true };
    } catch (error) {
        throw error;
    }
};

// Mise à jour d'un utilisateur
export const updateUser = async (userId, userData) => {
    try {
        await update(ref(database, `users/${userId}`), userData);
        return { success: true };
    } catch (error) {
        throw error;
    }
};

// Sauvegarder les données de pesage pour un utilisateur
export const savePesageEntries = async (userId, entries) => {
    if (!userId) throw new Error("Un identifiant utilisateur est requis pour sauvegarder les données.");
    try {
        // Les données sont stockées sous un chemin spécifique à l'utilisateur
        await set(ref(database, `pesageData/${userId}`), entries);
        return { success: true };
    } catch (error) {
        throw error;
    }
};

// Récupérer les données de pesage pour un utilisateur
export const getPesageEntries = async (userId) => {
    if (!userId) throw new Error("Un identifiant utilisateur est requis pour récupérer les données.");
    try {
        const snapshot = await get(ref(database, `pesageData/${userId}`));
        if (snapshot.exists()) {
            return snapshot.val(); // Retourne les données si elles existent
        } else {
            return []; // Retourne un tableau vide si aucune donnée n'est trouvée
        }
    } catch (error) {
        throw error;
    }
};

// Sauvegarder les données d'un survey pour un utilisateur
export const saveSurvey = async (userId, surveyData) => {
    if (!userId) throw new Error("Un identifiant utilisateur est requis pour sauvegarder le survey.");
    try {
        // On utilise push pour générer un ID unique pour chaque nouveau survey
        const userSurveysRef = ref(database, `surveys/${userId}`);
        const newSurveyRef = push(userSurveysRef);
        await set(newSurveyRef, {
            ...surveyData,
            id: newSurveyRef.key,
            createdAt: surveyData.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        return { success: true, surveyId: newSurveyRef.key };
    } catch (error) {
        throw error;
    }
};

// Récupérer les données de survey pour un utilisateur
export const getSurveys = async (userId) => {
    if (!userId) throw new Error("Un identifiant utilisateur est requis pour récupérer les surveys.");
    try {
        const snapshot = await get(ref(database, `surveys/${userId}`));
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Convertit l'objet de surveys en un tableau
            return Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })).reverse(); // reverse() pour afficher les plus récents en premier
        } else {
            return []; // Retourne un tableau vide si aucune donnée n'est trouvée
        }
    } catch (error) {
        if ((error.message && error.message.toLowerCase().includes("permission denied")) || (error.code && error.code.includes("permission-denied"))) {
            console.warn("Firebase: Permission refusée pour getSurveys. Vérifiez les règles de la base de données.");
            return [];
        }
        throw error;
    }
};

// Supprimer un survey
export const deleteSurvey = async (userId, surveyId) => {
    if (!userId || !surveyId) throw new Error("ID utilisateur et ID survey requis.");
    try {
        await remove(ref(database, `surveys/${userId}/${surveyId}`));
        return { success: true };
    } catch (error) {
        throw error;
    }
};

// Sauvegarder un nouveau navire pour un utilisateur
export const saveVessel = async (userId, vesselData) => {
    if (!userId) throw new Error("Un identifiant utilisateur est requis pour sauvegarder le navire.");
    try {
        const userVesselsRef = ref(database, `vessels/${userId}`);
        const newVesselRef = push(userVesselsRef);
        await set(newVesselRef, vesselData);
        return { success: true, vesselId: newVesselRef.key };
    } catch (error) {
        throw error;
    }
};

// Récupérer les navires pour un utilisateur
export const getVessels = async (userId) => {
    if (!userId) throw new Error("Un identifiant utilisateur est requis pour récupérer les navires.");
    try {
        const snapshot = await get(ref(database, `vessels/${userId}`));
        if (snapshot.exists()) {
            const data = snapshot.val();
            return Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
        } else {
            return [];
        }
    } catch (error) {
        if ((error.message && error.message.toLowerCase().includes("permission denied")) || (error.code && error.code.includes("permission-denied"))) {
            console.warn("Firebase: Permission refusée pour getVessels. Vérifiez les règles de la base de données.");
            return [];
        }
        throw error;
    }
};

// Sauvegarder un rapport photo pour un utilisateur
export const savePhotoReport = async (userId, reportData) => {
    if (!userId) throw new Error("Un identifiant utilisateur est requis pour sauvegarder le rapport photo.");
    try {
        // On utilise push pour générer un ID unique pour chaque nouveau rapport
        const userReportsRef = ref(database, `photoReports/${userId}`);
        const newReportRef = push(userReportsRef);
        await set(newReportRef, { ...reportData, id: newReportRef.key });
        return { success: true, reportId: newReportRef.key };
    } catch (error) {
        throw error;
    }
};

// ===========================================
// ADMIN: Update a survey (for edit)
// ===========================================
export const updateSurvey = async (userId, surveyId, surveyData) => {
  if (!userId || !surveyId) throw new Error("ID utilisateur et ID survey requis.");
  try {
    await set(ref(database, `surveys/${userId}/${surveyId}`), {
      ...surveyData,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

// ===========================================
// ADMIN: Update a full report
// ===========================================
export const updateFullReport = async (userId, reportId, reportData) => {
  if (!userId || !reportId) throw new Error("ID utilisateur et ID rapport requis.");
  try {
    await set(ref(database, `reports/${userId}/${reportId}`), reportData);
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

// ===========================================
// ADMIN: Get ALL surveys from ALL users
// ===========================================
export const getAllSurveys = async () => {
    try {
        const snapshot = await get(ref(database, "surveys"));
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Transform into array with userId
            const allSurveys = [];
            for (const userId in data) {
                const userSurveys = Object.keys(data[userId]).map(key => ({
                    id: key,
                    userId: userId,
                    ...data[userId][key]
                }));
                allSurveys.push(...userSurveys);
            }
            return allSurveys.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching all surveys:", error);
        throw error;
    }
};

// ===========================================
// ADMIN: Get ALL reports from ALL users
// ===========================================
export const getAllReports = async () => {
    try {
        const snapshot = await get(ref(database, "reports"));
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Transform into array with userId
            const allReports = [];
            for (const userId in data) {
                const userReports = Object.keys(data[userId]).map(key => ({
                    id: key,
                    userId: userId,
                    ...data[userId][key]
                }));
                allReports.push(...userReports);
            }
            return allReports.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching all reports:", error);
        throw error;
    }
};

// ===========================================
// ADMIN: Get user info by userId
// ===========================================
export const getUserInfo = async (userId) => {
    try {
        const snapshot = await get(ref(database, `users/${userId}`));
        if (snapshot.exists()) {
            return { id: userId, ...snapshot.val() };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw new Error(error.message);
    }
};

// ===========================================
// CONTACT MESSAGES
// ===========================================

export const saveContactMessage = async (messageData) => {
    try {
        const messagesRef = ref(database, 'messages');
        const newMessageRef = push(messagesRef);
        await set(newMessageRef, {
            ...messageData,
            id: newMessageRef.key,
            createdAt: new Date().toISOString(),
            status: 'unread'
        });
        return { success: true, messageId: newMessageRef.key };
    } catch (error) {
        throw error;
    }
};

export const getContactMessages = async () => {
    try {
        const snapshot = await get(ref(database, 'messages'));
        if (snapshot.exists()) {
            const data = snapshot.val();
            return Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching contact messages:", error);
        throw error;
    }
};

export const deleteContactMessage = async (messageId) => {
    if (!messageId) throw new Error("ID message requis.");
    try {
        await remove(ref(database, `messages/${messageId}`));
        return { success: true };
    } catch (error) {
        throw error;
    }
};
