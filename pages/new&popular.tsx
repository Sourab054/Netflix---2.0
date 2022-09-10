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
  popularTV: Movie[];
  popularMovie: Movie[];
  upcomingMovie: Movie[];
  upcomingTV: Movie[];
}

const NewPopularPage = ({
  popularTV,
  popularMovie,
  upcomingMovie,
  upcomingTV,
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
          {movie?.title || movie?.original_name || "New & Popular"} - Netflix
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
        <Banner movieBanner={popularMovie || popularTV} />

        <section className="md:space-y-24">
          {/* My List */}
          {list.length > 0 && <Row title="My List" movies={list} />}
          <Row title="Popular on TV" movies={popularTV} />
          <Row title="Popular on Netflix" movies={popularMovie} />
          <Row title="Coming Next Week" movies={upcomingTV} />
          {/* <Row title="Hollywood Movies" movies={movieUS} /> */}
          <Row title="Coming This Week" movies={upcomingMovie} />
        </section>
      </main>
      {showModal && <Modal />}
      <Footer />
    </div>
  );
};

export default NewPopularPage;

export const getServerSideProps = async () => {
  const [popularTV, popularMovie, upcomingMovie, upcomingTV] =
    await Promise.all([
      fetch(requests.fetchTVPopular).then((res) => res.json()),
      fetch(requests.fetchMoviePopular).then((res) => res.json()),
      fetch(requests.fetchUpcoming).then((res) => res.json()),
      fetch(requests.fetchTVAiringToday).then((res) => res.json()),
    ]);

  return {
    props: {
      popularTV: popularTV.results,
      popularMovie: popularMovie.results,
      upcomingMovie: upcomingMovie.results,
      upcomingTV: upcomingTV.results,
    },
  };
};
