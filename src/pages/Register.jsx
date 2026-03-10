import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../firebase';
import { addUser } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ship, User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

const registerSchema = z.object({
  username: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
  email: z.string().min(1, "L'email est requis").email("Format d'email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const Register = () => {
    const navigate = useNavigate();
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
                createdAt: new Date().toISOString()
            });

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError("root", { message: err.message });
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
                photoURL: user.photoURL
            });

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError("root", { message: err.message });
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-20">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold text-white">
                        <Ship className="w-10 h-10 text-blue-400" />
                        <span>OnHireApp</span>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Créer un compte</h1>
                        <p className="text-blue-200/70">Commencez votre essai gratuit</p>
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
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-blue-200/60 text-sm">ou</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {errors.root && (
                            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                                {errors.root.message}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">Nom d'utilisateur</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                                <input
                                    type="text"
                                    placeholder="johndoe"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-all duration-200 ${
                                        errors.username ? 'border-red-500' : 'border-white/20'
                                    }`}
                                    {...register("username")}
                                />
                            </div>
                            {errors.username && (
                                <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                                <input
                                    type="email"
                                    placeholder="vous@email.com"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-all duration-200 ${
                                        errors.email ? 'border-red-500' : 'border-white/20'
                                    }`}
                                    {...register("email")}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-all duration-200 ${
                                        errors.password ? 'border-red-500' : 'border-white/20'
                                    }`}
                                    {...register("password")}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
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

                    <p className="text-center mt-6 text-blue-200/70">
                        Déjà un compte?{" "}
                        <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                            Se connecter
                        </Link>
                    </p>

                    <p className="text-center mt-4 text-xs text-blue-300/50">
                        En vous inscrivant, vous acceptez nos{" "}
                        <a href="#" className="underline hover:text-blue-300">Conditions d'utilisation</a>
                        {" "}et notre{" "}
                        <a href="#" className="underline hover:text-blue-300">Politique de confidentialité</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

