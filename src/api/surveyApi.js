import { ref, push, set } from "firebase/database";
import { database } from "../firebase";


export const saveSurvey = async (userId, surveyData) => {
  try {
    const userSurveysRef = ref(database, `surveys/${userId}`);
    const newSurveyRef = push(userSurveysRef);
    
    await set(newSurveyRef, {
      ...surveyData,
      id: newSurveyRef.key,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return { success: true, surveyId: newSurveyRef.key };
  } catch (error) {
    throw new Error(`Save failed: ${error.message}`);
  }
};

export const getSurveysByUser = async (userId) => {
  // Implementation for getting user surveys
  // (reuse existing getSurveys or create new)
};

export default { saveSurvey };

