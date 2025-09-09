import styled from "styled-components";
import moon from "@/assets/icons/moon.png";
import sun from "@/assets/icons/sun.png";
import etc from "@/assets/icons/etc.svg";
import searchIcon from "@/assets/icons/search.svg";
import ModeContext from "@/context/ModeContext";
import LoginModal from "@/components/modal/LoginModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import SearchModal from "@/components/modal/SearchModal";
import LoginContext from "@/context/LoginContext";
import profile from "@/assets/images/profile.jpg";
import ProfileModal from "@/components/modal/ProfileModal";
function NavBar() {
  const { mode, toggleMode } = useContext(ModeContext);
  const { loginCondition } = useContext(LoginContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (search) {
      setSearchParams({ movies: search });
    } else {
      setSearchParams({});
    }
  }, [search]);
  return (
    <>
      <Container $bgcolor={mode === "light" ? "black" : "#1c1c1c"}>
        <SearchIcon
          src={searchIcon}
          alt="searchIcon"
          onClick={() => {
            setLoginModalOpen(false);
            setSearchOpen((prev) => !prev);
          }}
        />
        <Title
          onClick={() => {
            navigate("/");
            setSearch("");
          }}
        >
          OZ MOVIE
        </Title>
        <Search
          placeholder="검색어를 입력해주세요"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <LoginContainer>
          <Mode
            onClick={toggleMode}
            $color={mode === "light" ? "white" : "black"}
          >
            <Img src={mode === "light" ? moon : sun} alt="modeIcon" />
          </Mode>
          <Etc
            src={etc}
            alt="altIcon"
            onClick={() => {
              setSearchOpen(false);
              setLoginModalOpen((prev) => !prev);
            }}
          />
          {loginCondition ? (
            <Profile
              src={profile}
              onClick={() => setProfileOpen((prev) => !prev)}
            />
          ) : (
            <>
              <Button onClick={() => navigate("signin")}>로그인</Button>
              <Button onClick={() => navigate("signup")}>회원가입</Button>
            </>
          )}
        </LoginContainer>
      </Container>
      {loginModalOpen && <LoginModal mode={mode} />}
      {searchOpen && <SearchModal mode={mode} />}
      {profileOpen && <ProfileModal setProfileOpen={setProfileOpen} />}
    </>
  );
}
export default NavBar;
const tabletWidth = "768px";

const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.$bgcolor};
  @media screen and (min-width: ${tabletWidth}) {
    width: 95%;
    margin: 0 auto;
  }
`;
const Title = styled.h1`
  color: white;
  cursor: pointer;
`;
const Search = styled.input`
  display: none;
  @media screen and (min-width: ${tabletWidth}) {
    display: block;
    width: 300px;
    border-radius: 5px;
    padding: 10px 0 10px 20px;
  }
`;
const LoginContainer = styled.div`
  display: flex;
  gap: 20px;
`;
const Mode = styled.button`
  background-color: ${(props) => props.$color};
  padding: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  margin-right: 10px;
  cursor: pointer;
`;
const Img = styled.img`
  width: 20px;
  height: 20px;
`;
const Button = styled.button`
  display: none;
  @media screen and (min-width: ${tabletWidth}) {
    display: block;
    padding: 0.5rem 0.5rem;
    color: white;
    background-color: #3b82f6;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }
`;
const Etc = styled.img`
  cursor: pointer;
  @media screen and (min-width: ${tabletWidth}) {
    display: none;
  }
`;
const SearchIcon = styled.img`
  width: 40px;
  cursor: pointer;
  @media screen and (min-width: ${tabletWidth}) {
    display: none;
  }
`;
const Profile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
