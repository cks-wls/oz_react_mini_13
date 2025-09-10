import styled from "styled-components";
import LoginContext from "@/context/LoginContext";
import ModeContext from "@/context/ModeContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
function ProfileModal({ setProfileOpen }) {
  const { setLoginCondition, userInfo } = useContext(LoginContext);
  const { mode } = useContext(ModeContext);
  const navigate = useNavigate();
  console.log(userInfo);
  return (
    <Container>
      <Box
        $border={mode === "light" ? "1px solid lightgray" : "1px solid white"}
        $boxShadow={
          mode === "light" ? " 0 10px 12px #0000001a" : "0 0 12px white"
        }
      >
        <Email>
          환영합니다, <Name>{userInfo.username} </Name>님!
        </Email>
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
  width: 150px;
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
const Email = styled.div`
  padding-bottom: 5px;
  border-bottom: 1px solid white;
`;

const Profile = styled.div`
  padding: 5px 0;
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
const Name = styled.span`
  color: skyblue;
`;
