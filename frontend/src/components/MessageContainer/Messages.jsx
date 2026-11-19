import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message.jsx";
import useGetMessages from "../../hooks/useGetMessages.js";
import useGetRealTimeMessage from "../../hooks/useGetRealTimeMessage.jsx";

const GROUP_WINDOW_MS = 5 * 60 * 1000;

const startOfDay = (value) => {
  const date = new Date(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
};

const dayLabel = (value) => {
  const date = new Date(value);
  const distance = Math.round(
    (startOfDay(Date.now()) - startOfDay(value)) / 86_400_000
  );

  if (distance === 0) return "Today";
  if (distance === 1) return "Yesterday";

  return date.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

/** Inserts day separators and marks where one sender's run starts and ends. */
const buildTimeline = (messages) =>
  messages.flatMap((message, index) => {
    const previous = messages[index - 1];
    const next = messages[index + 1];
    const time = new Date(message.createdAt).getTime();

    const sameRun = (a, b) => {
      if (!a || !b) return false;
      const gap = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (
        a.senderId === b.senderId &&
        gap >= 0 &&
        gap < GROUP_WINDOW_MS &&
        startOfDay(a.createdAt) === startOfDay(b.createdAt)
      );
    };

    const items = [];
    if (!previous || startOfDay(previous.createdAt) !== startOfDay(message.createdAt)) {
      items.push({ type: "day", key: `day-${time}`, at: time });
    }

    items.push({
      type: "message",
      key: message._id,
      message,
      isFirst: !sameRun(previous, message),
      isLast: !sameRun(message, next),
      index,
    });

    return items;
  });

const ThreadSkeleton = () => (
  <div className="mx-auto flex min-h-0 w-full max-w-[880px] flex-1 flex-col gap-3 overflow-hidden px-4 py-8 sm:px-6">
    {[
      "w-52 self-start",
      "w-40 self-start",
      "w-60 self-end",
      "w-44 self-end",
      "w-56 self-start",
    ].map((width, index) => (
      <div
        key={index}
        className={`shimmer h-10 rounded-[1.125rem] ${width}`}
        style={{ animationDelay: `${index * 90}ms` }}
      />
    ))}
  </div>
);

const Messages = () => {
  useGetRealTimeMessage();
  const { isLoading, error, refetch } = useGetMessages();
  const { messages } = useSelector((store) => store.message);
  const { authUser, selectedUser } = useSelector((store) => store.user);

  const scrollRef = useRef(null);
  const initialCountRef = useRef(0);
  const scrolledUserIdRef = useRef(null);

  useEffect(() => {
    if (!isLoading) initialCountRef.current = messages.length;
  }, [isLoading]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || isLoading) return;

    // Follow the conversation only when the reader is already at the bottom,
    // or when the newest message is their own. Otherwise leave them where
    // they are in the history.
    const newThread = scrolledUserIdRef.current !== selectedUser?._id;
    const distance =
      scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
    const lastMessage = messages?.[messages.length - 1];
    const mine = lastMessage?.senderId === authUser?._id;

    if (!newThread && !mine && distance >= 160) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({
      top: scroller.scrollHeight,
      behavior: newThread || reduced ? "auto" : "smooth",
    });
    scrolledUserIdRef.current = selectedUser?._id;
  }, [messages, isLoading, selectedUser?._id, authUser?._id]);

  const timeline = useMemo(() => buildTimeline(messages ?? []), [messages]);

  if (isLoading) return <ThreadSkeleton />;

  if (error) {
    return (
      <div className="anim-fade relative z-10 flex flex-1 flex-col items-center justify-center px-8 pb-10 text-center">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-red-400/20 bg-red-500/[0.08] text-red-300">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            />
          </svg>
        </div>
        <h2 className="font-serif text-[24px] leading-tight text-mist-50">
          Couldn't load this conversation.
        </h2>
        <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-mist-500">
          Your messages are still safe. Check your connection and try again.
        </p>
        <button
          type="button"
          onClick={refetch}
          className="btn-quiet mt-5 h-9 px-3.5 text-[12.5px]"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="anim-fade relative z-10 flex flex-1 flex-col items-center justify-center px-8 pb-10 text-center">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink-850 text-accent-300">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h2 className="font-serif text-[26px] leading-tight text-mist-50">
          Say hello to {selectedUser?.fullname?.split(" ")[0] || "them"}.
        </h2>
        <p className="mt-2 max-w-[19rem] text-[13px] leading-relaxed text-mist-500">
          This is the beginning of your conversation. Send the first message
          whenever you're ready.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      role="log"
      aria-label="Conversation"
      className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain"
    >
      <div className="mx-auto flex min-h-full w-full max-w-[880px] flex-col justify-end px-3 pb-5 pt-3 sm:px-6">
        {timeline.map((item) =>
          item.type === "day" ? (
            <div key={item.key} className="flex items-center justify-center py-5">
              <span className="rounded-full border border-line bg-ink-900/70 px-3 py-1 text-2xs font-medium uppercase tracking-[0.17em] text-mist-500">
                {dayLabel(item.at)}
              </span>
            </div>
          ) : (
            <Message
              key={item.key}
              message={item.message}
              mine={item.message.senderId === authUser?._id}
              isFirst={item.isFirst}
              isLast={item.isLast}
              animate={item.index >= initialCountRef.current}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Messages;
