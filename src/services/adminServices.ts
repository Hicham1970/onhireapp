import { ref, get } from "firebase/database";
import { database } from "../firebase";

export const getAllDraftSurveys = async () => {
  try {
    const snapshot = await get(ref(database, 'draftSurveys'));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const allSurveys = [];
      for (const userId in data) {
        for (const surveyId in data[userId]) {
          allSurveys.push({
            userId,
            surveyId,
            ...data[userId][surveyId]
          });
        }
      }
      return allSurveys.sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime());
    }
    return [];
  } catch (error) {
    console.error("Error fetching all draft surveys:", error);
    throw error;
  }
};
