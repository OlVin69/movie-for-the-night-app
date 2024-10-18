import MovieItem from "../MovieItem/MovieItem";
import s from "./MovieList.module.css";

export default function MovieList({ items }) {

  return (
    <ul className={s.list}>
      {items.length > 0 &&
        items.map(item => (
          <li key={item.id}>
            <MovieItem item={item} />
          </li>
        ))}
    </ul>
  );
}
