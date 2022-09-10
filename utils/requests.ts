const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
  fetchTVComedies: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=35`,
  fetchCrimeTVShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=80`,
  fetchTVDramas: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=18`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchNewReleases: `${BASE_URL}/trending/all/day?api_key=${API_KEY}`,
  fetchFantasy: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10765`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
};

export default requests;
