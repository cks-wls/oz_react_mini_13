import { Routes, Route } from "react-router-dom";
import Main from "@/pages/main";
import Layout from "@/layout/layout";
import MovieDetail from "@/components/main/MovieDetail";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
