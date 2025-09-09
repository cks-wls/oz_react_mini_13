import styled from "styled-components";
import LoginContext from "@/context/LoginContext";
import ModeContext from "@/context/ModeContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
function ProfileModal({ setProfileOpen }) {
  const { loginCondition, setLoginCondition } = useContext(LoginContext);
  const { mode } = useContext(ModeContext);
  const navigate = useNavigate();
  return (
    <Container>
      <Box
        $border={mode === "light" ? "1px solid lightgray" : "1px solid white"}
        $boxShadow={
          mode === "light" ? " 0 10px 12px #0000001a" : "0 0 12px white"
        }
      >
        <Profile
          onClick={() => {
            navigate("/movies/profile");
            setProfileOpen(false);
          }}
        >
          프로필 정보
        </Profile>
        <Like
          onClick={() => {
            navigate("/movies/like");
            setProfileOpen(false);
          }}
        >
          관심 목록
        </Like>
        <Logout
          onClick={() => {
            setLoginCondition(false);
            alert("로그아웃 되었습니다.");
            setProfileOpen(false);
          }}
        >
          로그아웃
        </Logout>
      </Box>
    </Container>
  );
}
export default ProfileModal;
const Container = styled.div`
  display: flex;
  justify-content: end;
`;
const Box = styled.div`
  background-color: #3b3b3b;
  width: 100px;
  position: relative;
  color: white;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  bottom: 10px;
  right: 50px;
  font-weight: 400;
  font-size: 14px;
  border-radius: 10px;
  border: ${(props) => props.$border};
  box-shadow: ${(props) => props.$boxShadow};
  align-items: center;
`;
const Profile = styled.div`
  padding-bottom: 5px;
  cursor: pointer;
`;
const Like = styled.div`
  padding-bottom: 5px;
  cursor: pointer;
`;
const Logout = styled.div`
  cursor: pointer;
  color: red;
`;
