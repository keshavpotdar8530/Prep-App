
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateRoundTips(roundName: string, company: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 1-2 practical insider tips for an interview round called "${roundName}" at "${company}". Keep it brief and high-value for a student.`,
    });
    return response.text || "No specific tips found.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Stay calm and be yourself.";
  }
}

export async function summarizeExperience(experience: any): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following interview experience in 2 sentences for a preview card: ${JSON.stringify(experience)}`,
    });
    return response.text || "A standard interview experience sharing key insights.";
  } catch (error) {
    return "Interesting interview process with standard rounds.";
  }
}
