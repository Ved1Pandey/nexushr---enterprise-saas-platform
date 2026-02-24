
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getHRAssistantResponse = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `You are an expert HR AI assistant for NexusHR, a corporate SaaS platform. 
        Help employees with queries about tax (India/Global), company policies (standard ones like 20 days leave, 40hr work week), 
        and professional conduct. Be concise and professional.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the HR mainframe. Please try again later.";
  }
};
