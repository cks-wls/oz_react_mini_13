import styled from "styled-components";
function MovieLoading() {
  return <Container>영화 목록 불러오는 중... ⏳</Container>;
}
export default MovieLoading;
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
`;
