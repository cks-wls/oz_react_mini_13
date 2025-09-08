import { useContext, useState } from "react";
import styled from "styled-components";
import ModeContext from "@/context/ModeContext";
import CardImgSkeleton from "@/components/skeleton/CardImgSkeleton";
function MovieCard({ title, vote_average, poster_path, onClick }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  poster_path = imageBaseUrl + poster_path;
  const { mode } = useContext(ModeContext);
  const [imgLoading, setImgLoading] = useState(false);
  return (
    <Card
      onClick={onClick}
      $border={mode === "light" ? "1px solid lightgray" : "1px solid white"}
      $boxShadow={
        mode === "light" ? " 0 10px 12px #0000001a" : "0 0 12px white"
      }
      $hoverShadow={
        mode === "light" ? "0 8px 16px #00000033" : "0 3px 16px white"
      }
    >
      {/* 이미지 로딩상태에 따라 스켈레톤 구현 */}
      {!imgLoading && <CardImgSkeleton />}
      <Img
        src={poster_path}
        alt={title}
        onLoad={() => setImgLoading(true)}
        style={{ display: imgLoading ? "block" : "none" }}
      />
      <Title $color={mode === "light" ? "black" : "white"}>{title}</Title>
      <Average $color={mode === "light" ? "gray" : "white"}>
        ⭐️ {vote_average}
      </Average>
    </Card>
  );
}
export default MovieCard;

const Card = styled.div`
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
