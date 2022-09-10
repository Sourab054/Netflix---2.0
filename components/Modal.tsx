import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import useAuth from "../hooks/useAuth";
import { Element, Genre, Movie } from "../typings";
import MuiModal from "@mui/material/Modal";
import {
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../firebase";
import { truncate } from "./Banner";

interface Props {
  isTV?: Boolean;
}

const Modal = ({ isTV }: Props) => {
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [muted, setMuted] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [addedToList, setAddedToList] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const { user } = useAuth();
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);

  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      console.log(movie);
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.first_air_date ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      // console.log(movie);
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot) => {
          setMovies(snapshot.docs);
          // console.log(snapshot);
        }
      );
    }
  }, [db, movie?.id]);

  // Check if the movie is already in the user's list
  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [movies]
  );

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, "customers", user?.uid!, "myList", movie?.id.toString())
      );
      toast.error(
        `${
          movie?.title || movie?.original_name
        } has been removed from My List.`,
        { duration: 5000, style: toastStyle }
      );
    } else {
      await setDoc(
        doc(db, "customers", user?.uid!, "myList", movie?.id.toString()),
        { ...movie }
      );
      toast.success(
        `${movie?.title || movie?.original_name} has been added to My List.`,
        { duration: 5000, style: toastStyle }
      );
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setMovie(null);
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <Toaster position="bottom-center" />
        <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={handleClose}
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-4 md:px-8 text-sm md:text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-4 w-4 md:h-7 md:w-7 text-black" />
                Play
              </button>
              <button className="modalButton" onClick={handleList}>
                {addedToList ? (
                  <CheckIcon className="h-4 w-4 md:h-7 md:w-7 " />
                ) : (
                  <PlusIcon className="h-4 w-4 md:h-7 md:w-7 " />
                )}
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-4 w-4 md:h-6 md:w-6 " />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-4 w-4 md:h-6 md:w-6" />
              ) : (
                <VolumeUpIcon className="h-4 w-4 md:h-6 md:w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {Math.round(movie!.vote_average) * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="text-sm md:text-base">
                {readMore ? movie?.overview : truncate(movie?.overview!, 150)}{" "}
                <a
                  onClick={() => setReadMore(!readMore)}
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {readMore ? "Read Less" : "Read More"}
                </a>
              </p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{" "}
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
