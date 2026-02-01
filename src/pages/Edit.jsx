import React, { useState } from "react";
import { useAlert } from "../hooks/Hooks";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../api/api";
import { useNavigate } from "react-router-dom";

function Edit() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const { dispatchAlert } = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Mise à jour via Firebase
      const updates = {};
      if (formData.username) updates.username = formData.username;
      // Note: La mise à jour du mot de passe Firebase nécessite une autre méthode (updatePassword), 
      // ici on met à jour les données DB uniquement pour l'exemple.
      
      await updateUser(currentUser.uid, updates);

      dispatchAlert({
        type: "SHOW",
        payload: "Profil mis à jour avec succès",
        variant: "Success",
      });
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      dispatchAlert({
        type: "SHOW",
        payload: "Erreur lors de la mise à jour",
        variant: "Danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="flex justify-center mx-auto mt-20 p-10 max-w-2xl">
      <div>
        <h2 className="font-semibold text-xl mt-5">Edit your details</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="block mb-2 mt-4">
            Username{" "}
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="p-2 border rounded-md block"
            placeholder="Enter new username"
            onChange={handleChange}
          />
          <label htmlFor="password" className="block mb-2 mt-4">
            Password{" "}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="p-2 border rounded-md block mb-4"
            placeholder="Enter new password"
            onChange={handleChange}
          />
          <button
            className=" right-10 bg-red-700 text-white font-medium text-lg px-5 h-10 w-28 rounded-3xl"
            type="submit"
          >
            {isLoading ? "Saving" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
