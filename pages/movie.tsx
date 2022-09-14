import Head from "next/head";
import { useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Row from "../components/Row";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";
import useSubscription from "../hooks/useSubsription";
import { Movie } from "../typings";
import requests from "../utils/requests";

interface Props {
  trendingMovie: Movie[];
  movieTopRated: Movie[];
  movieAction: Movie[];
  movieComedies: Movie[];
  movieHorror: Movie[];
  movieRomance: Movie[];
  movieDocumentary: Movie[];
  movieIndia: Movie[];
  movieNowPlaying: Movie[];
  moviePopular: Movie[];
}

const MoviePage = ({
  trendingMovie,
  movieTopRated,
  movieAction,
  movieComedies,
  movieHorror,
  movieRomance,
  movieDocumentary,
  movieIndia,
  movieNowPlaying,
  moviePopular,
}: Props) => {
  const { user, loading } = useAuth();
  const subscription = useSubscription(user);
  const showModal = useRecoilValue(modalState);
  const movie = useRecoilValue(movieState);
  const list = useList(user?.uid);

  if (loading || subscription === null) return null;

  return (
    <div
      className={`relative bg-gradient-to-b from-gray-900/10 to-[#010511] h-max ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>
          {movie?.title || movie?.original_name || "Movies"} - Netflix
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
        <Banner movieBanner={moviePopular} />

        <section className="md:space-y-24">
          {list.length > 0 && <Row title="My List" movies={list} />}
          <Row title="Trending Now" movies={trendingMovie} />
          <Row title="Now Playing" movies={movieNowPlaying} />
          <Row title="Desi & Chill" movies={movieIndia} />
          <Row title="Comedies" movies={movieComedies} />
          <Row title="Horror" movies={movieHorror} />
          <Row title="Top Rated" movies={movieTopRated} />
          <Row title="Romance" movies={movieRomance} />
          <Row title="Action & Adventure" movies={movieAction} />
          <Row title="Documentary" movies={movieDocumentary} />
        </section>
      </main>
      {showModal && <Modal />}
      <Footer />
    </div>
  );
};

export default MoviePage;

export const getServerSideProps = async () => {
  const [
    trendingMovie,
    movieTopRated,
    movieAction,
    movieComedies,
    movieHorror,
    movieRomance,
    movieDocumentary,
    movieIndia,
    movieNowPlaying,
    moviePopular,
  ] = await Promise.all([
    fetch(requests.fetchTrendingMovie).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
    fetch(requests.fetchIndianMovies).then((res) => res.json()),
    fetch(requests.fetchNowPlaying).then((res) => res.json()),
    fetch(requests.fetchMoviePopular).then((res) => res.json()),
  ]);

  return {
    props: {
      trendingMovie: trendingMovie.results,
      movieTopRated: movieTopRated.results,
      movieAction: movieAction.results,
      movieComedies: movieComedies.results,
      movieHorror: movieHorror.results,
      movieRomance: movieRomance.results,
      movieDocumentary: movieDocumentary.results,
      movieIndia: movieIndia.results,
      movieNowPlaying: movieNowPlaying.results,
      moviePopular: moviePopular.results,
    },
  };
};
