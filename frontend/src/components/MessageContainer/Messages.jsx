import { useEffect, useRef } from 'react'
import Message from './Message.jsx'
import useGetMessages from '../../hooks/useGetMessages.js'
import { useSelector } from 'react-redux'
import useGetRealTimeMessage from '../../hooks/useGetRealTimeMessage.jsx'

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector(store => store.message)
  const { selectedUser } = useSelector(store => store.user)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, selectedUser?._id])

  return (
    <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-3 sm:py-5 space-y-5 scrollbar-hide flex flex-col">
      {messages && messages?.map((message) => (
        <Message key={message._id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages
