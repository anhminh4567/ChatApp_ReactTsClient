import { create } from "zustand";
import { Message } from "@/types/message/Message";
import { User } from "@/types/user/User";

interface GroupMessagesState {
  messages: Message[]; // All messages for the current group
  whoTyping?: User;
  addMessage: (message: Message[]) => void; // Add a new message to the group
  setMessages: (messages: Message[]) => void; // Set all messages for the group
  clear: () => void; // Clear all
  setWhoTyping: (user: User) => void; // Set the user who is typing
}

const useGroupMessagesStore = create<GroupMessagesState>((set) => ({
  messages: [],
  whoTyping: undefined,

  addMessage: (message) =>
    set((state) => {
      const seen = new Set();
      let distinceMessages = new Array<Message>();
      let newMessages = [...state.messages, ...message];
      newMessages.forEach((m) => {
        const key = m.Id;
        if (seen.has(key)) {
          return;
        }
        seen.add(key); // Add the message ID to the set
        distinceMessages.push(m); // Add the message to the distinct messages array
      });

      return {
        messages: distinceMessages.sort(
          (a, b) =>
            new Date(b.CreatedAt.toString()).getTime() -
            new Date(a.CreatedAt.toString()).getTime()
        ), // Append and sort messages by timestamp
      };
    }),

  setMessages: (messages) =>
    set(() => ({
      messages: messages.sort(
        (a, b) =>
          new Date(b.CreatedAt.toString()).getTime() -
          new Date(a.CreatedAt.toString()).getTime()
      ), // Replace and sort messages by timestamp
    })),

  clear: () =>
    set(() => ({
      messages: [], // Clear all messages
      whoTyping: undefined, // Clear typing user
    })),

  setWhoTyping: (user) =>
    set(() => ({
      whoTyping: user, // Set the user who is typing
    })),
}));

export default useGroupMessagesStore;
