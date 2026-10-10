import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage as setMessageAction } from '../../redux/messageSlice';

const SendInput = () => {
  const [message, setMessage] = useState("")
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user)
  const { messages } = useSelector(store => store.message)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/message/send/${selectedUser?._id}`, { message }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      dispatch(setMessageAction([...messages, res?.data?.newMessage]));
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="relative z-10 px-6 py-5 bg-[#0b0f19]/95 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          <div className="flex-1 bg-[#161a27] rounded-full flex items-center px-5 h-13 border border-white/5 transition-colors focus-within:border-white/10">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none outline-none text-white text-[15px] placeholder-gray-500"
            />
            <button className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors">
              <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          <button type="submit" className="w-13 h-13 shrink-0 rounded-full bg-linear-to-r from-[#4d53d1] to-[#607af1] flex items-center justify-center text-white shadow-[0_4px_15px_rgba(77,83,209,0.3)] hover:shadow-[0_4px_20px_rgba(77,83,209,0.5)] transition-all active:scale-95 ml-2">
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  )
}

export default SendInput
