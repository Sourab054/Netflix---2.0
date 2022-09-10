import { Tooltip } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Movie } from "../typings";

interface Props {
  movie: Movie | DocumentData;
}

const Thumbnail = ({ movie }: Props) => {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <>
      {movie.poster_path && (
        <Tooltip title={movie.title || movie.original_name} placement="bottom">
          <div
            className={`relative h-28 min-w-[140px] cursor-pointer md:h-36 md:min-w-[220px] transition duration-500 md:hover:scale-105 ease-in-out`}
            onClick={() => {
              if (router.pathname !== "/search") {
                setCurrentMovie(movie);
                setShowModal(true);
              }
            }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${
                movie.backdrop_path || movie.poster_path
              }`}
              className="rounded-sm object-cover md:rounded transition duration-500 md:hover:scale-105 ease-in-out"
              layout="fill"
            />
          </div>
        </Tooltip>
      )}
    </>
  );
};

export default Thumbnail;
