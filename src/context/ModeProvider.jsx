import { useState } from "react";
import ModeContext from "@/context/ModeContext";
function ModeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export default ModeProvider;
