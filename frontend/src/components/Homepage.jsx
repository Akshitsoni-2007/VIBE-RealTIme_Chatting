import React from 'react';
import Sidebar from './Sidebar/Sidebar.jsx';
import MessageContainer from './MessageContainer/MessageContainer.jsx';

const Homepage = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#090b14] text-white font-sans">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Homepage;
