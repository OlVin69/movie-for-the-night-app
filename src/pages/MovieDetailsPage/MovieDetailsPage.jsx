import { useEffect, useRef, useState, Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorHTTP from "../../components/ErrorHTTP/ErrorHTTP";
import { fetchMovieById } from "../../movie-api";
import clsx from "clsx";
import s from "./MovieDetailsPage.module.css";

const makeLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    if (!movieId) return;
    async function getMovieById() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieById();
  }, [movieId]);

  return (
    <div>
      {error && <ErrorHTTP />}
      {isLoading && <Loader />}
      <Link to={backLinkRef.current}>Go back</Link>
      <div>
        {movie && (
          <div className={s.container}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h2>
                {movie.title}({movie.release_date.slice(0, 4)})
              </h2>
              <p>User score: {Math.floor(movie.vote_average * 10)}%</p>
              <b>Overview: </b>
              <p>{movie.overview}</p>
              <b>Genres:</b>
              <p>
                {movie.genres &&
                  movie.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>
        )}
        <hr />
        <p>Additional information</p>

        <ul>
          <li>
            <NavLink to="cast" className={makeLinkClass}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={makeLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <hr />
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
