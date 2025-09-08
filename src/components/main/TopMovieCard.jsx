import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import ModeContext from "@/context/ModeContext";
import CardImgSkeleton from "@/components/skeleton/CardImgSkeleton";
import getMovieTopRated from "@/lib/api/getMovieTopRated";
import { useNavigate } from "react-router-dom";
function TopMovieCard() {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const { mode } = useContext(ModeContext);
  const [error, setError] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [topMovie, setTopMovie] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getMovieTopRated()
      .then((data) => {
        setTopMovie(data.slice(0, 10));
        // 1~10위만 추출하기 위함
      })
      .catch(() => {
        setError(true);
      });
  }, []);
  if (error) return <div>에러가 발생했습니다</div>;
  return (
    <Container
      $border={mode === "light" ? "1px solid lightgray" : "1px solid white"}
      $boxShadow={
        mode === "light" ? " 0 10px 12px #0000001a" : "0 0 12px white"
      }
    >
      <SectionTitle $color={mode === "light" ? "black" : "white"}>
        인기순
      </SectionTitle>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={85}
        slidesPerView={4}
        navigation
      >
        <CardContainer>
          {topMovie.map((val, index) => {
            return (
              <Card
                key={val.id}
                $border={
                  mode === "light" ? "1px solid lightgray" : "1px solid white"
                }
                $boxShadow={
                  mode === "light" ? " 0 10px 12px #0000001a" : "0 0 12px white"
                }
                $hoverShadow={
                  mode === "light" ? "0 8px 16px #00000033" : "0 3px 16px white"
                }
                onClick={() => {
                  navigate(`/movies/${val.id}`);
                }}
              >
                <Rating>{`Top ${index + 1}`}</Rating>
                {/* 이미지 로딩상태에 따라 스켈레톤 구현 */}
                {!imgLoading && <CardImgSkeleton />}
                <Img
                  src={imageBaseUrl + val.poster_path}
                  alt={val.title}
                  onLoad={() => setImgLoading(true)}
                  style={{ display: imgLoading ? "block" : "none" }}
                />
                <Title $color={mode === "light" ? "black" : "white"}>
                  {val.title}
                </Title>
                <Average $color={mode === "light" ? "gray" : "white"}>
                  ⭐️ {val.vote_average}
                </Average>
              </Card>
            );
          })}
        </CardContainer>
      </Swiper>
    </Container>
  );
}

export default TopMovieCard;

const Container = styled.div`
  width: 80%;
  margin: 30px auto;
  padding: 1rem 1.5rem;
  border: 1px solid black;
  border-radius: 8px;
  border: ${(props) => props.$border};
  box-shadow: ${(props) => props.$boxShadow};
`;
const CardContainer = styled.div`
  display: flex;
  margin: 30px 0;
`;
const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${(props) => props.$color};
  margin-bottom: 20px;
`;
const Card = styled(SwiperSlide)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 222px;
  padding: 10px;
  gap: 10px;
  border-radius: 8px;
  border: ${(props) => props.$border};
  box-shadow: ${(props) => props.$boxShadow};
  transition: transform 0.2s ease 0s, box-shadow 0.2s ease 0s;
  cursor: pointer;
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${(props) => props.$hoverShadow};
  }
`;
const Img = styled.img`
  width: 200px;
  height: 300px;
  border-radius: 8px;
`;
const Title = styled.h2`
  font-size: 15px;
  color: ${(props) => props.$color};
`;
const Average = styled.p`
  text-align: right;
  font-size: 14px;
  color: ${(props) => props.$color};
`;
const Rating = styled.span`
  position: absolute;
  width: 30%;
  padding: 4px 8px;
  border-radius: 8px;
  text-align: center;
  left: 15px;
  top: 15px;
  z-index: 1;
  background-color: red;
  color: #ffffff;
`;
