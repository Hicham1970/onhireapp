// Données de tarification SaaS

export const pricingPlans = {
  monthly: [
    {
      id: "onhire-monthly",
      name: "OnHire App",
      description: "Gestion des expertises maritimes",
      price: 49,
      period: "mois",
      features: [
        "Expertises OnHire/OffHire illimitées",
        "Gestion des réservoirs",
        "Calcul automatique des volumes",
        "Génération de rapports PDF",
        "Support par email",
        "1 utilisateur"
      ],
      notIncluded: [
        "Inspection Report",
        "Fuel Calculator",
        "API Access"
      ],
      popular: false,
      cta: "Commencer avec OnHire",
      color: "blue"
    },
    {
      id: "inspection-monthly",
      name: "Inspection Report",
      description: "Rapports d'inspection photos",
      price: 39,
      period: "mois",
      features: [
        "Rapports photo illimités",
        "Modèles personnalisables",
        "Signature numérique",
        "Export PDF professionnel",
        "Stockage cloud 10Go",
        "1 utilisateur"
      ],
      notIncluded: [
        "OnHire App",
        "Fuel Calculator",
        "API Access"
      ],
      popular: false,
      cta: "Commencer avec Inspection",
      color: "emerald"
    },
    {
      id: "fuel-monthly",
      name: "Fuel Calculator",
      description: "Calculateur de carburant",
      price: 29,
      period: "mois",
      features: [
        "Calcul VCF précis",
        "Toutes les essences Supportées",
        "Historique des calculs",
        "Export Excel/CSV",
        "Tableau de bord analytique",
        "1 utilisateur"
      ],
      notIncluded: [
        "OnHire App",
        "Inspection Report",
        "API Access"
      ],
      popular: false,
      cta: "Commencer avec Fuel",
      color: "amber"
    },
    {
      id: "pack-monthly",
      name: "Pack Complet",
      description: "Tous les modules réunis",
      price: 99,
      period: "mois",
      features: [
        "OnHire App Complet",
        "Inspection Report Pro",
        "Fuel Calculator Avancé",
        "API Access",
        "Stockage cloud 50Go",
        "Support prioritaire",
        "5 utilisateurs",
        "Formation incluse"
      ],
      notIncluded: [],
      popular: true,
      cta: "Commencer le Pack",
      color: "purple",
      badge: "Plus Populaire"
    }
  ],
  annual: [
    {
      id: "onhire-annual",
      name: "OnHire App",
      description: "Gestion des expertises maritimes",
      price: 470,
      period: "an",
      savings: 118,
      features: [
        "Expertises OnHire/OffHire illimitées",
        "Gestion des réservoirs",
        "Calcul automatique des volumes",
        "Génération de rapports PDF",
        "Support par email",
        "1 utilisateur"
      ],
      notIncluded: [
        "Inspection Report",
        "Fuel Calculator",
        "API Access"
      ],
      popular: false,
      cta: "Commencer avec OnHire",
      color: "blue"
    },
    {
      id: "inspection-annual",
      name: "Inspection Report",
      description: "Rapports d'inspection photos",
      price: 370,
      period: "an",
      savings: 98,
      features: [
        "Rapports photo illimités",
        "Modèles personnalisables",
        "Signature numérique",
        "Export PDF professionnel",
        "Stockage cloud 10Go",
        "1 utilisateur"
      ],
      notIncluded: [
        "OnHire App",
        "Fuel Calculator",
        "API Access"
      ],
      popular: false,
      cta: "Commencer avec Inspection",
      color: "emerald"
    },
    {
      id: "fuel-annual",
      name: "Fuel Calculator",
      description: "Calculateur de carburant",
      price: 270,
      period: "an",
      savings: 78,
      features: [
        "Calcul VCF précis",
        "Toutes les essences Supportées",
        "Historique des calculs",
        "Export Excel/CSV",
        "Tableau de bord analytique",
        "1 utilisateur"
      ],
      notIncluded: [
        "OnHire App",
        "Inspection Report",
        "API Access"
      ],
      popular: false,
      cta: "Commencer avec Fuel",
      color: "amber"
    },
    {
      id: "pack-annual",
      name: "Pack Complet",
      description: "Tous les modules réunis",
      price: 890,
      period: "an",
      savings: 298,
      features: [
        "OnHire App Complet",
        "Inspection Report Pro",
        "Fuel Calculator Avancé",
        "API Access",
        "Stockage cloud 50Go",
        "Support prioritaire",
        "5 utilisateurs",
        "Formation incluse"
      ],
      notIncluded: [],
      popular: true,
      cta: "Commencer le Pack",
      color: "purple",
      badge: "Économie de 25%"
    }
  ]
};

export const faqs = [
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer: "Oui, vous pouvez upgrade ou downgrade votre plan à tout moment. Les changements prennent effet immédiatement et la facturation est ajustée au prorata."
  },
  {
    question: "Qu'est-ce qui est inclus dans la période d'essai gratuite ?",
    answer: "L'essai gratuit de 14 jours vous donne accès complet au Pack Complet. Vous pouvez tester toutes les fonctionnalités sans limite pendant cette période."
  },
  {
    question: "Comment se passe la facturation ?",
    answer: "La facturation est mensuelle ou annuelle selon votre choix. Nous acceptons les cartes de crédit, virement bancaire et PayPal pour les entreprises."
  },
  {
    question: "Proposez-vous des formations ?",
    answer: "Oui, le Pack Complet inclut une formation en ligne de 2 heures. Des formations supplémentaires sont disponibles sur demande pour tous les plans."
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Absolument. Nous utilisons le chiffrement de bout en bout (AES-256), nos serveurs sont hébergés en France et nous sommes conformes RGPD."
  }
];

