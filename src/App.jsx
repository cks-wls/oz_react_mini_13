import { createGlobalStyle } from "styled-components";
import { Routes, Route } from "react-router-dom";
import Main from "@/pages/main";
import Layout from "@/pages/layout";
import MovieDetail from "@/components/main/MovieDetail";
import Latout from "./pages/Layout";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Latout />}>
          <Route index element={<Main />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
        </Route>
      </Routes>
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
`;
