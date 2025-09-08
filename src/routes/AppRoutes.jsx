import { Routes, Route } from "react-router-dom";
import Main from "@/pages/main";
import Layout from "@/layout/layout";
import MovieDetail from "@/components/main/MovieDetail";
import Opening from "@/pages/opening";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Opening />} />
      <Route path="/movies" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path=":movieId" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
