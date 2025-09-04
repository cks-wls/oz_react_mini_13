import styled from "styled-components";
function MovieCard({ title, vote_average, poster_path, onClick }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  poster_path = imageBaseUrl + poster_path;
  return (
    <Card onClick={onClick}>
      <Img src={poster_path} alt={title} />
      <Title>{title}</Title>
      <Average>⭐️ {vote_average}</Average>
    </Card>
  );
}
export default MovieCard;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  border-radius: 8px;
  box-shadow: 0 10px 12px #0000001a;
  transition: transform 0.2s ease 0s, box-shadow 0.2s ease 0s;
  cursor: pointer;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px #00000033;
  }
`;
const Img = styled.img`
  width: 200px;
  height: 250px;
  border-radius: 8px;
`;
const Title = styled.h2`
  font-size: 15px;
`;
const Average = styled.p`
  text-align: right;
  font-size: 14px;
  color: gray;
`;
