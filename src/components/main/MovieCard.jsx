import styled from "styled-components";
function MovieCard({ title, vote_average, poster_path, onClick }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  poster_path = imageBaseUrl + poster_path;
  return (
    <Card onClick={onClick}>
      <Img src={poster_path} alt={title} />
      <Title>{title}</Title>
      <Average>평점 : {vote_average}</Average>
    </Card>
  );
}
export default MovieCard;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid lightgray;
  cursor: pointer;
`;
const Img = styled.img`
  width: 200px;
  height: 250px;
`;
const Title = styled.h2`
  font-size: 15px;
  padding-left: 10px;
`;
const Average = styled.p`
  padding-left: 10px;
  font-size: 12px;
  color: gray;
`;
