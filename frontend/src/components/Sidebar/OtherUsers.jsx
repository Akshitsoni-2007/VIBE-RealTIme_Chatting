import React from "react";
import OtherUser from "./OtherUser.jsx";
import useGetOtherUsers from "../../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = ({ users }) => {

    useGetOtherUsers();
    const { otherUsers } = useSelector(store => store.user);
    const displayUsers = users ?? otherUsers;
    if (!displayUsers) return;

    return (
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
            {
                displayUsers?.map((user) => (
                    <OtherUser key={user._id} user={user} />
                ))
            }
        </div>
    );
};

export default OtherUsers;