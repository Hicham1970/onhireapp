import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

function Notfound() {
  const [timeOut, setTimeOut] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOut((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-slate-200">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full text-red-600">
            <AlertTriangle size={48} />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 text-slate-900">404</h1>
        <h2 className="text-xl font-semibold mb-4 text-slate-700">Page non trouvée</h2>
        <p className="text-slate-500 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="text-sm text-slate-400 mb-6">
          Redirection automatique dans <span className="font-bold text-blue-600 text-lg">{timeOut}</span> secondes...
        </div>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-colors"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

export default Notfound;
