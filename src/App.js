import { useEffect, useState } from "react";
import Result from "./components/Result";
import SkeletonBox from "./components/SkeletonBox";
import axios from "axios";

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllMovies = () => {
      setIsLoading(true);
      axios.get(APIURL)
        .then(
          (response) => {
            setMovies(response.data.results);
            setIsLoading(false);
          }
        )
        .catch(
          (error) => {
            console.log(error);
            setIsLoading(false);
          }
        )
    }

    const getSearchedMovie = () => {
      setIsLoading(true);
      axios.get(SEARCHAPI + search)
        .then(
          (response) => {
            setMovies(response.data.results);
            setIsLoading(false);
          }
        )
        .catch(
          (error) => {
            console.log(error);
            setIsLoading(false);
          }
        )
    }

    setMovies([]);

    if (search === "") {
      getAllMovies();
    } else {
      getSearchedMovie();
    }
  }, [search]);

  const changeSearch = (event) => {
    setSearch(event.target.value);
  }

  const resetSearch = () => {
    setSearch("");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.querySelector('input').blur();
  };

  return (
    <div className="w-full bg-[#0b0b0d] py-10">
      <div className="flex justify-center items-center select-none">
        <h1 onClick={resetSearch} className="py-8 text-[#0feffd] pb-4 cursor-pointer text-4xl md:text-5xl protest-guerrilla-regular">Sigma Movie Search</h1>
      </div>

      <div className="mt-10 mx-auto max-w-[1240px] shadow-xl min-h-[400px] py-8 px-10 bg-[#121315]">
        <h1 className="text-white text-xl md:text-2xl py-8 flex justify-center font-bold">Find Movies with Rating</h1>

        <div className="w-full border border-black rounded-full flex justify-start items-center text-slate-700 p-2 px-4 md:px-8 lg:px-10 mb-10 bg-white">
          <ion-icon name="search-sharp" size="large"></ion-icon>
          <form onSubmit={handleSubmit} className="w-full px-4">
            <input
              type="search"
              name="search"
              id="searchInput"
              value={search}
              onChange={changeSearch}
              className="outline-none ml-4 w-full p-2"
              placeholder="Enter keywords..."
            />
          </form>
        </div>

        {isLoading ? (
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SkeletonBox />
            <SkeletonBox />
            <SkeletonBox />
            <SkeletonBox />
            <SkeletonBox />
            <SkeletonBox />
            <SkeletonBox />
            <SkeletonBox />
          </div>
        ) : movies.length === 0 ? (
          <div className="text-white text-2xl text-center">No Result for <span>{search}</span></div>
        ) : (
          <Result movies={movies} />
        )}
      </div>
    </div>
  );
}

export default App;
