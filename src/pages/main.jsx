import styled from "styled-components";
import getMovieList from "@/lib/api/getMovieList";
import MovieCard from "@/components/main/MovieCard";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import TopMovieCard from "@/components/main/TopMovieCard";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "@/lib/hook/useDebounce";
import DebouncingComponent from "@/components/common/DebouncingComponent";
import NotExist from "@/components/common/NotExist";

function Main() {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("movies") || "";
  const debounce = useDebounce(query);
  const navigate = useNavigate();
  useEffect(() => {
    getMovieList()
      .then((data) => {
        setMovieList(data);
        setIsLoading(true);
      })
      .catch(() => setError(true));
  }, []);
  if (error) return <div>에러가 발생했습니다</div>;
  const fuse = new Fuse(movieList, {
    keys: ["title"],
    threshold: 0.3,
  });
  const filteredMovies =
    query === ""
      ? movieList // 검색창이 비어있으면 전체 영화
      : debounce
      ? fuse.search(query).map((result) => result.item)
      : [];
  return (
    <>
      {/* API 로딩 상태에 따라 로딩 인디케이터 구현 */}
      {isLoading ? (
        <>
          {/* 만약 쿼리 값이 존재한다면 인기순 컴포넌트 안보이게 */}
          {!query && <TopMovieCard />}
          <Container>
            {/* 쿼리가 존재하지만 아직 디바운싱중일때 */}
            {query && debounce === "" ? (
              <DebouncingComponent />
            ) : // 디바운싱끝났을때
            query !== "" && filteredMovies.length === 0 ? (
              // 디바운싱이 끝났지만 일치하는 경우가 없을 때
              <NotExist />
            ) : (
              // 일치하는 경우가 있을때
              filteredMovies.map((val) => (
                <MovieCard
                  key={val.id}
                  title={val.title}
                  vote_average={val.vote_average}
                  poster_path={val.poster_path}
                  onClick={() => {
                    navigate(`/movies/${val.id}`);
                  }}
                />
              ))
            )}
          </Container>
        </>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}
export default Main;
const Container = styled.div`
  margin: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;
