import { useParams } from "react-router-dom";
import styled from "styled-components";
import getMovieDetail from "@/lib/api/getMovieDetail";
import { useContext, useEffect, useState } from "react";
import ModeContext from "@/context/ModeContext";

function MovieDetail() {
  const { movieId } = useParams();
  const numMovieId = Number(movieId);
  const [movieDetail, setMovieDetail] = useState(null);
  const [error, setError] = useState(false);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const pathUrl = movieDetail ? imageBaseUrl + movieDetail.path : "";
  const { mode } = useContext(ModeContext);
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
      <Container
        $border={mode === "light" ? "1px solid lightgray" : "1px solid white"}
        $boxshadow={
          mode === "light" ? "0 8px 24px #0000001a" : "0 0 24px white"
        }
      >
        <Img src={pathUrl} alt={movieDetail.title} />
        <Text>
          <Title $color={mode === "light" ? "black" : "white"}>
            {movieDetail.title}
          </Title>
          <Average $color={mode === "light" ? "black" : "white"}>
            ⭐️ {movieDetail.average}
          </Average>
          <GenreCont>
            {movieDetail.genres.map((val) => {
              return <Genre key={val}>{val}</Genre>;
            })}
          </GenreCont>
          <Script $color={mode === "light" ? "black" : "white"}>
            {movieDetail.overView}
          </Script>
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
  gap: 40px;
  box-shadow: ${(props) => props.$boxshadow};
  border-radius: 10px;
  border: ${(props) => props.$border};
`;
const Img = styled.img`
  width: 300px;
  height: 450px;
  border-radius: 10px;
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Title = styled.h2`
  font-size: 2.4rem;
  color: ${(props) => props.$color};
`;
const Average = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.$color};
`;
const Script = styled.p`
  font-size: 1rem;
  color: ${(props) => props.$color};
`;
const GenreCont = styled.div`
  display: flex;
  gap: 10px;
`;
const Genre = styled.p`
  padding: 6px 14px;
  background-color: #e6f0ff;
  color: #1a3c6b;
  font-size: 13px;
  border-radius: 20px;
`;
