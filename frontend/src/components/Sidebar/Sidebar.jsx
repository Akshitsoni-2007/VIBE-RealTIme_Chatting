import React, { useState } from 'react';
import OtherUsers from './OtherUsers.jsx';
import axios from 'axios';
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers,setSelectedUser } from '../../redux/userSlice.js';

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(null);
  const { otherUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value.trim()) {
      setFilteredUsers(null);
      return;
    }
    const matched = otherUsers?.filter((user) =>
      user.fullname.toLowerCase().includes(value.toLowerCase())
    );
    if (matched && matched.length > 0) {
      setFilteredUsers(matched);
    } else {
      setFilteredUsers([]);
    }
  }

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`)
      toast.success(res.data.message)
      dispatch(setAuthUser(null))
      dispatch(setSelectedUser(null))
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-85 h-full flex flex-col bg-[#0b0f19] shrink-0 border-r border-white/5 z-10">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-8 pb-5">
        <h1 className="select-none text-2xl font-bold text-white tracking-wide">Chats</h1>
        <button
          onClick={logoutHandler}
          className="select-none text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 active:scale-95 active:bg-gray-900 px-3 py-2 rounded-3xl transition-all duration-100 ease-in-out">
          Logout
        </button>
      </div>
      <div className="px-4 pb-4">
        <div className="relative flex items-center w-full h-11 bg-[#161a27] rounded-full px-4 overflow-hidden border border-transparent focus-within:border-white/10 transition-colors">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={handleSearchChange}
            type="text"
            placeholder="Search conversations..."
            className="select-none w-full bg-transparent border-none outline-none text-[14px] text-white placeholder-gray-500"
          />
          <button type='button' className="text-gray-500 hover:text-gray-300 ml-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>
      </div>

      <OtherUsers users={filteredUsers} />

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
  );
};

export default Sidebar;
