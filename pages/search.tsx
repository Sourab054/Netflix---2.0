import { DocumentData } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchState } from "../atoms/modalAtom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Thumbnail from "../components/Thumbnail";
import { Movie } from "../typings";

interface Props {
  results: Movie[];
}

const search = ({ results }: Props) => {
  const searchText = useRecoilValue(searchState);
  const { query } = useRouter();

  // console.log(results);

  return (
    <div className="relative bg-gradient-to-b from-gray-900/10 to-[#010511] flex flex-col min-h-screen">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="pt-28 pl-4 lg:pl-16 h-full flex-1">
        <h2 className="cursor-pointer pb-3 text-sm font-semibold text-gray-400 transition duration-200 md:text-xl">
          Search results for :{" "}
          <span className="text-white capitalize pl-2">{query.q}</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pr-3 overflow-hidden lg:pr-8">
          {" "}
          {results.map((movie: Movie | DocumentData) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query.q;
  // Fetch data from external API
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=03ec3fd413048c3fb576aaff2447f3dd&language=en-US&query=${query}&page=1&include_adult=false`
  );
  const { results } = await res.json();

  console.log(results);

  // Pass data to the page via props
  return { props: { results } };
}

export default search;
