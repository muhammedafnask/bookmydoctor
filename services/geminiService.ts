import { GoogleGenAI, Type } from "@google/genai";


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const geminiService = {
  async askMedicalExpert(query: string, language: 'EN' | 'HI' = 'EN') {
    const systemInstruction = `You are "HealthBuddy", a highly knowledgeable and empathetic medical assistant for the "BookMyDoctor" platform. 
    Your goal is to provide helpful, accurate, and empathetic medical information. 
    
    GUIDELINES:
    1. ALWAYS include a clear disclaimer that this is not a substitute for professional medical advice.
    2. Keep responses concise, structured (using markdown), and easy to understand.
    3. If the user describes symptoms, suggest a possible medical specialty they should consult.
    4. Provide 2-3 short, relevant follow-up questions at the end of your response, prefixed with "SUGGESTED_QUESTIONS:".
    5. Respond in ${language === 'EN' ? 'English' : 'Hindi'}.`;

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

  async chatWithHealthBuddy(message: string, history: { role: 'user' | 'model', parts: { text?: string, inlineData?: { data: string, mimeType: string } }[] }[], language: 'EN' | 'HI' = 'EN', imageData?: { data: string, mimeType: string }) {
    const systemInstruction = `You are "HealthBuddy", a highly knowledgeable and empathetic medical assistant for the "BookMyDoctor" platform. 
    
    CORE RESPONSIBILITIES:
    - Provide empathetic, accurate medical information.
    - Help users understand their symptoms (including analyzing images if provided).
    - Suggest appropriate medical specialties.
    - Answer general health and wellness questions.
    
    STRICT RULES:
    1. DISCLAIMER: Every response MUST start or end with a clear medical disclaimer.
    2. STRUCTURE: Use Markdown for readability (bolding, lists, headers).
    3. SPECIALTY SUGGESTION: If a user mentions symptoms, explicitly name a specialty from: General Physician, Dentist, Cardiologist, Dermatologist, Neurologist, Orthopedist, Psychologist, Gynecologist, ENT, Ophthalmologist.
    4. FOLLOW-UPS: At the very end of your response, provide exactly 3 short follow-up questions the user might want to ask next. Format them as:
       [FOLLOW_UP_START]
       - Question 1?
       - Question 2?
       - Question 3?
       [FOLLOW_UP_END]
    5. LANGUAGE: Respond ONLY in ${language === 'EN' ? 'English' : 'Hindi'}.
    6. TONE: Professional, supportive, and clear.
    7. IMAGE ANALYSIS: If an image is provided, analyze it carefully for medical signs (rashes, swelling, etc.) but always remind the user that a physical exam is necessary.`;

    try {
      const userParts: { text?: string, inlineData?: { data: string, mimeType: string } }[] = [{ text: message }];
      if (imageData) {
        userParts.push({
          inlineData: {
            data: imageData.data,
            mimeType: imageData.mimeType
          }
        });
      }

      const contents = [
        ...history,
        { role: 'user', parts: userParts }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents,
        config: {
          systemInstruction,
        },
      });

      return response.text;
    } catch (error) {
      console.error("Chat Error:", error);
      return null;
    }
  },

  async textToSpeech(text: string, language: 'EN' | 'HI' = 'EN') {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say clearly in ${language === 'EN' ? 'English' : 'Hindi'}: ${text}` }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: language === 'EN' ? 'Kore' : 'Fenrir' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        return base64Audio;
      }
      return null;
    } catch (error) {
      console.error("TTS Error:", error);
      return null;
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
