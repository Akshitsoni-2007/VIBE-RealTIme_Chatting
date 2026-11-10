import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthUser, setSelectedUser } from "../redux/userSlice";
import Avatar from "./Avatar";

const Row = ({ label, value, children }) => (
  <div className="flex items-center justify-between gap-4 border-b border-line py-3.5 last:border-b-0">
    <span className="text-[13px] text-mist-500">{label}</span>
    <span className="flex items-center gap-2 text-[13.5px] font-medium text-mist-100">
      {children ?? value}
    </span>
  </div>
);

const ProfilePanel = ({ user, online, isSelf = false, onClose }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!user) return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/logout`
      );
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setSelectedUser(null));
      onClose();
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("We couldn't log you out. Please try again.");
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close profile"
        onClick={onClose}
        className="anim-fade absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-name"
        className="anim-slide-left relative flex h-full w-full max-w-[380px] flex-col overflow-y-auto border-l border-line bg-ink-900"
      >
        <div className="flex items-center justify-between px-5 pb-1 pt-5">
          <span className="text-2xs font-semibold uppercase tracking-[0.22em] text-mist-500">
            Profile
          </span>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close profile"
            className="icon-btn"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center px-6 pb-7 pt-4 text-center">
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-accent-500/25 blur-2xl" />
            <Avatar user={user} size={92} online={online} dotRing="#0b0e16" />
          </div>

          <h2
            id="profile-name"
            className="mt-5 font-serif text-[28px] leading-tight text-mist-50"
          >
            {user.fullname}
          </h2>
          <p className="mt-1 text-[13.5px] text-mist-500">@{user.username}</p>

          <span
            className={`mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-medium ${
              online
                ? "border-positive/25 bg-positive/10 text-positive"
                : "border-line bg-ink-850 text-mist-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                online ? "bg-positive" : "bg-mist-600"
              }`}
            />
            {online ? "Active now" : "Offline"}
          </span>
        </div>

        <div className="px-6">
          <div className="rounded-2xl border border-line bg-ink-850/70 px-4">
            <Row label="Username" value={`@${user.username}`} />
            <Row label="Display name" value={user.fullname} />
            {user.gender && (
              <Row
                label="Pronouns"
                value={user.gender === "male" ? "He / him" : "She / her"}
              />
            )}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2.5 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8">
          {isSelf ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="btn-primary w-full"
              >
                Back to messages
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="btn-quiet w-full text-mist-400 hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
              >
                {isLoggingOut ? "Logging out…" : "Log out"}
              </button>
            </>
          ) : (
            <button type="button" onClick={onClose} className="btn-primary w-full">
              Back to conversation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
