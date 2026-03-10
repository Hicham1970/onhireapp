import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Import home components
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Pricing from "../components/home/Pricing";
import Testimonials from "../components/home/Testimonials";
import ContactForm from "../components/home/ContactForm";
import Footer from "../components/home/Footer";

const Home = () => {
  const { currentUser } = useAuth();

  // Si l'utilisateur est connecté, on le redirige vers le tableau de bord.
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
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
  );
};

export default Home;

