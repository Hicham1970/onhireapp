// Données de tarification SaaS

export const pricingPlans = {
  monthly: [
    {
      id: "draft-monthly",
      name: "Draft Survey",
      description: "Calculs de jaugeage professionnels",
      price: 9,
      period: "mois",
      features: [
        "Draft readings illimitées",
        "Calculs hydrostatics précis",
        "Déductibles automatiques",
        "Gestion tanks et volumes",
        "Rapports PDF professionnels",
        "Fuel Calculator gratuit",
        "1 utilisateur"
      ],
      notIncluded: [
        "Inspection Report",
        "OnHire App"
      ],
      popular: true,
      cta: "Commencer Draft Survey",
      color: "purple",
      badge: "Premier Choix"
    },
    {
      id: "onhire-monthly",
      name: "OnHire App",
      description: "Gestion des expertises maritimes",
      price: 7,
      period: "mois",
      features: [
        "Expertises OnHire/OffHire illimitées",
        "Gestion des réservoirs",
        "Calcul automatique des volumes",
        "Génération de rapports PDF",
        "Support par email",
        "Fuel Calculator gratuit",
        "1 utilisateur"
      ],
      notIncluded: [
        "Inspection Report",
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
      price: 9,
      period: "mois",
      features: [
        "Rapports photo illimités",
        "Modèles personnalisables",
        "Signature numérique",
        "Export PDF professionnel",
        "Stockage cloud 10Go",
        "Fuel Calculator gratuit",
        "1 utilisateur"
      ],
      notIncluded: [
        "OnHire App",
        "API Access"
      ],
      popular: false,
      cta: "Commencer avec Inspection",
      color: "emerald"
    },
    {
      id: "pack-monthly",
      name: "Pack Complet",
      description: "Tous les modules + Draft Survey",
      price: 30,
      period: "mois",
      features: [
        "Draft Survey Pro",
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
      popular: false,
      cta: "Commencer le Pack",
      color: "amber"
    }
  ],
  annual: [
    {
      id: "draft-annual",
      name: "Draft Survey",
      description: "Calculs de jaugeage professionnels",
      price: 70,
      period: "an",
      savings: 28,
      features: [
        "Draft readings illimitées",
        "Calculs hydrostatics précis",
        "Déductibles automatiques",
        "Gestion tanks et volumes",
        "Rapports PDF professionnels",
        "Fuel Calculator gratuit",
        "1 utilisateur"
      ],
      notIncluded: [
        "Inspection Report",
        "OnHire App"
      ],
      popular: true,
      cta: "Commencer Draft Survey",
      color: "purple",
      badge: "Premier Choix"
    },
    {
      id: "onhire-annual",
      name: "OnHire App",
      description: "Gestion des expertises maritimes",
      price: 90,
      period: "an",
      savings: 18,
      features: [
        "Expertises OnHire/OffHire illimitées",
        "Gestion des réservoirs",
        "Calcul automatique des volumes",
        "Génération de rapports PDF",
        "Support par email",
        "Fuel Calculator gratuit",
        "1 utilisateur"
      ],
      notIncluded: [
        "Inspection Report",
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
      price: 90,
      period: "an",
      savings: 18,
      features: [
        "Rapports photo illimités",
        "Modèles personnalisables",
        "Signature numérique",
        "Export PDF professionnel",
        "Stockage cloud 10Go",
        "Fuel Calculator gratuit",
        "1 utilisateur"
      ],
      notIncluded: [
        "OnHire App",
        "API Access"
      ],
      popular: false,
      cta: "Commencer avec Inspection",
      color: "emerald"
    },
    {
      id: "pack-annual",
      name: "Pack Complet",
      description: "Tous les modules + Draft Survey",
      price: 1071,
      period: "an",
      savings: 250,
      features: [
        "Draft Survey Pro",
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
      popular: false,
      cta: "Commencer le Pack",
      color: "amber",
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

