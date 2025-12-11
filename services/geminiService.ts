import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  message: string, 
  context: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const chat: Chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: `You are an intelligent assistant for the VectorClaz system. 
      
      Current User Context: ${context}
      
      If the user is a STUDENT/PARENT:
      - Help with exam schedules, meal balance questions, and attendance tips.
      - Be encouraging and helpful.
      - If asked about low attendance, suggest speaking to a counselor.
      
      If the user is an ADMIN:
      - Help analyze data, identify anomalies, and summarize reports.
      - Be professional and concise.
      
      General:
      - Keep responses short and relevant to the dashboard environment.
      - Do not make up fake specific data if not provided in the prompt, give general advice or ask for the specific data.`
      },
      history: history
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to the intelligent assistant right now. Please try again later.";
  }
};