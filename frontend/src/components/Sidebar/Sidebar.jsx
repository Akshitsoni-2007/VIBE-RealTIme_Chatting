import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import OtherUsers from "./OtherUsers.jsx";
import Avatar from "../Avatar.jsx";

const Sidebar = ({ onOpenProfile }) => {
  const [search, setSearch] = useState("");
  const { authUser, otherUsers, selectedUser, onlineUsers } = useSelector(
    (store) => store.user
  );

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return null;
    return (otherUsers ?? []).filter(
      (user) =>
        user.fullname?.toLowerCase().includes(query) ||
        user.username?.toLowerCase().includes(query)
    );
  }, [search, otherUsers]);

  const onlineCount = (otherUsers ?? []).filter((user) =>
    onlineUsers.includes(user._id)
  ).length;

  return (
    <aside
      className={`relative z-20 h-full w-full shrink-0 flex-col border-r border-line bg-ink-900 md:w-[320px] lg:w-[344px] ${
        selectedUser ? "hidden md:flex" : "flex"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden grain" />

      <header className="relative flex items-center justify-between gap-3 px-4 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-2.5">
          <img
            src="/VIBE_Favicon.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-[9px] object-contain ring-1 ring-white/10"
          />
          <span className="font-serif text-[22px] leading-none tracking-[0.01em] text-mist-50">
            VIBE
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenProfile}
          aria-label="Open your profile"
          className="rounded-full transition-transform duration-150 active:scale-95"
        >
          <Avatar user={authUser} size={36} online dotRing="#0b0e16" />
        </button>
      </header>

      <div className="relative px-4 pb-3">
        <div className="group flex h-11 items-center gap-2.5 rounded-xl border border-line bg-ink-850 px-3 transition-colors duration-150 focus-within:border-accent-400/45 focus-within:bg-ink-800">
          <svg
            className="h-[18px] w-[18px] shrink-0 text-mist-600 transition-colors group-focus-within:text-mist-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>

          <label htmlFor="conversation-search" className="sr-only">
            Search conversations
          </label>
          <input
            id="conversation-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            type="text"
            placeholder="Search conversations"
            autoComplete="off"
            spellCheck="false"
            className="h-full w-full min-w-0 bg-transparent text-[14px] text-mist-100 outline-none placeholder:text-mist-600"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="-mr-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-mist-500 transition-colors hover:bg-ink-700 hover:text-mist-100"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="relative flex items-center justify-between px-4 pb-1.5 pt-1">
        <h2 className="text-2xs font-semibold uppercase tracking-[0.22em] text-mist-500">
          Messages
        </h2>
        <span className="text-2xs tabular-nums text-mist-600">
          {onlineCount} online
        </span>
      </div>

      <OtherUsers users={filteredUsers} query={search.trim()} />
    </aside>
  );
};

export default Sidebar;
