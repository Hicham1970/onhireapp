import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        // Convertir l'objet Firebase en tableau
        const usersList = Object.keys(data || {}).map(key => ({
          _id: key,
          ...data[key]
        }));
        setUsers(usersList);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="mt-20 text-center">Chargement des utilisateurs...</div>;

  return (
    <div className="space-y-3 grid mt-20 px-10 max-w-2xl mx-auto">
      {users.map((user) => {
        return (
          <Link
            to={`/users/${user.username}`}
            key={user._id}
            className="flex flex-col gap-2 p-4 border rounded hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-lg">{user.username}</h3>
            <p className="text-gray-600">{user.email}</p>
          </Link>
        );
      })}
      {error && <p className="text-red-500 text-center">Une erreur est survenue lors du chargement.</p>}
    </div>
  );
}

export default Users;
