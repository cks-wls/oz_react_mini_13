import styled from "styled-components";
import moon from "@/assets/icons/moon.png";
import sun from "@/assets/icons/sun.png";
import ModeContext from "@/context/ModeContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
function NavBar() {
  const { mode, toggleMode } = useContext(ModeContext);
  const navigate = useNavigate();
  return (
    <Container $bgcolor={mode === "light" ? "black" : "#1c1c1c"}>
      <Title onClick={() => navigate("/")}>OZ MOVIE</Title>
      <Search placeholder="검색어를 입력해주세요" />
      <LoginContainer>
        <Mode
          onClick={toggleMode}
          $color={mode === "light" ? "white" : "black"}
        >
          <Img src={mode === "light" ? moon : sun} alt="modeIcon" />
        </Mode>
        <Button>로그인</Button>
        <Button>회원가입</Button>
      </LoginContainer>
    </Container>
  );
}
export default NavBar;
const Container = styled.div`
  margin: 0 auto;
  width: 95%;
  background-color: black;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.$bgcolor};
`;
const Title = styled.h1`
  color: white;
  cursor: pointer;
`;
const Search = styled.input`
  width: 300px;
  border-radius: 5px;
  padding-left: 20px;
`;
const LoginContainer = styled.div`
  display: flex;
  gap: 20px;
`;
const Mode = styled.button`
  background-color: ${(props) => props.$color};
  padding: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  margin-right: 10px;
  cursor: pointer;
`;
const Img = styled.img`
  width: 20px;
  height: 20px;
`;
const Button = styled.button`
  padding: 0.5rem 0.5rem;
  color: white;
  background-color: #3b82f6;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;
