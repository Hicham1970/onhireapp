import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { getUser } from '../api/api';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user);
            
            // Charger les données utilisateur depuis Firebase Database
            if (user) {
                try {
                    const data = await getUser(user.uid);
                    setUserData(data);
                } catch (error) {
                    console.error("Erreur lors du chargement des données utilisateur:", error);
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
            
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Fonction pour vérifier si l'utilisateur est Admin
    const isAdmin = () => {
        return userData?.role === 'admin';
    };

    // Fonction pour vérifier si l'utilisateur est un client (connecté)
    const isClient = () => {
        return currentUser !== null;
    };

    const value = {
        currentUser,
        userData,
        loading,
        isAdmin,
        isClient
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : <div className="flex h-screen items-center justify-center">Chargement...</div>}
        </AuthContext.Provider>
    );
}

