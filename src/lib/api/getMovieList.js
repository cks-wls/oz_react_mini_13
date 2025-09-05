const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
export default async function getMovieList() {
  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    };
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
      options
    );

    const data = await response.json();

    const movies = data.results
      .filter((val) => val.adult === false)
      // 성인영화가 아닌것만 가져오게 설정
      .map(({ id, title, vote_average, poster_path }) => ({
        id,
        title,
        vote_average,
        poster_path,
      }));
    return movies;
  } catch {
    return [];
  }
}
//  영화 리스트를 받아오는 API
