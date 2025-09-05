import styled from "styled-components";
function CardImgSkeleton() {
  return <Container>이미지 로딩중....</Container>;
}
export default CardImgSkeleton;

const Container = styled.div`
  width: 200px;
  height: 250px;
  border-radius: 8px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;
