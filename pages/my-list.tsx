import { DocumentData } from "firebase/firestore";
import Head from "next/head";
import React from "react";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Thumbnail from "../components/Thumbnail";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";
import { Movie } from "../typings";

interface Props {
  movies: Movie[] | DocumentData[];
}

const MyList = () => {
  const { user } = useAuth();
  const list = useList(user?.uid);
  const showModal = useRecoilValue(modalState);

  return (
    <div
      className={`relative bg-gradient-to-b from-gray-900/10 to-[#010511] h-screen ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>My List - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="pt-24 pl-4 lg:pl-16">
        <h2 className="w-56 cursor-pointer pb-3 text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
          My List
        </h2>
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-55vh)]">
            <h3 className="text-gray-400 text-sm md:text-base p-1">
              You haven't added any titles to your list yet.
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pr-3 overflow-hidden lg:pr-8">
            {list.map((movie: Movie | DocumentData) => (
              <Thumbnail key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>
      {showModal && <Modal />}
      <Footer />
    </div>
  );
};

export default MyList;
