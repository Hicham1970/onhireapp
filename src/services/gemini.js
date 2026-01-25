import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialisation avec la clé API définie dans le fichier .env
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.error("⚠️ ERREUR CRITIQUE : La clé API 'VITE_API_KEY' est introuvable. Vérifiez votre fichier .env et redémarrez le serveur.");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export async function getMaritimeAssistantResponse(prompt) {
  if (!genAI) return "Configuration manquante : Clé API non trouvée. Vérifiez la console (F12) pour plus de détails.";

  try {
    // Utilisation du modèle Gemini (Flash est rapide et efficace)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Contexte amélioré pour inclure des exemples de calculs
    const maritimeContext = `
      Tu es un expert consultant maritime senior spécialisé dans les opérations de navires, 
      les calculs de soutes (bunker surveys), les tables ASTM (54B, 56, etc.) et les clauses BIMCO.
      
      Tes objectifs :
      1. Répondre de manière technique, précise et concise.
      2. SI la question porte sur un calcul (ex: VCF, densité, conversion), TU DOIS FOURNIR UN EXEMPLE DE CALCUL DÉTAILLÉ étape par étape avec des valeurs fictives réalistes si aucune n'est fournie.
      3. Utilise le formatage Markdown (gras, listes) pour rendre la réponse lisible.
      4. Cite les standards pertinents (ISO 8217, MARPOL, etc.) si applicable.

      Question de l'utilisateur : 
    `;
    
    const result = await model.generateContent(maritimeContext + prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return "Désolé, le service d'IA est indisponible pour le moment. Vérifiez votre connexion ou votre clé API.";
  }
}