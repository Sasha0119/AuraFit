import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "" 
});

export const geminiService = {
  async getWorkoutPlan(userGoals: string, level: string, gender: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a 3-day workout plan for a ${gender} focusing on ${userGoals}, skill level ${level}. 
        Return a JSON object with a 'plan' array, where each entry is a 'day' with 'title' and 'exercises' (array of { name, sets, reps, duration, intensity }).`,
        config: {
          systemInstruction: "You are an expert AI Fitness Coach. Provide structured workout recommendations in JSON format.",
          responseMimeType: "application/json"
        }
      });

      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini Error:", error);
      return null;
    }
  },

  async getNutritionAdvice(calories: number, goal: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide 3 quick meal ideas for a daily goal of ${calories} kcal with the objective of ${goal}. 
        Include macronutrient breakdown (Protein, Carbs, Fats) for each. Format as JSON with a 'meals' array.`,
        config: {
          systemInstruction: "You are a specialized sports nutritionist.",
          responseMimeType: "application/json"
        }
      });

      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini Error:", error);
      return null;
    }
  }
};
