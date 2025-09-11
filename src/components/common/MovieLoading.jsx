import styled from "styled-components";
import ModeContext from "@/context/ModeContext";
import { useContext } from "react";
function MovieLoading() {
  const { mode } = useContext(ModeContext);
  return (
    <Container $color={mode === "light" ? "black" : "white"}>
      영화 목록 불러오는 중... ⏳
    </Container>
  );
}
export default MovieLoading;
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
  color: ${(props) => props.$color};
`;
