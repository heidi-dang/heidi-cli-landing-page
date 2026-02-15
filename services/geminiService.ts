import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize Gemini Client
// Note: In a real production app, ensure your API key is secure.
// For this environment, we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || ''; 

// We use the 'gemini-3-flash-preview' as it is the current recommended model for high-speed text tasks
// consistent with the system prompt's fallback for text tasks.
const MODEL_NAME = 'gemini-3-flash-preview';

let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai && apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const streamGeminiResponse = async (
  history: ChatMessage[], 
  newMessage: string,
  onChunk: (text: string) => void
): Promise<string> => {
  const client = getAiClient();
  if (!client) {
    throw new Error("Gemini API Key is missing. Please configure your environment.");
  }

  const systemInstruction = `You are Heidi, an intelligent CLI assistant. 
  You are helpful, concise, and technical. 
  You help users with terminal commands, coding questions, and specifically 'heidi-cli' usage.
  Keep responses formatted in Markdown. Use code blocks for commands.`;

  // Convert history to Gemini format if using chat.sendMessageStream directly with history
  // However, for simplicity and statelessness in this demo service, we'll append history to the prompt 
  // or use the Chat API. Let's use the Chat API properly.

  try {
    const chat = client.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }))
    });

    const result = await chat.sendMessageStream({ message: newMessage });
    
    let fullText = '';
    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      const text = c.text || '';
      fullText += text;
      onChunk(fullText);
    }
    
    return fullText;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
