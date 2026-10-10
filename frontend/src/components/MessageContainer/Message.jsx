import { useSelector } from 'react-redux'
import { Blobatar } from 'blobatar/react';

const Message = ({ message }) => {
    const { authUser, selectedUser } = useSelector(store => store.user);

    const senderName = message.senderId === authUser?._id ? authUser?.fullname : selectedUser?.fullname;

    return (
        <div>
            <div className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        {senderName && (
                            <Blobatar name={senderName} background="circle" />
                        )}
                    </div>
                </div>
            
                <div className="chat-bubble rounded-3xl bg-[#532c70] border border-white/5">{message?.message}</div>
            </div>
        </div>
    )
}

export default Message
