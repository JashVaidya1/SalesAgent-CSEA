import Chat from '../models/chat.js';

// Get chats by customerId and callId (for history)
export const getChat = async (customerId, callId) => {
  try {
    const chats = await Chat.find({ customerId, callId }).sort({ createdAt: 1 });

    if (chats.length > 0) {
      const history = chats.map(chat => ({
        role: chat.role,
        parts: chat.parts
      }));
      console.log("Chat History: ", history);
      return history;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Failed to retrieve chat history");
  }
};
