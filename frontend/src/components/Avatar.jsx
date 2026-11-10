import { Blobatar } from "@blobatar/react";

/**
 * One avatar treatment for the whole app: a blobatar disc, a hairline ring,
 * and an optional presence dot. Kept in one place so a row, a header and the
 * profile panel can never drift apart.
 */
const Avatar = ({
  user,
  size = 40,
  online = false,
  dotRing = "#10141d",
  className = "",
}) => {
  const name = user?.fullname || user?.username || "VIBE";
  const dot = size >= 44 ? 10 : 8;

  return (
    <span
      className={`relative inline-flex shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="h-full w-full overflow-hidden rounded-full bg-ink-800 ring-1 ring-white/10">
        <Blobatar name={name} size={size} background="circle" alt="" />
      </span>

      {online && (
        <span
          className="absolute bottom-0 right-0 rounded-full bg-positive"
          style={{
            width: dot,
            height: dot,
            transform: "translate(8%, 8%)",
            boxShadow: `0 0 0 2px ${dotRing}`,
          }}
        >
          <span className="sr-only">Online</span>
        </span>
      )}
    </span>
  );
};

export default Avatar;
