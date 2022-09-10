import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Plans from "../components/Plans";
import Row from "../components/Row";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";
import useSubscription from "../hooks/useSubsription";
import payments from "../lib/stripe";
import { Movie } from "../typings";
import requests from "../utils/requests";

interface Props {
  trendingTV: Movie[];
  tvAnime: Movie[];
  tvComedies: Movie[];
  crimeTVShows: Movie[];
  tvDramas: Movie[];
  tvTopRated: Movie[];
  tvPopular: Movie[];
  tvFantasy: Movie[];
  tvAction: Movie[];
  tvIndian: Movie[];
  tvUS: Movie[];
}

const TVPage = ({
  trendingTV,
  tvAnime,
  tvComedies,
  crimeTVShows,
  tvDramas,
  tvTopRated,
  tvPopular,
  tvFantasy,
  tvAction,
  tvIndian,
  tvUS,
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
          {movie?.title || movie?.original_name || "TV Shows"} - Netflix
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
        <Banner movieBanner={tvPopular} />

        <section className="md:space-y-24">
          {/* My List */}
          {list.length > 0 && <Row title="My List" movies={list} />}
          <Row title="Trending Now" movies={trendingTV} />
          <Row title="Anime" movies={tvAnime} />
          <Row title="Made In India" movies={tvIndian} />
          <Row title="US TV Shows" movies={tvUS} />
          <Row title="TV Comedies" movies={tvComedies} />
          <Row title="Crime TV Shows" movies={crimeTVShows} />
          <Row title="TV Dramas" movies={tvDramas} />
          <Row title="Top Rated" movies={tvTopRated} />
          <Row title="Supernatural TV Sci-Fi & Fantasy" movies={tvFantasy} />
          <Row title="Action & Adventure" movies={tvAction} />
        </section>
      </main>
      {showModal && <Modal />}
      <Footer />
    </div>
  );
};

export default TVPage;

export const getServerSideProps = async () => {
  const [
    trendingTV,
    tvAnime,
    tvComedies,
    crimeTVShows,
    tvDramas,
    tvTopRated,
    tvPopular,
    tvFantasy,
    tvAction,
    tvIndian,
    tvUS,
  ] = await Promise.all([
    fetch(requests.fetchTrendingTV).then((res) => res.json()),
    fetch(requests.fetchTVAnime).then((res) => res.json()),
    fetch(requests.fetchTVComedies).then((res) => res.json()),
    fetch(requests.fetchCrimeTVShows).then((res) => res.json()),
    fetch(requests.fetchTVDramas).then((res) => res.json()),
    fetch(requests.fetchTVTopRated).then((res) => res.json()),
    fetch(requests.fetchTVPopular).then((res) => res.json()),
    fetch(requests.fetchFantasy).then((res) => res.json()),
    fetch(requests.fetchTVAction).then((res) => res.json()),
    fetch(requests.fetchIndianTVShows).then((res) => res.json()),
    fetch(requests.fetchUSTVShows).then((res) => res.json()),
  ]);

  return {
    props: {
      trendingTV: trendingTV.results,
      tvAnime: tvAnime.results,
      tvComedies: tvComedies.results,
      crimeTVShows: crimeTVShows.results,
      tvDramas: tvDramas.results,
      tvTopRated: tvTopRated.results,
      tvPopular: tvPopular.results,
      tvFantasy: tvFantasy.results,
      tvAction: tvAction.results,
      tvIndian: tvIndian.results,
      tvUS: tvUS.results,
    },
  };
};
