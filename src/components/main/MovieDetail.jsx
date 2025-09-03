import { useParams } from "react-router-dom";
import styled from "styled-components";
import getMovieDetail from "@/lib/api/getMovieDetail";
import { useEffect, useState } from "react";

function MovieDetail() {
  const { movieId } = useParams();
  const numMovieId = Number(movieId);
  const [movieDetail, setMovieDetail] = useState(null);
  const [error, setError] = useState(false);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const pathUrl = movieDetail ? imageBaseUrl + movieDetail.path : "";
  useEffect(() => {
    getMovieDetail(movieId)
      .then((data) => {
        if (!data) {
          setError(true); // 데이터가 없으면 에러 상태로 설정
        } else {
          setMovieDetail(data);
        }
      })
      .catch(() => setError(true));
  }, [movieId]);
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!movieDetail || movieDetail.id !== numMovieId)
    // movieDetail이 아직 설정되지 않았거나 ID가 일치하지 않는 경우
    return <div>영화 정보가 없습니다.</div>;
  else {
    // movieDetail이 설정되고 ID가 일치하는 경우
    return (
      <Container>
        <Img src={pathUrl} alt={movieDetail.title} />
        <Text>
          <Title>{movieDetail.title}</Title>
          <Average>평점 : {movieDetail.average}</Average>
          <GenreCont>
            {movieDetail.genres.map((val) => {
              return <Genre key={val}>{val}</Genre>;
            })}
          </GenreCont>
          <Script>{movieDetail.overView}</Script>
        </Text>
      </Container>
    );
  }
}
export default MovieDetail;

const Container = styled.div`
  display: flex;
  margin: 30px 5%;
  padding: 40px;
  gap: 30px;
  box-shadow: 0 8px 24px #0000001a;
  border-radius: 10px;
`;
const Img = styled.img`
  width: 300px;
  height: 450px;
  border-radius: 10px;
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Title = styled.h2`
  font-size: 2.4rem;
`;
const Average = styled.p`
  font-size: 1.2rem;
`;
const Script = styled.p`
  font-size: 1rem;
`;
const GenreCont = styled.div`
  display: flex;
  gap: 10px;
`;
const Genre = styled.p`
  padding: 5px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;
