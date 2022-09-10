const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
  fetchTrendingMovie: `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
  fetchTrendingTV: `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`,
  fetchTVComedies: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=35`,
  fetchCrimeTVShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=80`,
  fetchTVDramas: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=18`,
  fetchTVAnime: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`,
  fetchTVAction: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10759`,
  fetchTVLatestToday: `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&page=1`,
  fetchTVTopRated: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchTVPopular: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`,
  fetchMoviePopular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
  fetchIndianTVShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=hi-IN&region=IN&sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=hi`,
  fetchUSTVShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&region=US&sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=en`,
  fetchTVAiringToday: `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchNewReleases: `${BASE_URL}/trending/all/day?api_key=${API_KEY}`,
  fetchFantasy: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10765`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  fetchNowPlaying: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
  fetchUpcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  fetchIndianMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=hi-IN&region=IN&sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=hi`,
  fetchUSMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US`,
};

export default requests;
