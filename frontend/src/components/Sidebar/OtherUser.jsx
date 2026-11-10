import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/userSlice";
import Avatar from "../Avatar.jsx";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isSelected = selectedUser?._id === user?._id;
  const isOnline = onlineUsers.includes(user?._id);

  return (
    <button
      type="button"
      onClick={() => dispatch(setSelectedUser(user))}
      aria-current={isSelected ? "true" : undefined}
      data-active={isSelected}
      className="rail-row"
    >
      {isSelected && (
        <span className="absolute left-1 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-accent-400" />
      )}

      <Avatar user={user} size={44} online={isOnline} dotRing="#0b0e16" />

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14.5px] font-medium leading-tight">
          {user.fullname}
        </span>
        <span className="mt-1 block truncate text-[12.5px] leading-none text-mist-500">
          @{user.username}
        </span>
      </span>
    </button>
  );
};

export default OtherUser;
