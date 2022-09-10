import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BasicMenu from "./BasicMenu";
import { useRouter } from "next/router";
import { searchState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useRecoilState(searchState);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    // console.log(searchState);
    await router.push(`/search?q=${searchText}`);
    setSearchText("");
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`${
          isScrolled
            ? "bg-gradient-to-b from-gray-900 to-[#010511]"
            : "bg-gradient-to-b from-gray-900 "
        }`}
      >
        <div className="flex items-center space-x-2 md:space-x-10">
          <Link href="/">
            <img
              src="https://rb.gy/ulxxee"
              width={100}
              height={100}
              className="cursor-pointer lg:ml-7 object-contain"
            />
          </Link>

          <BasicMenu />

          <ul className="hidden space-x-4 md:flex">
            <Link href="/">
              <li
                className={
                  router.pathname == "/"
                    ? "headerLink cursor-pointer font-semibold text-white hover:text-white"
                    : "headerLink"
                }
              >
                Home
              </li>
            </Link>
            <li className="headerLink">TV Shows</li>
            <li className="headerLink">Movies</li>
            <li className="headerLink">New & Popular</li>
            <Link href="/my-list">
              <li
                className={
                  router.pathname == "/my-list"
                    ? "headerLink cursor-default font-semibold text-white hover:text-white"
                    : "headerLink"
                }
              >
                My List
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex items-center space-x-4 text-sm font-light">
          {search ? (
            <div className="p-1 flex items-center justify-center bg-black border-[1.6px] border-white transition-all">
              <SearchIcon
                className="sm hidden h-5 w-5 mr-2 cursor-pointer sm:inline"
                onClick={() => setSearch(!search)}
              />
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  ref={inputRef}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="bg-transparent font-light pr-8 border-none outline-none"
                  placeholder="Titles, people, genres"
                />
              </form>
            </div>
          ) : (
            <SearchIcon
              onClick={() => setSearch(!search)}
              className="cursor-pointer sm hidden h-6 w-6 sm:inline"
            />
          )}
          <p className="hidden lg:inline">Kids</p>
          <BellIcon className="h-6 w-6" />
          <Link href="/account">
            <img
              src="https://rb.gy/g1pwyx"
              alt=""
              className="cursor-pointer rounded"
            />
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
