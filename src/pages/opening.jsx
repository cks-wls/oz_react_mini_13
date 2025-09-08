import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
function Opening() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/movies");
    }, 2000);
  }, []);
  return (
    <Container>
      <Title>OZ MOVIE</Title>
    </Container>
  );
}
export default Opening;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  height: 100vh;
`;
const Title = styled.h1`
  color: white;
  font-size: 90px;
  animation: opening 1s ease;
  @keyframes opening {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
