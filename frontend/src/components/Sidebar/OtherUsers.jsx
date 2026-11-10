import OtherUser from "./OtherUser.jsx";
import useGetOtherUsers from "../../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const SkeletonRow = () => (
  <div className="flex items-center gap-3 rounded-[0.875rem] px-2.5 py-2">
    <div className="shimmer h-11 w-11 shrink-0 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="shimmer h-2.5 w-28 rounded-full" />
      <div className="shimmer h-2 w-16 rounded-full" />
    </div>
  </div>
);

const StateMessage = ({ title, body, action }) => (
  <div className="flex flex-1 flex-col items-center justify-center px-8 pb-16 text-center">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink-850 text-mist-500">
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    </div>
    <p className="text-[14px] font-medium text-mist-200">{title}</p>
    <p className="mt-1.5 max-w-[15rem] text-[12.5px] leading-relaxed text-mist-500">
      {body}
    </p>
    {action}
  </div>
);

const OtherUsers = ({ users, query }) => {
  const { otherUsers } = useSelector((store) => store.user);
  const { loading, error, refetch } = useGetOtherUsers();

  const displayUsers = users ?? otherUsers;

  if (loading && !displayUsers) {
    return (
      <div className="relative flex-1 space-y-0.5 overflow-hidden px-2.5 pt-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonRow key={index} />
        ))}
      </div>
    );
  }

  if (error && !displayUsers) {
    return (
      <StateMessage
        title="Couldn't load conversations"
        body={
          error === "unauthenticated"
            ? "Your session may have expired. Try signing in again."
            : "Check your connection, then try once more."
        }
        action={
          <button
            type="button"
            onClick={refetch}
            className="btn-quiet mt-4 h-9 px-3.5 text-[12.5px]"
          >
            Try again
          </button>
        }
      />
    );
  }

  if (!displayUsers) return null;

  if (displayUsers.length === 0) {
    return query ? (
      <StateMessage
        title={`No matches for “${query}”`}
        body="Try a different name or username."
      />
    ) : (
      <StateMessage
        title="It's quiet in here"
        body="New conversations will appear as people join VIBE."
      />
    );
  }

  return (
    <nav
      aria-label="Conversations"
      className="relative min-h-0 flex-1 overflow-y-auto scrollbar-hide px-2.5 pb-4"
    >
      <ul className="space-y-0.5">
        {displayUsers.map((user) => (
          <li key={user._id}>
            <OtherUser user={user} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default OtherUsers;
