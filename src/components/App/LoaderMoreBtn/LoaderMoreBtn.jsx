import s from "./LoaderMoreBtn.module.css";

const LoadMoreButton = ({ onClick }) => {
  return (
    <button className={s.btn} type="button" onClick={onClick}>
      Load more
    </button>
  );
};
export default LoadMoreButton;
