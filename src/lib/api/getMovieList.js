export default async function getMovieList() {
  try {
    const response = await fetch("/data/movieListData.json");
    const data = await response.json();

    const movies = data.results.map(
      ({ id, title, vote_average, poster_path }) => ({
        id,
        title,
        vote_average,
        poster_path,
      })
    );
    return movies;
  } catch {
    return [];
  }
}
//  영화 리스트를 받아오는 API
