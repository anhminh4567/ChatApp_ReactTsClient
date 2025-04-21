import * as signalR from "@microsoft/signalr";

const HUB_URL = `${import.meta.env.VITE_CHAT_URL}/hub/chat`; // Replace with your SignalR hub URL

const connectionPool: { [hubUrl: string]: signalR.HubConnection } = {};

export const getSignalRConnection = (
  hubUrl: string,
  access_token: string,
  onError?: (error: Error) => void,
  onClose?: (error?: Error) => void
): signalR.HubConnection => {
  if (connectionPool[hubUrl]) {
    return connectionPool[hubUrl];
  }
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () => access_token,
    })
    .withAutomaticReconnect([0, 2000, 10000, 30000, -1])
    .configureLogging(signalR.LogLevel.Information)
    .build();
  connection.onreconnecting((err) => {
    console.warn("SignalR reconnecting...", err);
    if (onError) {
      if (err) {
        onError(err);
      }
    }
  });

  connection.onclose((err) => {
    console.error("SignalR connection closed", err);
    if (onClose) {
      onClose(err);
    }
  });
  return connection;
};
