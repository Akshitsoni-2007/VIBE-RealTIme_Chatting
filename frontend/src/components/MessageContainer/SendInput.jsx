import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setMessage as setMessageAction } from "../../redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const canSend = message.trim().length > 0 && !isSending;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!canSend) return;

    setIsSending(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/message/send/${selectedUser?._id}`,
        { message: message.trim() },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(setMessageAction([...messages, res?.data?.newMessage]));
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error("That message didn't send. Please try again.");
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="relative z-20 shrink-0 border-t border-line bg-ink-900/90 backdrop-blur-xl"
    >
      <div className="mx-auto w-full max-w-[880px] px-3 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pb-4 sm:pt-3.5">
        <div className="flex items-end gap-2">
          <div className="flex min-h-12 flex-1 items-center rounded-[1.375rem] border border-line bg-ink-850 px-4 transition-colors duration-150 focus-within:border-accent-400/45 focus-within:bg-ink-800">
            <label htmlFor="message-input" className="sr-only">
              Message
            </label>
            <input
              id="message-input"
              ref={inputRef}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              type="text"
              placeholder={`Message ${selectedUser?.fullname?.split(" ")[0] || ""}`.trim()}
              autoComplete="off"
              className="h-12 w-full min-w-0 bg-transparent text-[15px] text-mist-100 outline-none placeholder:text-mist-600"
            />
          </div>

          <button
            type="submit"
            disabled={!canSend}
            aria-label="Send message"
            aria-busy={isSending}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_26px_-14px_rgba(124,107,245,0.95)] transition-[background-color,transform,box-shadow] duration-150 hover:bg-accent-400 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_30px_-14px_rgba(124,107,245,1)] active:scale-95 active:bg-accent-600 disabled:bg-ink-750 disabled:text-mist-600 disabled:shadow-none disabled:active:scale-100"
          >
            {isSending ? (
              <svg
                className="h-[18px] w-[18px] animate-spin text-mist-300"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeOpacity="0.25"
                />
                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                className="h-[18px] w-[18px] translate-x-[1px]"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3.4 20.4 20.85 12.9c.8-.35.8-1.45 0-1.8L3.4 3.6c-.65-.28-1.35.2-1.35.9L2.04 9.1c0 .45.34.84.79.9L14 12 2.83 13.99c-.45.07-.79.45-.79.9l.01 4.6c0 .7.7 1.18 1.35.9Z" />
              </svg>
            )}
          </button>
        </div>

      </div>
    </form>
  );
};

export default SendInput;
