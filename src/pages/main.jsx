import styled from "styled-components";
import getMovieList from "@/lib/api/getMovieList";
import MovieCard from "@/components/main/MovieCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Main() {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getMovieList()
      .then((data) => {
        setMovieList(data);
      })
      .catch(() => setError(true));
  }, []);
  if (error) return <div>에러가 발생했습니다</div>;
  return (
    <Container>
      {movieList.map((val) => (
        <MovieCard
          key={val.id}
          title={val.title}
          vote_average={val.vote_average}
          backdrop_path={val.backdrop_path}
          onClick={() => {
            navigate(`/movies/${val.id}`);
          }}
        />
      ))}
    </Container>
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
