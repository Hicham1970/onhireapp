// SaaS Pricing Data - English Version

export const pricingPlans = {
  monthly: [
    {
      id: "draft-monthly",
      name: "Draft Survey",
      description: "Professional draft survey calculations",
      price: 9,
      period: "month",
      features: [
        "Unlimited draft readings",
        "Precise hydrostatic calculations",
        "Automatic deductibles",
        "Tank and volume management",
        "Professional PDF reports",
        "Free Fuel Calculator",
        "1 user"
      ],
      notIncluded: [
        "Inspection Report",
        "OnHire App"
      ],
      popular: true,
      cta: "Start Draft Survey",
      color: "purple",
      badge: "Top Choice"
    },
    {
      id: "onhire-monthly",
      name: "OnHire App",
      description: "Maritime survey management",
      price: 7,
      period: "month",
      features: [
        "Unlimited OnHire/OffHire surveys",
        "Tank management",
        "Automatic volume calculations",
        "PDF report generation",
        "Email support",
        "Free Fuel Calculator",
        "1 user"
      ],
      notIncluded: [
        "Inspection Report",
        "API Access"
      ],
      popular: false,
      cta: "Start with OnHire",
      color: "blue"
    },
    {
      id: "inspection-monthly",
      name: "Inspection Report",
      description: "Photo inspection reports",
      price: 9,
      period: "month",
      features: [
        "Unlimited photo reports",
        "Customizable templates",
        "Digital signatures",
        "Professional PDF export",
        "10GB cloud storage",
        "Free Fuel Calculator",
        "1 user"
      ],
      notIncluded: [
        "OnHire App",
        "API Access"
      ],
      popular: false,
      cta: "Start Inspection",
      color: "emerald"
    },
    {
      id: "pack-monthly",
      name: "Complete Pack",
      description: "All modules + Draft Survey",
      price: 30,
      period: "month",
      features: [
        "Draft Survey Pro",
        "Full OnHire App",
        "Inspection Report Pro",
        "Advanced Fuel Calculator",
        "API Access",
        "50GB cloud storage",
        "Priority support",
        "5 users",
        "Included training"
      ],
      notIncluded: [],
      popular: false,
      cta: "Start Complete Pack",
      color: "amber"
    }
  ],
  annual: [
    {
      id: "draft-annual",
      name: "Draft Survey",
      description: "Professional draft survey calculations",
      price: 70,
      period: "year",
      savings: 28,
      features: [
        "Unlimited draft readings",
        "Precise hydrostatic calculations",
        "Automatic deductibles",
        "Tank and volume management",
        "Professional PDF reports",
        "Free Fuel Calculator",
        "1 user"
      ],
      notIncluded: [
        "Inspection Report",
        "OnHire App"
      ],
      popular: true,
      cta: "Start Draft Survey",
      color: "purple",
      badge: "Top Choice"
    },
    {
      id: "onhire-annual",
      name: "OnHire App",
      description: "Maritime survey management",
      price: 90,
      period: "year",
      savings: 18,
      features: [
        "Unlimited OnHire/OffHire surveys",
        "Tank management",
        "Automatic volume calculations",
        "PDF report generation",
        "Email support",
        "Free Fuel Calculator",
        "1 user"
      ],
      notIncluded: [
        "Inspection Report",
        "API Access"
      ],
      popular: false,
      cta: "Start with OnHire",
      color: "blue"
    },
    {
      id: "inspection-annual",
      name: "Inspection Report",
      description: "Photo inspection reports",
      price: 90,
      period: "year",
      savings: 18,
      features: [
        "Unlimited photo reports",
        "Customizable templates",
        "Digital signatures",
        "Professional PDF export",
        "10GB cloud storage",
        "Free Fuel Calculator",
        "1 user"
      ],
      notIncluded: [
        "OnHire App",
        "API Access"
      ],
      popular: false,
      cta: "Start Inspection",
      color: "emerald"
    },
    {
      id: "pack-annual",
      name: "Complete Pack",
      description: "All modules + Draft Survey",
      price: 1071,  // Note: Verify this price (seems high; original was 1071?)
      period: "year",
      savings: 250,
      features: [
        "Draft Survey Pro",
        "Full OnHire App",
        "Inspection Report Pro",
        "Advanced Fuel Calculator",
        "API Access",
        "50GB cloud storage",
        "Priority support",
        "5 users",
        "Included training"
      ],
      notIncluded: [],
      popular: false,
      cta: "Start Complete Pack",
      color: "amber",
      badge: "25% Savings"
    }
  ]
};

export const faqs = [
  {
    question: "Can I change plans anytime?",
    answer: "Yes, you can upgrade or downgrade your plan anytime. Changes take effect immediately and billing is prorated."
  },
  {
    question: "What's included in the free trial?",
    answer: "The 14-day free trial gives you full access to the Complete Pack. Test all features without limits during this period."
  },
  {
    question: "How does billing work?",
    answer: "Billing is monthly or annual based on your choice. We accept credit cards, bank transfers, and PayPal for businesses."
  },
  {
    question: "Do you offer training?",
    answer: "Yes, the Complete Pack includes 2 hours of online training. Additional training available on request for all plans."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use end-to-end encryption (AES-256), servers hosted in Europe, and are GDPR compliant."
  }
];
