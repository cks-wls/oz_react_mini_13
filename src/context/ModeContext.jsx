import { createContext } from "react";

const ModeContext = createContext({
  mode: "light",
  toggleMode: () => {},
});
export default ModeContext;
