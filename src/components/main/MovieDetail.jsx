import { useParams } from "react-router-dom";
import styled from "styled-components";
import getMovieDetail from "@/lib/api/getMovieDetail";
import getMovieGenres from "@/lib/api/getMovieGenres";
import { useContext, useEffect, useState } from "react";
import ModeContext from "@/context/ModeContext";
import DetailImgSkeleton from "@/components/skeleton/DetailImgSkeleton";
import LoadingIndicator from "@/components/common/LoadingIndicator";

function MovieDetail() {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [genre, setGenre] = useState([]);
  const [error, setError] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const { mode } = useContext(ModeContext);

  useEffect(() => {
    getMovieDetail(movieId)
      .then((data) => {
        if (!data) setError(true);
        else {
          setMovieDetail(data);
          setIsLoading(true);
        }
      })
      .catch(() => setError(true));
  }, [movieId]);
  // movieId 존재하지 않을시 에러 발생
  useEffect(() => {
    getMovieGenres().then((data) => {
      setGenre(data);
    });
  }, []);
  // 장르 데이터 가지고 옴

  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      {!isLoading ? (
        <LoadingIndicator />
      ) : (
        movieDetail && (
          <Container
            key={movieDetail.id}
            $border={
              mode === "light" ? "1px solid lightgray" : "1px solid white"
            }
            $boxshadow={
              mode === "light" ? "0 8px 24px #0000001a" : "0 0 24px white"
            }
          >
            {/* 이미지 로딩상태에 따른 스켈레톤 구현 */}
            {!imgLoading && <DetailImgSkeleton />}
            <Img
              src={imageBaseUrl + movieDetail.poster_path}
              alt={movieDetail.title}
              onLoad={() => setImgLoading(true)}
              style={{ display: imgLoading ? "block" : "none" }}
            />
            <Text>
              <Title $color={mode === "light" ? "black" : "white"}>
                {movieDetail.title}
              </Title>
              <Average $color={mode === "light" ? "black" : "white"}>
                ⭐️ {movieDetail.vote_average}
              </Average>
              <GenreCont>
                {movieDetail.genre_ids.map((genreId) => {
                  const matched = genre.find((g) => g.id === genreId);
                  return matched ? (
                    <Genre key={genreId}>{matched.name}</Genre>
                  ) : null;
                })}
              </GenreCont>
              <Script $color={mode === "light" ? "black" : "white"}>
                {movieDetail.overview}
              </Script>
              <Date $color={mode === "light" ? "black" : "white"}>
                출시일 : {movieDetail.release_date}
              </Date>
            </Text>
          </Container>
        )
      )}
    </>
  );
}

export default MovieDetail;
const tabletWidth = "768px";
const desktopWidth = "1025px";
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 30px 5%;
  padding: 40px;
  gap: 40px;
  box-shadow: ${(props) => props.$boxshadow};
  border-radius: 10px;
  border: ${(props) => props.$border};
  @media screen and (min-width: ${tabletWidth}) {
    flex-direction: row;
  }
`;
const Img = styled.img`
  width: 222px;
  height: 316px;
  margin: 0 auto;
  border-radius: 10px;
  @media screen and (min-width: ${tabletWidth}) {
    width: 300px;
    height: 450px;
    margin: 0;
  }
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
  line-height: 28px;
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
const Date = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.$color};
  @media screen and (min-width: ${desktopWidth}) {
    position: absolute;
    bottom: 40px;
  }
`;
