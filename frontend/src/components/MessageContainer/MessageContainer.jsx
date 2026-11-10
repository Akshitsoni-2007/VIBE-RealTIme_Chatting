import { useDispatch, useSelector } from "react-redux";
import SendInput from "./SendInput.jsx";
import Messages from "./Messages.jsx";
import Avatar from "../Avatar.jsx";
import { setSelectedUser } from "../../redux/userSlice.js";

const EmptyConversation = () => (
  <div className="relative hidden flex-1 items-center justify-center overflow-hidden bg-ink-925 md:flex">
    <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-accent-500/10 blur-[120px]" />
    <div className="pointer-events-none absolute inset-0 overflow-hidden grain" />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute select-none font-serif text-[36vw] leading-none text-white/[0.015]"
    >
      V
    </span>

    <div className="anim-rise relative z-10 max-w-sm px-8 text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-ink-850 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.95)]">
        <svg
          className="h-6 w-6 text-accent-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.4}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>

      <h1 className="font-serif text-[30px] leading-[1.15] text-mist-50">
        Pick up where you left off.
      </h1>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-mist-500">
        Choose a conversation from the list to start messaging. Everything
        arrives in real time.
      </p>
    </div>
  </div>
);

const MessageContainer = ({ onOpenProfile }) => {
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const isOnline = selectedUser
    ? onlineUsers.includes(selectedUser._id)
    : false;

  if (!selectedUser) {
    return (
      <main className="relative flex min-h-0 min-w-0 flex-1 bg-ink-925">
        <EmptyConversation />
      </main>
    );
  }

  return (
    <main className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-ink-925">
      <header className="relative z-20 flex h-[68px] shrink-0 items-center gap-2 border-b border-line bg-ink-900/85 px-2.5 backdrop-blur-xl sm:px-4">
        <button
          type="button"
          onClick={() => dispatch(setSelectedUser(null))}
          aria-label="Back to conversations"
          className="icon-btn -ml-1 md:hidden"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onOpenProfile}
          aria-label={`View ${selectedUser.fullname}'s profile`}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-xl py-1.5 pl-1.5 pr-2 text-left transition-colors duration-150 hover:bg-ink-850/70"
        >
          <Avatar
            user={selectedUser}
            size={38}
            online={isOnline}
            dotRing="#0b0e16"
          />

          <span className="min-w-0">
            <span className="block truncate text-[15px] font-semibold leading-tight text-mist-50">
              {selectedUser.fullname}
            </span>
            <span
              className={`mt-1 flex items-center gap-1.5 text-[11.5px] leading-none ${
                isOnline ? "text-positive" : "text-mist-500"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isOnline ? "bg-positive" : "bg-mist-600"
                }`}
              />
              {isOnline ? "Active now" : "Offline"}
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenProfile}
          aria-label="Conversation details"
          className="icon-btn"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.7}
              d="M12 11v6m0-10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </header>

      <Messages />
      <SendInput />
    </main>
  );
};

export default MessageContainer;
