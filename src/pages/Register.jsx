import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../firebase';
import { addUser } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "../context/ThemeContext";
import { Ship, User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

// Map Firebase auth errors to user-friendly messages
const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return "User already exists. Please sign in";
    case 'auth/weak-password':
      return "Password is too weak";
    case 'auth/invalid-email':
      return "Invalid email address";
    case 'auth/operation-not-allowed':
      return "Operation not allowed";
    case 'auth/phone-number-already-exists':
      return "Phone number already exists";
    default:
      return "Something went wrong. Please try again.";
  }
};

const registerSchema = z.object({
  username: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
  email: z.string().min(1, "L'email est requis").email("Format d'email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const Register = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            await addUser(user.uid, {
                username: data.username,
                email: data.email,
                createdAt: new Date().toISOString(),
                role: 'user' // Default role for new users
            });

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            const errorMessage = getAuthErrorMessage(err.code);
            setError("root", { message: errorMessage });
        }
    };

    const handleGoogleRegister = async () => {
        try {
            setIsGoogleLoading(true);
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if user already exists in database, if not create
            await addUser(user.uid, {
                username: user.displayName || "User",
                email: user.email,
                createdAt: new Date().toISOString(),
                photoURL: user.photoURL,
                role: 'user' // Default role for new users
            });

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            const errorMessage = getAuthErrorMessage(err.code);
            setError("root", { message: errorMessage });
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 py-20 ${
            isDark 
                ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
                : 'bg-gradient-to-br from-blue-50 via-white to-slate-100'
        }`}>
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className={`inline-flex items-center gap-2 text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        <Ship className={`w-10 h-10 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span>OnHireApp</span>
                    </Link>
                </div>

                {/* Card */}
                <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 ${
                    isDark 
                        ? 'bg-white/10 border border-white/20'
                        : 'bg-white/80 border border-slate-200'
                }`}>
                    <div className="text-center mb-8">
                        <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Créer un compte</h1>
                        <p className={isDark ? 'text-blue-200/70' : 'text-slate-600'}>Commencez votre essai gratuit</p>
                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        onClick={handleGoogleRegister}
                        disabled={isGoogleLoading}
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-800 font-medium py-3 px-4 rounded-xl transition-all duration-300 mb-6 disabled:opacity-50"
                    >
                        {isGoogleLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                        )}
                        {isGoogleLoading ? "Inscription..." : "S'inscrire avec Google"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`flex-1 h-px ${isDark ? 'bg-white/20' : 'bg-slate-200'}`}></div>
                        <span className={isDark ? 'text-blue-200/60 text-sm' : 'text-slate-500 text-sm'}>ou</span>
                        <div className={`flex-1 h-px ${isDark ? 'bg-white/20' : 'bg-slate-200'}`}></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {errors.root && (
                            <div className={`p-3 rounded-lg text-sm ${
                                isDark 
                                    ? 'bg-red-500/20 border border-red-500/50 text-red-300'
                                    : 'bg-red-50 border border-red-200 text-red-600'
                            }`}>
                                {errors.root.message}
                            </div>
                        )}

                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-blue-200' : 'text-slate-700'}`}>Nom d'utilisateur</label>
                            <div className="relative">
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-blue-300' : 'text-slate-400'}`} />
                                <input
                                    type="text"
                                    placeholder="johndoe"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-400 transition-all duration-200 ${
                                        isDark 
                                            ? 'bg-white/10 text-white placeholder-blue-300/50 border-white/20'
                                            : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-200'
                                    } ${errors.username ? 'border-red-500' : ''}`}
                                    {...register("username")}
                                />
                            </div>
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                            )}
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-blue-200' : 'text-slate-700'}`}>Email</label>
                            <div className="relative">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-blue-300' : 'text-slate-400'}`} />
                                <input
                                    type="email"
                                    placeholder="vous@email.com"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-400 transition-all duration-200 ${
                                        isDark 
                                            ? 'bg-white/10 text-white placeholder-blue-300/50 border-white/20'
                                            : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-200'
                                    } ${errors.email ? 'border-red-500' : ''}`}
                                    {...register("email")}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-blue-200' : 'text-slate-700'}`}>Mot de passe</label>
                            <div className="relative">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-blue-300' : 'text-slate-400'}`} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-400 transition-all duration-200 ${
                                        isDark 
                                            ? 'bg-white/10 text-white placeholder-blue-300/50 border-white/20'
                                            : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-200'
                                    } ${errors.password ? 'border-red-500' : ''}`}
                                    {...register("password")}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Inscription...
                                </>
                            ) : (
                                <>
                                    Créer mon compte
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className={`text-center mt-6 ${isDark ? 'text-blue-200/70' : 'text-slate-600'}`}>
                        Déjà un compte?{" "}
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                            Se connecter
                        </Link>
                    </p>

                    <p className={`text-center mt-4 text-xs ${isDark ? 'text-blue-300/50' : 'text-slate-500'}`}>
                        En vous inscrivant, vous acceptez nos{" "}
                        <a href="#" className="underline hover:text-blue-600">Conditions d'utilisation</a>
                        {" "}et notre{" "}
                        <a href="#" className="underline hover:text-blue-600">Politique de confidentialité</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

