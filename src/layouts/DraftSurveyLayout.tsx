import React from 'react';
import { Outlet } from 'react-router-dom';
import DraftSurveySidebar from '../components/DraftSurveySidebar';

const DraftSurveyLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
            <div className="max-w-[1600px] mx-auto flex">
                <DraftSurveySidebar />
                <main className="flex-1 p-4 lg:p-8 min-h-[calc(100vh-5rem)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DraftSurveyLayout;
