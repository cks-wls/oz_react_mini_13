import { useState } from "react";
import LoginContext from "@/context/LoginContext";
function LoginProvider({ children }) {
  const [loginCondition, setLoginCondition] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  return (
    <LoginContext.Provider
      value={{ loginCondition, setLoginCondition, userInfo, setUserInfo }}
    >
      {children}
    </LoginContext.Provider>
  );
}
export default LoginProvider;
