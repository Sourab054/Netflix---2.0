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
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  tvComedies: Movie[];
  crimeTVShows: Movie[];
  tvDramas: Movie[];
  topRated: Movie[];
  newReleases: Movie[];
  scifiFantasy: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[];
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  scifiFantasy,
  topRated,
  newReleases,
  trendingNow,
  tvComedies,
  crimeTVShows,
  tvDramas,
  products,
}: Props) => {
  const { user, loading } = useAuth();
  const subscription = useSubscription(user);
  const showModal = useRecoilValue(modalState);
  const movie = useRecoilValue(movieState);
  const list = useList(user?.uid);

  if (loading || subscription === null) return null;

  if (!subscription) return <Plans products={products} />;

  return (
    <div
      className={`relative bg-gradient-to-b from-gray-900/10 to-[#010511] h-max ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>
          {movie?.title || movie?.original_name || "Home"} - Netflix
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
        <Banner netflixOriginals={netflixOriginals} />

        <section className="md:space-y-24">
          {/* My List */}
          {list.length > 0 && <Row title="My List" movies={list} />}
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="TV Comedies" movies={tvComedies} />
          <Row title="Award-Winning Crime TV Shows" movies={crimeTVShows} />
          <Row title="TV Dramas" movies={tvDramas} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="New Releases" movies={newReleases} />
          <Row title="Supernatural TV Sci-Fi & Fantasy" movies={scifiFantasy} />
          <Row title="Action & Adventure" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal isTV />}
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  const [
    netflixOriginals,
    trendingNow,
    tvComedies,
    crimeTVShows,
    tvDramas,
    topRated,
    newReleases,
    scifiFantasy,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTVComedies).then((res) => res.json()),
    fetch(requests.fetchCrimeTVShows).then((res) => res.json()),
    fetch(requests.fetchTVDramas).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchNewReleases).then((res) => res.json()),
    fetch(requests.fetchFantasy).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      tvComedies: tvComedies.results,
      crimeTVShows: crimeTVShows.results,
      tvDramas: tvDramas.results,
      topRated: topRated.results,
      newReleases: newReleases.results,
      scifiFantasy: scifiFantasy.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  };
};
