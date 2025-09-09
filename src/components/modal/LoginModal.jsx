import styled from "styled-components";
import { useNavigate } from "react-router-dom";
function LoginModal({ mode }) {
  const navigate = useNavigate();
  return (
    <Container $bgcolor={mode === "light" ? "black" : "#1c1c1c"}>
      <Button onClick={() => navigate("/signin")}>로그인</Button>
      <Button onClick={() => navigate("/signup")}>회원가입</Button>
    </Container>
  );
}

export default LoginModal;

const tabletWidth = "768px";
const Container = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: ${(props) => props.$bgcolor};
  animation: slideDown 0.5s ease;
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media screen and (min-width: ${tabletWidth}) {
    display: none;
  }
`;
const Button = styled.button`
  cursor: pointer;
  width: 80%;
  margin: 0 auto;
  padding: 1rem 1rem;
  color: white;
  background-color: #3b82f6;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  @media screen and (min-width: ${tabletWidth}) {
    display: none;
  }
`;
