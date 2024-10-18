import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../movie-api";
import Loader from "../../components/Loader/Loader";
import ErrorHTTP from "../../components/ErrorHTTP/ErrorHTTP";

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function getMovieCast() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieCast(movieId);
        setCasts(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieCast();
  }, [movieId]);

  return (
    <div>
      {error && <ErrorHTTP />}
      {isLoading && <Loader />}
      <ul>
        {casts.length > 0 &&
          casts.map((item) => (
            <li key={item.id}> 
              <img
                src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                      : "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"
                  }
                  width={180}
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>Character: {item.character}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
