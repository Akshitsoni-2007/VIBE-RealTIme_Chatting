const formatTime = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

const Message = ({ message, mine, isFirst, isLast, animate }) => {
  const tail = mine
    ? "1.125rem 1.125rem 0.375rem 1.125rem"
    : "1.125rem 1.125rem 1.125rem 0.375rem";

  return (
    <div
      className={`flex ${mine ? "justify-end" : "justify-start"}`}
      style={{ marginTop: isFirst ? 14 : 3 }}
    >
      <div className="flex max-w-[min(80%,34rem)] flex-col">
        <div
          title={message.createdAt ? new Date(message.createdAt).toLocaleString() : undefined}
          style={{ borderRadius: isLast ? tail : "1.125rem" }}
          className={`whitespace-pre-wrap break-words px-3.5 py-2 text-[14.5px] leading-[1.55] [overflow-wrap:anywhere] ${
            mine ? "bubble-out" : "bubble-in"
          } ${animate ? "anim-rise" : ""}`}
        >
          {message?.message}
        </div>

        {isLast && message.createdAt && (
          <span
            className={`mt-1 px-1 text-[10.5px] tabular-nums text-mist-600 ${
              mine ? "text-right" : "text-left"
            }`}
          >
            {formatTime(message.createdAt)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Message;
