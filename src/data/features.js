// Données des fonctionnalités

import { 
  ClipboardList, 
  Camera, 
  Gauge, 
  FileText, 
  Shield, 
  Cloud, 
  Users, 
  TrendingUp,
  Zap,
  Globe,
  Smartphone,
  BarChart3
} from 'lucide-react';

export const features = [
  {
    id: 1,
    title: "OnHire App",
    subtitle: "Gestion des Expertises Maritimes",
    description: "Simplifiez vos expertises OnHire, OffHire et Bunker avec une interface intuitive. Gérez les soundings, les calculs de volumes et générez des rapports professionnels en quelques clics.",
    icon: ClipboardList,
    color: "blue",
    benefits: [
      "Création rapide d'expertises",
      "Calcul automatique des volumes",
      "Gestion multi-navires",
      "Historique complet"
    ],
    stats: {
      value: "< 5 min",
      label: "Temps moyen par expertise"
    }
  },
  {
    id: 2,
    title: "Inspection Report",
    subtitle: "Rapports d'Inspection Photos",
    description: "Documentz chaque inspection avec des photos haute résolution. Créez des rapports d'inspection professionnels avec signatures numériques et export PDF.",
    icon: Camera,
    color: "emerald",
    benefits: [
      "Photos illimitées",
      "Modèles personnalisables",
      "Signature numérique",
      "Partage instantané"
    ],
    stats: {
      value: "100%",
      label: "Conforme aux standards IACS"
    }
  },
  {
    id: 3,
    title: "Fuel Calculator",
    subtitle: "Calculateur de Carburant Avancé",
    description: "Calculez avec précision le volume de carburant en utilisant les tables ASTM. Gérez les différents types de fuel (HFO, MGO, VLSFO) et exportez vos calculs.",
    icon: Gauge,
    color: "amber",
    benefits: [
      "Précision ASTM",
      "Tous types de carburant",
      "Historique des calculs",
      "Export Excel/CSV"
    ],
    stats: {
      value: "99.9%",
      label: "Précision des calculs"
    }
  }
];

export const additionalFeatures = [
  {
    icon: FileText,
    title: "Génération PDF",
    description: "Rapports professionnels en format PDF téléchargeables"
  },
  {
    icon: Cloud,
    title: "Stockage Cloud",
    description: "Vos données sécurisées et accessibles partout"
  },
  {
    icon: Users,
    title: "Multi-utilisateurs",
    description: "Collaboration en équipe avec rôles définis"
  },
  {
    icon: TrendingUp,
    title: "Analytique",
    description: "Tableaux de bord pour suivre vos performances"
  },
  {
    icon: Zap,
    title: "Rapide & Efficace",
    description: "Interface optimisée pour gagner du temps"
  },
  {
    icon: Globe,
    title: "Accessibilité",
    description: "Disponible sur tous vos appareils"
  }
];

export const processSteps = [
  {
    step: 1,
    title: "Inscription",
    description: "Créez votre compte en 30 secondes"
  },
  {
    step: 2,
    title: "Configuration",
    description: "Ajoutez vos navires et paramètres"
  },
  {
    step: 3,
    title: "Utilisation",
    description: "Commencez à créer vos expertises"
  },
  {
    step: 4,
    title: "Rapports",
    description: "Générez vos PDF professionnels"
  }
];

