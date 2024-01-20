import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "../src/search.svg";
import MovieCard from "./component/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(
      ` http://www.omdbapi.com/?s=${title}&apikey=b8ddd3e6`
    );
    const res = await response.json();

    console.log(res.Search);
    setMovies(res.Search);
  };

  // console.log(movies);

  useEffect(() => {
    searchMovies({searchTerm});
  }, []);

  return (
    <>
      <div className="app">
        <h1>Movie World</h1>

        <div className="search">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search for Movies"
            onChange={(e) => { setSearchTerm(e.target.value)}}
          />
          <img src={searchIcon} alt="searchIcon" onClick={() => {searchMovies(searchTerm)}} />
        </div>

        {
        movies?.length > 0 ? (
          <div className="container">
            {
              movies.map((movie) => (
                <MovieCard movie = {movie} />
              ))
            }
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )
        }
      </div>
    </>
  );
}

export default App;
