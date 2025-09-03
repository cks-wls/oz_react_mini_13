import styled from "styled-components";
function NavBar() {
  return (
    <Container>
      <Title>OZ MOVIE</Title>
      <Search placeholder="   검색어를 입력해주세요" />
      <LoginContainer>
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
`;
const Title = styled.h1`
  color: white;
`;
const Search = styled.input`
  width: 300px;
  border-radius: 5px;
`;
const LoginContainer = styled.div`
  display: flex;
  gap: 20px;
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
