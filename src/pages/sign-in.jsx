import { useContext, useState } from "react";
import styled from "styled-components";
import { useSupabase } from "@/context/SupabaseProvider";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "@/context/LoginContext";
function SignInPage() {
  const supabase = useSupabase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correct, setCorrect] = useState({
    email: false,
    password: false,
  });
  // 입력 여부 상태
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const { loginCondition, setLoginCondition } = useContext(LoginContext);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("로그인 실패: " + error.message);
      return;
    }
    alert("로그인 성공!");
    setLoginCondition(true);
    navigate("/movies"); // 로그인 후 이동할 페이지
  };
  return (
    <Container>
      <Title>로그인</Title>
      <Section>
        <Item>비밀번호</Item>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => {
            const valEmail = e.target.value; // 현재 입력값
            setEmail(valEmail);
            setCorrect((prev) => ({ ...prev, email: valEmail.includes("@") }));
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
        />
        {touched.email && !correct.email && (
          <FormWarning>올바른 이메일 형식을 입력하세요</FormWarning>
        )}
      </Section>
      <Section>
        <Item>비밀번호</Item>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => {
            const passwordVal = e.target.value;
            setPassword(passwordVal);
            setCorrect((prev) => ({
              ...prev,
              password: passwordRegex.test(passwordVal),
            }));
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
        />
        {touched.password && !correct.password && (
          <FormWarning>
            비밀번호는 영어와 숫자를 포함해 8자 이상이어야 합니다
          </FormWarning>
        )}
      </Section>
      <Button onClick={handleSignIn}>로그인</Button>
      <Guide>
        오즈무비가 처음이신가요?{" "}
        <Link to="/signup" style={{ textDecoration: "none" }}>
          회원가입{" "}
        </Link>
      </Guide>
    </Container>
  );
}
export default SignInPage;
const Container = styled.div`
  width: 40%;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  box-shadow: 0 4px 12px #0000001a;
  border-radius: 8px;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 1.8rem;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 24px;
`;
const Item = styled.h3`
  font-size: 1rem;
`;
const Input = styled.input`
  width: 100%;
  margin: 0 auto;
  padding: 10px 13px;
  border-radius: 8px;
  border: 1px solid lightgray;
`;
const FormWarning = styled.div`
  font-size: 0.85rem;
  color: red;
`;
const Button = styled.button`
  background-color: #3b82f6;
  margin: 20px 0;
  color: white;
  padding: 10px 13px;
  border-radius: 8px;
  width: 100%;
  border: none;
  cursor: pointer;
`;
const Guide = styled.p`
  text-align: center;
`;
