import { useContext, useState } from "react";
import styled from "styled-components";
import { useSupabase } from "@/context/SupabaseProvider";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "@/context/LoginContext";
import ModeContext from "@/context/ModeContext";
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
  const { setLoginCondition, setUserInfo } = useContext(LoginContext);
  const { mode } = useContext(ModeContext);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const handleSignIn = async () => {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("로그인 실패: " + error.message);
      return;
    }

    // 로그인 성공
    alert("로그인 성공!");
    setLoginCondition(true);

    // 유저 auth_id 가져오기
    const userId = authData.user.id;

    // signup 테이블에서 추가 정보 가져오기
    const { data: profile, error: profileError } = await supabase
      .from("signup")
      .select("username, email")
      .eq("auth_id", userId)
      .maybeSingle();
    if (profileError) {
      setUserInfo({ username: "", email: authData.user.email });
    } else if (!profile) {
      // auth_id로 조회 실패
      setUserInfo({ username: "", email: authData.user.email });
    } else {
      setUserInfo({ username: profile.username, email: profile.email });
    }

    navigate("/movies"); // 로그인 후 이동할 페이지
  };
  return (
    <Container
      $border={mode === "light" ? "1px solid lightgray" : "1px solid white"}
      $boxShadow={
        mode === "light" ? " 0 10px 12px #0000001a" : "0 0 12px white"
      }
    >
      <Title $color={mode === "light" ? "black" : "white"}>로그인</Title>
      <Section>
        <Item $color={mode === "light" ? "black" : "white"}>이메일</Item>
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
        <Item $color={mode === "light" ? "black" : "white"}>비밀번호</Item>
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
      <Guide $color={mode === "light" ? "black" : "white"}>
        오즈무비가 처음이신가요?{" "}
        <Link to="/signup" style={{ textDecoration: "none", color: "#3b82f6" }}>
          회원가입{" "}
        </Link>
      </Guide>
    </Container>
  );
}
export default SignInPage;
const tabletWidth = "768px";
const Container = styled.div`
  width: 400px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: ${(props) => props.$border};
  box-shadow: ${(props) => props.$boxShadow};
  border-radius: 8px;
  @media screen and (min-width: ${tabletWidth}) {
    width: 600px;
  }
`;
const Title = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  color: ${(props) => props.$color};
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 24px;
`;
const Item = styled.h3`
  font-size: 1rem;
  color: ${(props) => props.$color};
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
  color: ${(props) => props.$color};
`;
