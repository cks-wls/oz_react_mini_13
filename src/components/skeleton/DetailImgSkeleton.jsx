import styled from "styled-components";
function DetailImgSkeleton() {
  return <Container>이미지 로딩중....</Container>;
}
export default DetailImgSkeleton;

const Container = styled.div`
  width: 100%;
  height: 450px;
  border-radius: 10px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;
