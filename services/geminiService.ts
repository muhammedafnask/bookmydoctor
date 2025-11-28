import { GoogleGenAI, Type } from "@google/genai";
import { AISymptomResponse } from "../types";

// Always initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const analyzeSymptoms = async (symptoms: string): Promise<AISymptomResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User symptoms: ${symptoms}. Suggest the most appropriate medical specialty from this list: [General Physician, Dentist, Cardiologist, Dermatologist, Neurologist, Orthopedist]. If none fit perfectly, choose General Physician. Also determine if this sounds like an emergency.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedSpecialty: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            isEmergency: { type: Type.BOOLEAN }
          },
          required: ["suggestedSpecialty", "reasoning", "isEmergency"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AISymptomResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      suggestedSpecialty: "General Physician",
      reasoning: "We encountered an issue analyzing your symptoms. It is always safe to see a General Physician first.",
      isEmergency: false
    };
  }
};