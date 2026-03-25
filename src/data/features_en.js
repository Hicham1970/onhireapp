// Features Data - English Version

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
    subtitle: "Draft Water Calculations",
    description: "Perform draft surveys according to SGS standards. Automatic trim corrections, hydrostatic interpolation, and professional PDF reports.",
    icon: Anchor,
    color: "blue",
    benefits: [
      "Automatic SGS corrections",
      "Hydrostatic interpolation",
      "Professional PDF reports",
      "Precise final cargo calculation"
    ],
    stats: {
      value: "±0.1%",
      label: "Calculation accuracy"
    }
  },
  {
    id: 2,
    title: "On/OffHire App",
    subtitle: "Maritime Survey Management",
    description: "Simplify OnHire, OffHire, and Bunker surveys with an intuitive interface. Manage soundings, volume calculations, and generate professional reports in just a few clicks.",
    icon: ClipboardList,
    color: "emerald",
    benefits: [
      "Quick survey creation",
      "Automatic volume calculations",
      "Multi-vessel management",
      "Complete history"
    ],
    stats: {
      value: "< 5 min",
      label: "Average survey time"
    }
  },
  {
    id: 3,
    title: "Inspection Report",
    subtitle: "Photo Inspection Reports",
    description: "Document every inspection with high-resolution photos. Create professional inspection reports with digital signatures and PDF export.",
    icon: Camera,
    color: "amber",
    benefits: [
      "Unlimited photos",
      "Customizable templates",
      "Digital signatures",
      "Instant sharing"
    ],
    stats: {
      value: "100%",
      label: "IACS standards compliant"
    }
  }
];

export const additionalFeatures = [
  {
    icon: FileText,
    title: "PDF Generation",
    description: "Professional PDF reports ready for download"
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Your data secure and accessible anywhere"
  },
  {
    icon: Users,
    title: "Multi-User",
    description: "Team collaboration with defined roles"
  },
  {
    icon: TrendingUp,
    title: "Analytics",
    description: "Dashboards to track your performance"
  },
  {
    icon: Zap,
    title: "Fast & Efficient",
    description: "Optimized interface to save time"
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "Available on all your devices"
  }
];

export const processSteps = [
  {
    step: 1,
    title: "Sign Up",
    description: "Create your account in 30 seconds"
  },
  {
    step: 2,
    title: "Setup",
    description: "Draft Survey or Bunker survey?"
  },
  {
    step: 3,
    title: "Start",
    description: "Begin creating your surveys"
  },
  {
    step: 4,
    title: "Reports",
    description: "Generate your professional PDFs"
  }
];
