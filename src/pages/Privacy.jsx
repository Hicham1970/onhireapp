import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';

const Privacy = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8`}>
      <Helmet>
        <title>Confidentialité - OnHireApp</title>
        <meta name="description" content="Politique de confidentialité d'OnHireApp" />
      </Helmet>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Politique de Confidentialité
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">Dernière mise à jour: 2024</p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">1</span>
            Introduction
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            OnHireApp s'engage à protéger vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400">2</span>
            Données collectées
          </h2>
          <ul className="space-y-3 text-lg">
            <li>• Informations de compte (email, nom)</li>
            <li>• Données de surveys (photos, mesures)</li>
            <li>• Données techniques (IP, navigateur)</li>
            <li>• Données d'usage (pages visitées)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">3</span>
            Utilisation des données
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>• Génération de rapports</li>
                <li>• Calculs de tirage d'eau</li>
                <li>• Stockage sécurisé</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Amélioration</h3>
              <ul className="space-y-2">
                <li>• Amélioration du service</li>
                <li>• Analytics anonymes</li>
                <li>• Support client</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center text-orange-600 dark:text-orange-400">4</span>
            Sécurité
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            Vos données sont chiffrées AES-256 au repos et en transit (TLS 1.3). Hébergement sur Firebase avec conformité RGPD.
          </p>
          <div className="grid md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl">
            <div>
              <h4 className="font-bold text-lg mb-3">Conformité</h4>
              <p>• RGPD • CNIL • ISO 27001</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3">Sécurité</h4>
              <p>• Chiffrement E2E • Authentification 2FA • Logs d'audit</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Vos droits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <h3 className="font-bold mb-3">Accès & Rectification</h3>
              <p>Contactez-nous pour accéder ou modifier vos données.</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
              <h3 className="font-bold mb-3">Suppression</h3>
              <p>Exercez votre droit à l'oubli via votre profil.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-700 text-center">
        <p className="text-slate-600 dark:text-slate-400">
          Questions ? <a href="mailto:contact@onhireapp.com" className="text-blue-600 hover:underline font-semibold">contact@onhireapp.com</a>
        </p>
      </div>
    </div>
  );
};

export default Privacy;

