import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReview } from "../../movie-api";
import Loader from "../../components/Loader/Loader";
import ErrorHTTP from "../../components/ErrorHTTP/ErrorHTTP";

export default function MovieCast() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function getMovieReviews() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieReview(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieReviews();
  }, [movieId]);

  return (
    <div>
      {error && <ErrorHTTP />}
      {isLoading && <Loader />}
      <ul>
        {reviews.length ? (
          reviews.map((item) => (
            <li key={item.id}>
              <p>Author: {item.author}</p>
              <p>{item.content}</p>
            </li>
          ))
        ) : (
          <p>We don`t have any review for this movie</p>
        )}
      </ul>
    </div>
  );
}
