import React from 'react';
import { useUser } from '../hooks/Hooks';
import { Link, Navigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useUser();

    if (!user) {
        
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex justify-center mt-20 p-10">
            <div className="space-y-6 text-center bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold">Profil</h1>
                <p className="text-lg"><span className="font-semibold">Nom d'utilisateur :</span> {user.username}</p>
                <p className="text-lg"><span className="font-semibold">Email :</span> {user.email}</p>
                <Link to={`/users/${user.username}/edit`} className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">Modifier le profil</Link>
            </div>
        </div>
    );
};

export default Profile;