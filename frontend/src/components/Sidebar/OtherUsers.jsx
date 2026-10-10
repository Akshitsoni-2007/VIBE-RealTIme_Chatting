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
        <div className="overflow-auto scrollbar-hidden">
            {
                displayUsers?.map((user) => (
                    <OtherUser key={user._id} user={user} />
                ))
            }
        </div>
    );
};

export default OtherUsers;