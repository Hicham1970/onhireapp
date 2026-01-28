import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "../hooks/Hooks";
import { Ship, LogIn } from 'lucide-react';

export const Home = () => {
  const { user } = useUser();

  // Si l'utilisateur est connecté, on le redirige vers le tableau de bord.
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Sinon, on affiche la nouvelle page d'accueil.
  return (
    // Remplacez '/ship-background.jpg' par le chemin vers votre image panoramique.
    // Vous pouvez la placer dans le dossier `public` à la racine de votre projet.
    <div className="relative h-screen w-full flex items-center justify-center text-white bg-cover bg-center" style={{ backgroundImage: "url('/ship-background.jpg')" }}>
      {/* Superposition sombre pour une meilleure lisibilité du texte */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center p-8">
        <div className="flex justify-center items-center gap-4 mb-6">
          <Ship className="w-16 h-16 text-blue-300" />
          <h1 className="text-6xl font-bold tracking-tight text-white">
            OnHire
          </h1>
        </div>
        <p className="text-xl text-slate-200 max-w-2xl mx-auto mb-10">
          La plateforme nouvelle génération pour les expertises maritimes complètes, la gestion de carburant et les rapports assistés par IA.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg"
          >
            <LogIn className="w-5 h-5" />
            <span>Connexion</span>
          </Link>
          <Link
            to="/register"
            className="bg-transparent hover:bg-white/20 border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            S'inscrire
          </Link>
        </div>
      </div>
       <div className="absolute bottom-4 text-center w-full text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} OnHire App. Tous droits réservés.</p>
      </div>
    </div>
  );
};

export default Home;
