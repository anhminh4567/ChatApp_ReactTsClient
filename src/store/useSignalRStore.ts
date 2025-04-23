import { Message } from "@/types/message/Message";
import { ChatReceiverMethod } from "@/types/signalRmethods/ChatReceiver";
import { User } from "@/types/user/User";
import { getSignalRConnection } from "@/utils/RealTimeConnection";
import { create } from "zustand";

interface SignalRState {
  signalRConnection: signalR.HubConnection | null;
  initializeConnection: (hubUrl: string, accessToken: string) => void;
}

const useSignalRStore = create<SignalRState>((set, get) => ({
  signalRConnection: null,

  initializeConnection: (hubUrl, accessToken) => {
    const connection = getSignalRConnection(hubUrl, accessToken);
    console.log("SignalR connection initialized", connection);
    connection
      .start()
      .then(() => {
        console.log("SignalR connected");
        set({ signalRConnection: connection });
      })
      .catch((err) => console.error("SignalR connection error:", err));
  },
}));

export default useSignalRStore;
