import styled from "styled-components";
import LoginContext from "@/context/LoginContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
function ProfileModal({ setProfileOpen }) {
  const { loginCondition, setLoginCondition } = useContext(LoginContext);
  const navigate = useNavigate();
  return (
    <Container>
      <Box>
        <Like onClick={() => navigate("/movies/like")}>관심 목록</Like>
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
  background-color: gray;
  width: 8%;
  position: relative;
  color: white;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  bottom: 10px;
  right: 80px;
  font-weight: 400;
`;
const Like = styled.div`
  text-align: center;
  cursor: pointer;
`;
const Logout = styled.div`
  text-align: center;
  cursor: pointer;
`;
