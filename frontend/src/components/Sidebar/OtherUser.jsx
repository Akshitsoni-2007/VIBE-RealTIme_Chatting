import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../../redux/userSlice';
import { Blobatar } from "@blobatar/react";

const otherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers.includes(user._id)
    const selectedUserHandler = () => {
        dispatch(setSelectedUser(user))
    }
    return (
        <div className="flex gap-2 mt-2 flex-col">
            <div onClick={() => selectedUserHandler(user)} className={`flex gap-2 items-center rounded-2xl p-2.5 cursor-pointer select-none transition-all duration-300 ease-out ${selectedUser?._id === user?._id ? "bg-linear-to-r from-[#241542] via-[#432354] to-[#69366f] shadow-[0_6px_25px_rgba(105,54,111,0.25)]" : "bg-[#0d1220] hover:bg-[#171525]"}`}>
                <div className={`avatar ${isOnline ? "avatar-online" : " "}`}>
                    <div className="w-13 rounded-full overflow-hidden">
                        <Blobatar
                            name={user?.fullname}
                            background="circle"
                        />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-center gap-2 flex-1">
                        <p>{user?.fullname}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default otherUser
