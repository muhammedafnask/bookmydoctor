import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const geminiService = {
  async askMedicalExpert(query: string, language: 'EN' | 'HI' = 'EN') {
    const systemInstruction = `You are a highly knowledgeable medical expert assistant for the "BookMyDoctor" platform. 
    Your goal is to provide helpful, accurate, and empathetic medical information. 
    ALWAYS include a disclaimer that this is not a substitute for professional medical advice.
    Keep responses concise and easy to understand.
    Respond in ${language === 'EN' ? 'English' : 'Hindi'}.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: query,
        config: {
          systemInstruction,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return language === 'EN' 
        ? "I'm sorry, I'm having trouble connecting to my medical database. Please try again later."
        : "क्षमा करें, मुझे अपने मेडिकल डेटाबेस से जुड़ने में समस्या हो रही है। कृपया बाद में पुनः प्रयास करें।";
    }
  },

  async checkSymptoms(symptoms: string) {
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        analysis: { type: Type.STRING, description: "Brief analysis of symptoms" },
        recommendedSpecialty: { type: Type.STRING, description: "The medical specialty the user should consult" },
        urgency: { type: Type.STRING, enum: ["Low", "Medium", "High", "Emergency"], description: "How urgent the consultation is" },
        disclaimer: { type: Type.STRING, description: "Medical disclaimer" }
      },
      required: ["analysis", "recommendedSpecialty", "urgency", "disclaimer"]
    };

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze these symptoms: ${symptoms}. Recommend a medical specialty from this list: General Physician, Dentist, Cardiologist, Dermatologist, Neurologist, Orthopedist, Psychologist, Gynecologist, ENT, Ophthalmologist.`,
        config: {
          responseMimeType: "application/json",
          responseSchema,
        },
      });
      const text = response.text;
      return text ? JSON.parse(text) : null;
    } catch (error) {
      console.error("Symptom Check Error:", error);
      return null;
    }
  },

  async generateHealthArticle(topic: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Write a short, engaging health article about: ${topic}. Include a title, 3 key tips, and a brief conclusion.`,
      });
      return response.text;
    } catch (error) {
      console.error("Article Generation Error:", error);
      return null;
    }
  },

  async generateDoctorImage(specialty: string, gender: 'male' | 'female' = 'male') {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `A professional portrait of a ${gender} ${specialty} doctor in a clean clinical setting, high quality, realistic.` }],
        },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });
      
      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      return null;
    } catch (error) {
      console.error("Image Generation Error:", error);
      return null;
    }
  },

  async searchLatestMedicalNews(query: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Find the latest medical news and breakthroughs related to: ${query}. Provide a summary and list the sources.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      
      const text = response.text || "";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => ({
        title: chunk.web?.title || "Source",
        uri: chunk.web?.uri || "#"
      })) || [];

      return { text, sources };
    } catch (error) {
      console.error("Search Grounding Error:", error);
      return null;
    }
  }
};
