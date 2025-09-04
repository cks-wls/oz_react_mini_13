export default async function getMovieList() {
  try {
    const response = await fetch("/data/movieListData.json");
    const data = await response.json();
    const details = data.results.map(
      ({
        id,
        title,
        poster_path,
        overview,
        vote_average,
        genre_ids,
        release_date,
      }) => ({
        id,
        title,
        poster_path,
        overview,
        vote_average,
        genre_ids,
        release_date,
      })
    );
    return details;
  } catch {
    return [];
  }
}
//  영화 정보를 받아오는 API
