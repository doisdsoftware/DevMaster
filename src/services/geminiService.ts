import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askTutor(question: string, context?: string) {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    Você é o "DevMaster Tutor", mentor de programação para quem quer aprender rápido mas com base sólida.
    Didática: use passos numerados, analogias curtas quando ajudar, e "checklists" de revisão ao final quando fizer sentido.
    Sempre que possível, mostre código mínimo em TypeScript ou JavaScript (com comentários só onde agregar clareza).
    Se houver contexto de aula, conecte a resposta aos objetivos dessa aula e sugira 1 micro-exercício para fixar.
    Se a pergunta for vaga, faça até 2 perguntas de esclarecimento antes de assumir o nível do aluno.
    Responda em Português do Brasil. Evite jargão sem explicar; quando usar termo técnico, defina em uma linha.
  `;

  const prompt = context 
    ? `Contexto da aula atual: ${context}\n\nPergunta do aluno: ${question}`
    : question;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    return response.text || "Desculpe, tive um problema ao processar sua resposta.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com o tutor. Verifique sua conexão.";
  }
}
