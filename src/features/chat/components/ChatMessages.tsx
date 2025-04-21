import { Image, Space } from "antd";
import React, { use, useEffect, useLayoutEffect, useRef } from "react";
import { Message } from "../../../types/message/Message";
import { MediaObject } from "@/types/shared/MediaObject";
import ChatRow from "./ChatRow";
import { useUserContext } from "@/context/useUserContext";
import { useChatGroupContext } from "../context/useChatGroupContext";
import { APP_CONFIG } from "@/config/appConfig";
import { UN_EXISTING_USER } from "@/types/user/User";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Group } from "@/types/group/Group";
import InfiniteScroll from "react-infinite-scroll-component";

import { GetMessagesByGroup } from "@/services/chatServices/MessageService";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import ErrorOutline from "@/components/errors/ErrorOutline";
import { useInView } from "react-intersection-observer";
const ChatMessages = () => {
  const renderCount = useRef(0); // Track render count
  renderCount.current += 1;
  console.log("ChatMessages render count:", renderCount.current);

  const { User, ChatGroups, setMessagesForGroup } = useUserContext();
  const { currentGroupDetail } = useChatGroupContext();
  const { ref, inView, entry } = useInView({});
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
        setMessagesForGroup(group, result); // Update the messages in the context
        return result;
      },
      initialPageParam: new Date().toString(),
      getNextPageParam: (lastPage, pages) => {
        const messages = ChatGroups[group.Id] || []; // Fallback to an empty array
        const sortedMessages = [...messages].sort(
          (first, second) =>
            new Date(second.CreatedAt).getTime() -
            new Date(first.CreatedAt).getTime()
        );
        let earliestMessage = sortedMessages.pop(); // Get the last message

        if (lastPage.length <= 1) return undefined;
        return earliestMessage ? earliestMessage.CreatedAt : null;
      },
    });
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    status,
    isFetchingNextPage,
  } = fetchNextMessages(currentGroupDetail?.Group!);
  const allMessages = ChatGroups[currentGroupDetail?.Group.Id!] || [];

  useLayoutEffect(() => {
    if (!hasScrolledToBottom.current && allMessages && allMessages.length > 0) {
      endRef.current?.scrollIntoView({
        behavior: "instant",
      });
      hasScrolledToBottom.current = true; // Mark as scrolled
    }
  }, [allMessages]);
  useEffect(() => {
    console.log(inView);
    console.log(hasNextPage);
    if (hasNextPage && inView) fetchNextPage();
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
        const previousScrollTop = container.scrollTop;

        const observer = new MutationObserver(() => {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop =
            previousScrollTop + (newScrollHeight - previousScrollHeight);
          observer.disconnect();
        });

        observer.observe(container, { childList: true, subtree: true });
      }
    }
  }, [isFetchingNextPage]);
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
  return (
    <div
      id="scrollableDiv"
      ref={containerRef}
      className="chat-messages-container-list w-full h-full overflow-y-scroll "
    >
      <Space
        direction="vertical"
        size="middle"
        className="w-full flex-col-reverse"
      >
        {isFetchingNextPage && (
          <>
            <LoadingSpinner className="w-full h-fit" />
          </>
        )}

        <a ref={endRef} />
        {allMessages?.map((message) => {
          if (message.SenderId != userParticipant?.Id) {
            let foundedParticipant =
              currentGroupDetail?.ParticipantsDetail.find(
                (p) => p.IdentityId === message.SenderId
              );
            if (!foundedParticipant)
              foundedParticipant = UN_EXISTING_USER(message.SenderId);
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
      </Space>
    </div>
  );
};

export default ChatMessages;
