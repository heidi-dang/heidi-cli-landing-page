import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize Gemini Client
// Note: In a real production app, ensure your API key is secure.
// For this environment, we assume process.env.API_KEY is available.
// Safely access process.env
const getEnvVar = (key: string) => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return '';
};

const apiKey = getEnvVar('API_KEY');

// Models
const FLASH_MODEL = 'gemini-3-flash-preview';
const PRO_THINKING_MODEL = 'gemini-3-pro-preview';

let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai && apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export interface GeminiOptions {
  useThinking?: boolean;
}

export const streamGeminiResponse = async (
  history: ChatMessage[], 
  newMessage: string,
  onChunk: (text: string) => void,
  options: GeminiOptions = {}
): Promise<string> => {
  const client = getAiClient();
  if (!client) {
    throw new Error("Gemini API Key is missing. Please configure your environment.");
  }

  // Select model based on thinking mode
  const model = options.useThinking ? PRO_THINKING_MODEL : FLASH_MODEL;

  const systemInstruction = `You are Heidi, an intelligent CLI assistant. 
  You are helpful, concise, and technical. 
  You help users with terminal commands, coding questions, and specifically 'heidi-cli' usage.
  Keep responses formatted in Markdown. Use code blocks for commands.`;

  const config: any = {
    systemInstruction,
  };

  if (options.useThinking) {
    // Configure thinking budget for complex reasoning tasks
    // We do NOT set maxOutputTokens when using thinkingConfig
    config.thinkingConfig = { thinkingBudget: 32768 };
  } else {
    // Standard fast configuration for Flash
    config.temperature = 0.7;
  }

  try {
    const chat = client.chats.create({
      model: model,
      config: config,
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