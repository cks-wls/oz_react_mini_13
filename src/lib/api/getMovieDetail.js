const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
export default async function getMovieList(id) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };
  try {
    // 인기 영화
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
      options
    );
    const data = await response.json();

    return {
      id: data.id,
      title: data.title,
      poster_path: data.poster_path,
      overview: data.overview,
      vote_average: data.vote_average,
      genre_ids: data.genres?.map((g) => g.id) || [],
      release_date: data.release_date,
    };
  } catch (error) {
    console.error("getMovieDetail error:", error);
    return null;
  }
}
