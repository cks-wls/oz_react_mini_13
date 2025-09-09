import { useState } from "react";
import LoginContext from "@/context/LoginContext";
function LoginProvider({ children }) {
  const [loginCondition, setLoginCondition] = useState(false);
  return (
    <LoginContext.Provider value={{ loginCondition, setLoginCondition }}>
      {children}
    </LoginContext.Provider>
  );
}
export default LoginProvider;
