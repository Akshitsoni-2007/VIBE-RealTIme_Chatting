import SendInput from './SendInput.jsx';
import Messages from './Messages.jsx';
import { useSelector } from 'react-redux';
import { Blobatar } from 'blobatar/react';
import { useDispatch } from 'react-redux';

const MessageContainer = () => {
  const { selectedUser } = useSelector(store => store.user)

  const dispatch = useDispatch();

  const selectedContact = selectedUser?.fullname;
  return (
    <>
      {
        selectedUser !== null ? (
          <div className="flex-1 flex flex-col relative bg-[#060813]">
            {/* Background Image */}
            <div
              className="absolute inset-0 z-0 opacity-70 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/Moonlit_bg.png')` }}
            />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-[#0a0f1c]/90 backdrop-blur-lg border-b border-white/5 shadow-sm">
              <div className="flex items-center">
                <button className="mr-3 text-gray-400 hover:text-white lg:hidden">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="relative w-10.5 h-10.5 rounded-full mr-3">
                  {selectedUser && (
                    <Blobatar
                      name={selectedUser.fullname}
                      background="circle"
                    />
                  )}
                </div>

                <div>
                  <h2 className="text-white font-semibold text-[17px] leading-tight">{selectedContact}</h2>

                </div>
              </div>


            </div>

            {/* Messages Area */}

            <Messages />

            <SendInput />

            <style jsx="true">{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
          </div>
        ) : (
          <div className="flex-1 relative overflow-hidden bg-[#060813] flex items-center justify-center">

            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/Moonlit_bg.png')` }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#050713]/45" />

            {/* Subtle center glow */}
            <div className="absolute w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">

              {/* Icon */}
              <div className="relative mb-7">

                {/* Glow behind icon */}
                <div className="absolute inset-0 rounded-[28px] bg-purple-500/20 blur-xl" />

                <div className="
        relative
        w-24 h-24
        rounded-[28px]
        flex items-center justify-center
        bg-white/[0.06]
        backdrop-blur-xl
        border border-white/[0.12]
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
      ">
                  <svg
                    className="w-11 h-11 text-purple-200/80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.4}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
              </div>

              {/* Text */}
              <h1 className="
      text-2xl
      font-semibold
      tracking-tight
      text-white
      mb-3
    ">
                Select a user to chat
              </h1>

              <p className="
      max-w-md
      text-sm
      leading-6
      text-white/45
    ">
                Choose a conversation from the sidebar
                <br />
                to start messaging.
              </p>

              {/* Small decorative line */}
              <div className="mt-7 flex items-center gap-2">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/20" />
                <div className="w-1 h-1 rounded-full bg-purple-300/50" />
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/20" />
              </div>

            </div>
          </div>
        )
      }
    </>

  );
};

export default MessageContainer;
