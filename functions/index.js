const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const { Resend } = require("resend");

admin.initializeApp();

// Clé API codée en dur comme demandé
const resend = new Resend("re_Wmwm1Eyr_BrEJWmNmemx5heFXV49ykpYn");

exports.envoyerEmailContact = functions.database.ref("/messages/{messageId}")
  .onCreate(async (snapshot, context) => {
    // Initialisation ici pour s'assurer que process.env est bien accessible lors de l'exécution
    const messageData = snapshot.val();

    if (!messageData) return null;

    try {
      const data = await resend.emails.send({
        from: "OnhireApp <onboarding@resend.dev>", 
        to: "h.garoum@gmail.com", 
        subject: `Nouveau message de contact : ${messageData.interest || "Contact"}`,
        html: `
          <h2>Nouveau message depuis la page OnHireApp</h2>
          <p><strong>Nom :</strong> ${messageData.name}</p>
          <p><strong>Email :</strong> ${messageData.email}</p>
          <p><strong>Entreprise :</strong> ${messageData.company}</p>
          <p><strong>Téléphone :</strong> ${messageData.phone || "Non renseigné"}</p>
          <hr />
          <p><strong>Message :</strong><br/> ${messageData.message}</p>
        `,
      });

      console.log("Email envoyé avec succès !", data);
      return { success: true, data };
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      return { success: false, error };
    }
});
