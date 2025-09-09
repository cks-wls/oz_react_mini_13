import styled from "styled-components";
import { useState } from "react";
import { useSupabase } from "@/context/SupabaseProvider";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const supabase = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUserName] = useState("");
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  // 추후 비밀번호 검사를 위함
  // 유효성 상태
  const [correct, setCorrect] = useState({
    email: false,
    username: false,
    password: false,
    repeatPassword: false,
    age: false,
    gender: false,
  });
  // 입력 여부 상태
  const [touched, setTouched] = useState({
    email: false,
    username: false,
    password: false,
    repeatPassword: false,
    age: false,
    gender: false,
  });
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!Object.values(correct).every(Boolean)) {
      setTouched((prev) =>
        Object.fromEntries(
          Object.entries(prev).map(([key, value]) => [
            key,
            value || !correct[key], // correct에서 false의 값만 있는항목에 대한 경고 문구 리턴
          ])
        )
      );
      return;
    }
    // 테이블에 회원정보 삽입
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authError) {
      alert(`회원가입 실패`);
    }

    // 가입 성공 후 signup 테이블에 추가 정보 저장
    const { error: profileError } = await supabase.from("signup").insert(
      [
        {
          auth_id: authData.user.id, // Auth와 연결
          username,
          age: Number(age) || null,
          gender,
          password,
          email,
        },
      ],
      { returning: "representation" }
    );
    if (profileError) {
      alert(`회원가입 실패`);
    } else {
      alert("회원가입 성공!");
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Section>
        <Item>이메일</Item>
        <Input
          type="email"
          placeholder="example@domain.com"
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
        <Item>이름</Item>
        <Input
          type="text"
          placeholder="이름"
          value={username}
          onChange={(e) => {
            const valUserName = e.target.value;
            setUserName(valUserName);
            setCorrect((prev) => ({
              ...prev,
              username: valUserName.length > 0,
            }));
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
        />
        {touched.username && !correct.username && (
          <FormWarning>이름은 1자 이상이여야 합니다</FormWarning>
        )}
      </Section>
      <Section>
        <Item>비밀번호</Item>
        <Input
          type="password"
          placeholder="8자 이상. 영어 + 숫자조합 사용"
          value={password}
          onChange={(e) => {
            const passwordVal = e.target.value;
            setPassword(passwordVal);
            setCorrect((prev) => ({
              ...prev,
              password: passwordRegex.test(passwordVal),
              repeatPassword: repeatPassword === passwordVal,
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
      <Section>
        <Item>비밀번호 확인</Item>
        <Input
          type="password"
          placeholder="비밀번호를 한번 더 입력하세요"
          value={repeatPassword}
          onChange={(e) => {
            const repeatPasswordVal = e.target.value;
            setRepeatPassword(repeatPasswordVal);
            setCorrect((prev) => ({
              ...prev,
              repeatPassword: repeatPasswordVal === password,
            }));
          }}
          onBlur={() =>
            setTouched((prev) => ({ ...prev, repeatPassword: true }))
          }
        />
        {touched.repeatPassword && !correct.repeatPassword && (
          <FormWarning>비밀번호가 일치하지 않습니다</FormWarning>
        )}
      </Section>
      <Section>
        <Item>나이</Item>
        <Input
          type="text"
          placeholder="나이"
          value={age}
          onChange={(e) => {
            const ageVal = e.target.value;
            setAge(ageVal);
            setCorrect((prev) => ({
              ...prev,
              age: ageVal !== "" && !isNaN(Number(ageVal)),
            }));
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, age: true }))}
        />
        {touched.age && !correct.age && (
          <FormWarning>숫자 형식이 아닙니다.</FormWarning>
        )}
      </Section>
      <Section>
        <Item>성별</Item>
        <Select
          value={gender}
          onChange={(e) => {
            const genderVal = e.target.value;
            setGender(genderVal);
            setCorrect((prev) => ({
              ...prev,
              gender: genderVal === "male" || genderVal === "female",
            }));
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, gender: true }))}
        >
          <option value="">성별 선택</option>
          <option value="male">남</option>
          <option value="female">여</option>
        </Select>
        {touched.gender && !correct.gender && (
          <FormWarning>성별을 선택해주세요</FormWarning>
        )}
      </Section>
      <ButtonContainer>
        <Button onClick={handleSignUp}>회원가입</Button>
        <Button onClick={() => navigate("/movies")}>취소</Button>
      </ButtonContainer>
    </Container>
  );
}

export default SignUp;
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
const Select = styled.select`
  width: 100%;
  margin: 0 auto;
  padding: 10px 13px;
  border-radius: 8px;
  border: 1px solid lightgray;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;
const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 10px 13px;
  border-radius: 8px;
  width: 50%;
  border: none;
  cursor: pointer;
`;
const FormWarning = styled.div`
  font-size: 0.85rem;
  color: red;
`;
