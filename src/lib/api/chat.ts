// API utility for chat functionality
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatResponse {
  reply: string;
  success: boolean;
  error?: string;
}

export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      reply: data.reply,
      success: true,
    };
  } catch (error) {
    console.error('Chat API error:', error);
    return {
      reply: 'Sorry, I encountered an error. Please try again.',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
