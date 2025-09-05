import styled from "styled-components";
import getMovieList from "@/lib/api/getMovieList";
import MovieCard from "@/components/main/MovieCard";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import TopMovieCard from "@/components/main/TopMovieCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  return (
    <>
      {/* API 로딩 상태에 따라 로딩 인디케이터 구현 */}
      {isLoading ? (
        <>
          <TopMovieCard />
          <Container>
            {movieList.map((val) => (
              <MovieCard
                key={val.id}
                title={val.title}
                vote_average={val.vote_average}
                poster_path={val.poster_path}
                onClick={() => {
                  navigate(`/movies/${val.id}`);
                }}
              />
            ))}
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
//  추후 스타알 조정할 예정
