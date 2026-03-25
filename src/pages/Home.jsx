import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AuthContext"; 

// Import home components
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Pricing from "../components/home/Pricing";
import Testimonials from "../components/home/Testimonials";
import ContactForm from "../components/home/ContactForm_en";
import Footer from "../components/home/Footer_en";

const Home = () => {
  const { currentUser } = useAuth();

// If user is logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Helmet>
        <title>MarineSurveyorDev - Home | On-Hire Maritime Surveys</title>
        <meta name="description" content="MarineSurveyorDev: Professional platform for on-hire vessel surveys, inspections, reports, and maritime fleet management. Secure, efficient, compliant." />
        <meta property="og:title" content="MarineSurveyorDev - Home | On-Hire Maritime Surveys" />
        <meta property="og:description" content="Professional platform for on-hire vessel surveys, inspections, and reports." />
        <meta name="twitter:title" content="MarineSurveyorDev - Home | On-Hire Maritime Surveys" />
        <meta name="twitter:description" content="Professional platform for on-hire vessel surveys." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "MarineSurveyorDev",
            "description": "Professional on-hire survey platform for maritime vessel inspections and reports.",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "provider": {
              "@type": "Organization",
              "name": "MarineSurveyorDev",
              "url": "https://marinesurveyordev.com"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-white dark:bg-slate-900">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <Features />
        
        {/* Pricing Section */}
        <Pricing />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Contact Section */}
        <ContactForm />
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;

