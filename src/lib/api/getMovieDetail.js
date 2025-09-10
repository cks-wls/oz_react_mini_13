const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
export default async function getMovieList() {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };
  try {
    // 인기 영화
    const popularResponse = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
      options
    );
    const popularData = await popularResponse.json();

    const rankedResponse = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1",
      options
    );
    const rankedData = await rankedResponse.json();

    const details = [...popularData.results, ...rankedData.results].map(
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
