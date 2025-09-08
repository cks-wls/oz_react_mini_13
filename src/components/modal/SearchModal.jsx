import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
function SearchModal({ mode }) {
  const [searchResult, setSearchResult] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchResult) {
      setSearchParams({ movies: searchResult });
    } else {
      setSearchParams({});
    }
  }, [searchResult]);
  return (
    <Container $bgcolor={mode === "light" ? "black" : "#1c1c1c"}>
      <Search
        placeholder="검색어를 입력해주세요"
        onChange={(e) => setSearchResult(e.target.value)}
        value={searchResult}
      />
    </Container>
  );
}

export default SearchModal;

const tabletWidth = "768px";
const Container = styled.div`
  padding: 20px 0;
  background-color: ${(props) => props.$bgcolor};
  display: flex;
  animation: slideDown 0.5s ease;
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media screen and (min-width: ${tabletWidth}) {
    display: none;
  }
  @media screen and (min-width: ${tabletWidth}) {
    display: none;
  }
`;
const Search = styled.input`
  width: 90%;
  margin: 0 auto;
  border-radius: 8px;
  padding: 10px 0 10px 20px;
`;
