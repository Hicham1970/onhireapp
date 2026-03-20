import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
    Info, 
    Ship, 
    Anchor, 
    ChevronRight, 
    FileText, 
    Layers,
    Waves,
    Scale,
    Activity
} from 'lucide-react';

const DraftSurveySidebar = () => {
    const location = useLocation();

    const sections = [
        {
            title: 'Configuration',
            items: [
                { name: 'Général', path: '/draft-survey/infos', icon: Info },
                { name: 'Caractéristiques', path: '/draft-survey/caracteristiques', icon: Ship },
            ]
        },
        {
            title: 'Draft Initial',
            items: [
                { name: 'Lectures', path: '/draft-survey/initial/readings', icon: Anchor },
                { name: 'Corrections & MOM', path: '/draft-survey/initial/calculations', icon: Activity },
                { name: 'Hydrostatiques', path: '/draft-survey/initial/displacement', icon: Waves },
                { name: 'Déductibles', path: '/draft-survey/initial/deductibles', icon: Scale },
            ]
        },
        {
            title: 'Draft Final',
            items: [
                { name: 'Lectures', path: '/draft-survey/final/readings', icon: Anchor },
                { name: 'Corrections & MOM', path: '/draft-survey/final/calculations', icon: Activity },
                { name: 'Hydrostatiques', path: '/draft-survey/final/displacement', icon: Waves },
                { name: 'Déductibles', path: '/draft-survey/final/deductibles', icon: Scale },
            ]
        },
        {
            title: 'Finalisation',
            items: [
                { name: 'Récapitulatif', path: '/draft-survey/report', icon: FileText },
            ]
        }
    ];

    return (
        <aside className="w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto hidden lg:block">
            <div className="p-6 space-y-8">
                {sections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3">
                            {section.title}
                        </h3>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) => `
                                            flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group
                                            ${isActive 
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'} transition-colors`} />
                                            <span className="font-semibold text-sm">{item.name}</span>
                                        </div>
                                        {isActive && <ChevronRight className="w-4 h-4" />}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default DraftSurveySidebar;
