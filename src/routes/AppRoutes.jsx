import { Routes, Route } from "react-router-dom";
import Main from "@/pages/main";
import Layout from "@/layout/layout";
import MovieDetail from "@/components/main/MovieDetail";
import Opening from "@/pages/opening";
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import Like from "@/pages/like";
import Profile from "@/pages/profile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Opening />} />
      <Route path="/movies" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path=":movieId" element={<MovieDetail />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="like" element={<Like />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
