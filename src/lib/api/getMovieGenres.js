export default async function getMovieGeners() {
  try {
    const response = await fetch("/data/genres.json");
    const data = await response.json();

    const genres = data.genres.map(({ id, name }) => ({
      id,
      name,
    }));
    return genres;
  } catch {
    return [];
  }
}
//  영화 장르 받아오는 API
