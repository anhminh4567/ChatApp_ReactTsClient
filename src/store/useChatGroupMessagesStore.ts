import { create } from "zustand";
import { Message } from "@/types/message/Message";

interface ChatGroup {
  lastMessage?: Message; // List of messages for the group
  hasRead: boolean; // Indicates if the group has new messages
}

interface ChatGroupMessagesState {
  chatGroups: Record<string, ChatGroup>;
  setChatGroups: (groupId: string, newMessage?: Message) => void;
  markGroupAsRead: (groupId: string) => void; // Mark a group as read
}

const useChatGroupMessagesStore = create<ChatGroupMessagesState>((set) => ({
  chatGroups: {},
  setChatGroups: (groupId, newMessages) => {
    set((state) => {
      const group = state.chatGroups[groupId] || {
        lastMessage: newMessages,
        hasRead: true,
      };
      return {
        chatGroups: {
          ...state.chatGroups,
          [groupId]: {
            ...group,
          },
        },
      };
    });
  },
  markGroupAsRead: (groupId) => {
    set((state) => {
      const group = state.chatGroups[groupId];
      if (group) {
        return {
          chatGroups: {
            ...state.chatGroups,
            [groupId]: {
              ...group,
              hasNewMessage: false, // Mark the group as read
            },
          },
        };
      }
      return state;
    });
  },
}));

export default useChatGroupMessagesStore;
