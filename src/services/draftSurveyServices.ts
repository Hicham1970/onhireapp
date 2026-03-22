import { ref, get, set, push, remove } from "firebase/database";
import { database } from "../firebase";
import { DraftSurvey } from "../types/draftSurvey";

export const saveDraftSurvey = async (userId: string, surveyData: DraftSurvey) => {
    if (!userId) throw new Error("User ID is required");
    try {
        if (surveyData.id) {
            await set(ref(database, `draftSurveys/${userId}/${surveyData.id}`), {
                ...surveyData,
                updatedAt: new Date().toISOString()
            });
            return { success: true, id: surveyData.id };
        } else {
            const surveyRef = ref(database, `draftSurveys/${userId}`);
            const newSurveyRef = push(surveyRef);
            const id = newSurveyRef.key;
            await set(newSurveyRef, {
                ...surveyData,
                id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            return { success: true, id };
        }
    } catch (error) {
        console.error("Error saving draft survey:", error);
        throw error;
    }
};

export const getDraftSurveys = async (userId: string): Promise<DraftSurvey[]> => {
    if (!userId) throw new Error("User ID is required");
    try {
        const snapshot = await get(ref(database, `draftSurveys/${userId}`));
        if (snapshot.exists()) {
            const data = snapshot.val();
            return Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })).reverse();
        }
        return [];
    } catch (error) {
        console.error("Error fetching draft surveys:", error);
        throw error;
    }
};

export const getDraftSurveyById = async (userId: string, surveyId: string): Promise<DraftSurvey | null> => {
    try {
        const snapshot = await get(ref(database, `draftSurveys/${userId}/${surveyId}`));
        if (snapshot.exists()) {
            return { id: surveyId, ...snapshot.val() };
        }
        return null;
    } catch (error) {
        console.error("Error fetching draft survey:", error);
        throw error;
    }
};

export const deleteDraftSurvey = async (userId: string, surveyId: string) => {
    try {
        await remove(ref(database, `draftSurveys/${userId}/${surveyId}`));
        return { success: true };
    } catch (error) {
        console.error("Error deleting draft survey:", error);
        throw error;
    }
};

export const getAllDraftSurveys = async (): Promise<any[]> => {
    try {
        const snapshot = await get(ref(database, "draftSurveys"));
        if (snapshot.exists()) {
            const data = snapshot.val();
            const allDrafts: any[] = [];
            Object.keys(data).forEach(userId => {
                const userDrafts = data[userId];
                Object.keys(userDrafts).forEach(draftId => {
                    allDrafts.push({
                        id: draftId,
                        userId,
                        ...userDrafts[draftId]
                    });
                });
            });
            return allDrafts.sort((a, b) => new Date(b.updatedAt || b.createdAt || 0).getTime() - new Date(a.updatedAt || a.createdAt || 0).getTime());
        }
        return [];
    } catch (error) {
        console.error("Error fetching all draft surveys (likely permission issue):", error);
        return [];
    }
};
