import React, { useEffect, useState } from "react";
import { Movie } from "../typings";
import { FaPlay } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import { baseUrl } from "../constants/movie";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
  movieBanner: Movie[];
}

export function truncate(str: String, n: number) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

const Banner = ({ movieBanner }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  useEffect(() => {
    setMovie(movieBanner[Math.floor(Math.random() * movieBanner.length)]);
  }, [movieBanner]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[70vh] lg:justify-end lg:pb-6">
      <div className="absolute top-0 left-0 -z-10 h-[60vh] md:h-[80vh] lg:h-[100vh] w-screen">
        <Image
          layout="fill"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          objectFit="cover"
        />
        <div className="absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-t from-gray-900 to-[#010511]/2"></div>
      </div>

      <h1 className="text-2xl w-3/4 font-bold md:text-3xl lg:text-6xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl">
        {truncate(movie?.overview!, 220)}
      </p>
      <div className="flex space-x-3">
        <button
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
          className="bannerButton bg-white text-black"
        >
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>

        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          <BiInfoCircle className="h-5 w-5 md:h-8 md:w-8" /> More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
