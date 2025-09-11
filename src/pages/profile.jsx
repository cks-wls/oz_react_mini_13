import styled from "styled-components";
import LoginContext from "@/context/LoginContext";
import ModeContext from "@/context/ModeContext";
import { useContext, useState } from "react";
import ProfileChangeModal from "@/components/modal/ProfileChangeModal";
import ProfileContext from "@/context/ProfileContext";
function Profile() {
  const { userInfo } = useContext(LoginContext);
  const { mode } = useContext(ModeContext);
  const { profileSelect } = useContext(ProfileContext);
  const [editPress, setEditPress] = useState(false);
  return (
    <>
      {editPress && <ProfileChangeModal setEditPress={setEditPress} />}
      <Container $opacity={editPress ? "0.2" : "1"}>
        <ImgCont>
          <Img
            src={profileSelect}
            $border={mode === "light" ? "none" : "1px solid white"}
          />
          <Button onClick={() => setEditPress(true)}>Edit</Button>
        </ImgCont>
        <TextContainer>
          <EmailCont $color={mode === "light" ? "black" : "white"}>
            이메일
            <Email $color={mode === "light" ? "black" : "white"}>
              {userInfo.email}
            </Email>
          </EmailCont>
          <NameCont $color={mode === "light" ? "black" : "white"}>
            이름
            <Name $color={mode === "light" ? "black" : "white"}>
              {userInfo.username}
            </Name>
          </NameCont>
        </TextContainer>
      </Container>
    </>
  );
}
export default Profile;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  gap: 100px;
  opacity: ${(props) => props.$opacity};
`;
const ImgCont = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Img = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: ${(props) => props.$border};
`;
const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  width: 90px;
  border-radius: 10px;
  border: 1px solid lightgray;
  position: absolute;
  bottom: 0;
  right: 10px;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${(props) => props.$color};
`;
const Email = styled.div`
  font-size: 30px;
  color: ${(props) => props.$color};
`;
const Name = styled.div`
  font-size: 19px;
  color: ${(props) => props.$color};
`;
const EmailCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${(props) => props.$color};
`;
const NameCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${(props) => props.$color};
`;
