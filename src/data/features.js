// Données des fonctionnalités

import { 
  ClipboardList, 
  Camera, 
  FileText, 
  Shield, 
  Cloud, 
  Users, 
  TrendingUp,
  Zap,
  Globe,
  Smartphone,
  BarChart3,
  Ship,
  Anchor
} from 'lucide-react';

export const features = [
  {
    id: 1,
    title: "Draft Survey",
    subtitle: "Expertise de Tirant d'Eau",
    description: "Effectuez vos expertises de tirant d'eau selon les standards SGS. Calcul automatique des corrections de trim, interpolation hydrostatique, et rapport professionnel PDF.",
    icon: Anchor,
    color: "blue",
    benefits: [
      "Corrections automatiques SGS",
      "Interpolation hydrostatique",
      "Rapport PDF professionnel",
      "Calcul cargo final précis"
    ],
    stats: {
      value: "±0.1%",
      label: "Précision des calculs"
    }
  },
  {
    id: 2,
    title: "On/OffHire App",
    subtitle: "Gestion des Expertises Maritimes",
    description: "Simplifiez vos expertises OnHire, OffHire et Bunker avec une interface intuitive. Gérez les soundings, les calculs de volumes et générez des rapports professionnels en quelques clics.",
    icon: ClipboardList,
    color: "emerald",
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
    id: 3,
    title: "Inspection Report",
    subtitle: "Rapports d'Inspection Photos",
    description: "Documentez chaque inspection avec des photos haute résolution. Créez des rapports d'inspection professionnels avec signatures numériques et export PDF.",
    icon: Camera,
    color: "amber",
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

