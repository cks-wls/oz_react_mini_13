import { createGlobalStyle } from "styled-components";
import AppRoutes from "@/routes/AppRoutes";
import ModeContext from "@/context/ModeContext";
import { useContext } from "react";

function App() {
  const { mode } = useContext(ModeContext);
  return (
    <>
      <GlobalStyle $bgColor={mode === "light" ? "white" : "black"} />
      <AppRoutes />
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
 * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  background-color: ${(props) => props.$bgColor};
}
`;
