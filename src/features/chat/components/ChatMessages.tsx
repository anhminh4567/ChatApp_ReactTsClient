import { Space, theme } from "antd";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Message } from "../../../types/message/Message";
import ChatRow from "./ChatRow";
import { useUserContext } from "@/context/useUserContext";
import { useChatGroupContext } from "../context/useChatGroupContext";
import { UN_EXISTING_USER, User } from "@/types/user/User";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Group } from "@/types/group/Group";

import { GetMessagesByGroup } from "@/services/chatServices/MessageService";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import ErrorOutline from "@/components/errors/ErrorOutline";
import { useInView } from "react-intersection-observer";
import useChatGroupMessagesStore from "@/store/useChatGroupMessagesStore";
import useGroupMessagesStore from "@/store/useGroupMessagesStore";
import useSignalRStore from "@/store/useSignalRStore";
import { ChatReceiverMethod } from "@/types/signalRmethods/ChatReceiver";
import { invalid } from "moment";
import useToken from "antd/es/theme/useToken";
const ChatMessages = () => {
  const renderCount = useRef(0); // Track render count

  const { User } = useUserContext();
  // const { chatGroups, setChatGroups } = useChatGroupMessagesStore();
  const { currentGroupDetail } = useChatGroupContext();
  const { messages, addMessage } = useGroupMessagesStore();
  const { signalRConnection } = useSignalRStore();
  const { ref, inView, entry } = useInView({});
  const { useToken } = theme;
  const { token } = useToken();

  const userParticipant = currentGroupDetail?.ParticipantsDetail.find(
    (p) => p.IdentityId === User!.data?.IdentityId
  );
  const endRef = React.useRef<HTMLAnchorElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null); // Ref for the scroll container
  const hasScrolledToBottom = useRef(false); // Track if scroll to bottom has already occurred
  const fetchNextMessages = (group: Group) => {
    return useInfiniteQuery<Message[], Error>({
      queryKey: ["messages-from", group.Id],
      queryFn: async ({ pageParam }) => {
        let dateTimeCursor: Date = new Date(); //= moment(new Date(), DATE_TIME_FORMAT).toDate();
        if (pageParam) {
          dateTimeCursor = pageParam as Date;
        }
        let result = await GetMessagesByGroup(group.Id, dateTimeCursor, 20); // Fetch messages
        addMessage(result); // Update the messages in the context
        return result;
      },
      initialPageParam: new Date().toString(),
      getNextPageParam: (lastPage, pages) => {
        // this messages is arleady sorteed by CreatedAt in the store
        // order by latest at top
        let clonedMessages = [...messages];
        let earliestMessage = clonedMessages.pop(); // Get the last message

        if (lastPage.length <= 1) return undefined;
        return earliestMessage ? earliestMessage.CreatedAt : null;
      },
    });
  };
  const { error, fetchNextPage, hasNextPage, status, isFetchingNextPage } =
    fetchNextMessages(currentGroupDetail?.Group!);
  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [inView]);
  useEffect(() => {
    return () => {
      hasScrolledToBottom.current = false;
    };
  }, [currentGroupDetail?.Group.Id]);
  /// logic to maintain at same scroll
  useEffect(() => {
    if (isFetchingNextPage) {
      const container = containerRef.current;
      if (container) {
        const previousScrollHeight = container.scrollHeight;
        const observer = new MutationObserver((mutationRecord) => {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop = newScrollHeight - previousScrollHeight;
          observer.disconnect();
        });

        observer.observe(container, { childList: true, subtree: true });
      }
    }
  }, [isFetchingNextPage]);
  useEffect(() => {
    if (signalRConnection) {
      console.log("SignalR connection established");
      signalRConnection.on(
        ChatReceiverMethod.ReceiveGroupMessage,
        (groupId: string, newMessages: Message[]) => {
          if (currentGroupDetail?.Group.Id === groupId) {
            addMessage(newMessages); // Update the messages in the context
            if (true) {
              //hasDetachFromBottom.current
              endRef.current?.scrollIntoView({
                behavior: "smooth",
              });
            }
          }
        }
      );
    }
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
    hasScrolledToBottom.current = true; // Mark as scrolled
    return () => {
      if (signalRConnection) {
        signalRConnection.off(ChatReceiverMethod.ReceiveGroupMessage);
      }
      hasScrolledToBottom.current = false; // Reset scroll tracking on unmount
    };
  }, [signalRConnection]);
  useEffect(() => {
    return () => {
      hasScrolledToBottom.current = false; // Reset scroll tracking on unmount
    };
  }, []);
  if (status === "pending") return <LoadingSpinner className="w-full h-full" />;
  if (status === "error") {
    return (
      <ErrorOutline
        className="w-full h-full"
        IconSize="large"
        Message={error.message}
      />
    );
  }

  renderCount.current += 1;
  console.log("ChatMessages render count:", renderCount.current);
  return (
    <div
      id="scrollableDiv"
      ref={containerRef}
      style={{
        backgroundColor: token.colorBgContainer,
      }}
      className="chat-messages-container-list w-full h-full overflow-y-scroll "
    >
      <div className="w-full flex gap-4 flex-col-reverse relative ">
        {isFetchingNextPage && (
          <>
            <LoadingSpinner className="w-full h-fit" />
          </>
        )}
        <a
          id="endingref"
          className="absolute bottom-50 w-full h-1 bg-slate-100"
          ref={endRef}
        />

        {messages?.map((message) => {
          if (message.SenderId != userParticipant?.Id) {
            let foundedParticipant: User | null = null;
            let participant = currentGroupDetail?.Group.Participants.find(
              (p) => {
                p.UserId == message.SenderId;
              }
            );
            if (!participant)
              foundedParticipant = UN_EXISTING_USER(message.SenderId);
            else
              foundedParticipant = currentGroupDetail?.ParticipantsDetail.find(
                (p) => p.Id === participant.UserId
              )!;
            return (
              <ChatRow.ParticipantVariant
                key={message.Id}
                Message={message}
                Sender={foundedParticipant}
              />
            );
          } else
            return (
              <ChatRow.CurrentUserVariant
                key={message.Id}
                Message={message}
                Sender={userParticipant}
              />
            );
        })}
        <a ref={ref} />
      </div>
    </div>
  );
};

export default ChatMessages;
