export default async function getMovieList() {
  try {
    const response = await fetch("/data/movieDetailData.json");
    const data = await response.json();
    const id = Number(data.id);
    const path = data.backdrop_path;
    const title = data.title;
    const average = data.vote_average;
    const overView = data.overview;
    const genres = data.genres.map((val) => val.name);
    const details = { id, path, title, average, overView, genres };
    return details;
  } catch {
    return [];
  }
}
//  영화 정보를 받아오는 API -> 쿨푸팬더에 한함
