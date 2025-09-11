import { useState } from "react";
import ProfileContext from "@/context/ProfileContext";
import defaultImg from "@/assets/images/profile.jpg";

function ProfileProvider({ children }) {
  const [profileSelect, setProfileSelect] = useState(defaultImg);
  return (
    <ProfileContext.Provider value={{ profileSelect, setProfileSelect }}>
      {children}
    </ProfileContext.Provider>
  );
}
export default ProfileProvider;
