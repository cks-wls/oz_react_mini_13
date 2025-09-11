import styled from "styled-components";
import { profileVarious } from "@/consts/ProfileVarious";
import { useContext } from "react";
import ProfileContext from "@/context/ProfileContext";
import ModeContext from "@/context/ModeContext";
function ProfileChangeModal({ setEditPress }) {
  const { profileSelect, setProfileSelect } = useContext(ProfileContext);
  const { mode } = useContext(ModeContext);
  return (
    <Container>
      <Button onClick={() => setEditPress(false)}>Save</Button>
      <Box $border={mode === "light" ? "1px solid black" : "1px solid white"}>
        {profileVarious.map((val) => (
          <ProfileWrapper key={val} onClick={() => setProfileSelect(val)}>
            <ProfileImg
              src={val}
              $opacity={profileSelect === val ? "0.3" : "1"}
            />
            {profileSelect === val && <CheckMark>✔</CheckMark>}
          </ProfileWrapper>
        ))}
      </Box>
    </Container>
  );
}
export default ProfileChangeModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 90vh;
  position: fixed;
  z-index: 1;
`;
const Box = styled.div`
  border: ${(props) => props.$border};
  padding: 80px;
  gap: 10px;
  border-radius: 10px;
`;
const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: ${(props) => props.$opacity};
  cursor: pointer;
  margin-left: 20px;
`;
const ProfileWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;
const CheckMark = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: green;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 14px;
`;
const Button = styled.button`
  top: 280px;
  left: 300px;
  position: relative;
  padding: 5px;
  border: none;
  background-color: #3b82f6;
  color: white;
`;
