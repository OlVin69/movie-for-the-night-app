import { useState, useEffect } from "react";
import {  useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../movie-api";
import ErrorHTTP from "../../components/ErrorHTTP/ErrorHTTP";
import Loader from "../../components/Loader/Loader"
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("films") ?? " ";
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  
  

  useEffect(() => {
    if (query === "") {
      return;
    }
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMoviesByQuery(query);
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMovies([]);

    const formData = new FormData(e.target);
    const searchQuery = formData.get("movie");

    if (searchQuery.trim() === "") {
      alert("Please, enter value into field");
    } else {
      searchParams.set("films", searchQuery.trim());
      setSearchParams(searchParams);
    }

    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="movie"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      {error && <ErrorHTTP />}
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList items={movies} />}
    </div>
  )
}
