import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar.jsx";
import MessageContainer from "./MessageContainer/MessageContainer.jsx";
import ProfilePanel from "./ProfilePanel.jsx";

const Homepage = () => {
  const { authUser, selectedUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!authUser) navigate("/login", { replace: true });
  }, [authUser, navigate]);

  if (!authUser) return null;

  const profileOnline = profile?.isSelf
    ? true
    : Boolean(profile?.user?._id && onlineUsers.includes(profile.user._id));

  return (
    <div className="relative flex h-dvh w-full overflow-hidden bg-ink-950 text-mist-100">
      <Sidebar onOpenProfile={() => setProfile({ user: authUser, isSelf: true })} />

      <MessageContainer
        onOpenProfile={() =>
          selectedUser && setProfile({ user: selectedUser, isSelf: false })
        }
      />

      {profile && (
        <ProfilePanel
          user={profile.user}
          isSelf={profile.isSelf}
          online={profileOnline}
          onClose={() => setProfile(null)}
        />
      )}
    </div>
  );
};

export default Homepage;
