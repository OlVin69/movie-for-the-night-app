import { useEffect, useState } from "react";
import { fetchMovies } from "../../movie-api";
import ErrorHTTP from "../../components/ErrorHTTP/ErrorHTTP";
import Loader from "../../components/Loader/Loader"
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css"

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovies();
        setMovies(data.results);
        
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);

  
  return (
    <div className={s.container}>
      <h1 className={s.title}>Trending today</h1>
      {error && <ErrorHTTP />}
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList items={movies} />}
    </div>
  );
}
