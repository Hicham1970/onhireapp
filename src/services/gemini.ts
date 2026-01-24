
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

export const getMaritimeAssistantResponse = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: "You are a maritime technical consultant specialized in ship onhire/offhire surveys and fuel calculations (ASTM Table 54B/56). Provide precise, professional advice on density corrections, temperature impacts on HFO/MGO, and chartering terms (BIMCO). Keep responses concise and formatted with markdown."
        });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I'm sorry, I'm having trouble connecting to the maritime knowledge base right now.";
    }
};

export const analyzeCharterTerms = async (text) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(`Analyze these charter terms and summarize the bunkering/fuel clauses (prices, delivery quantities, redelivery rules): \n\n ${text}`);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Analysis Error:", error);
        return null;
    }
};
