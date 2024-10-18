import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import s from "./App.module.css"

const Home = lazy(() => import("../../pages/HomePage/HomePage"));
const Movies = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetails = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const NotFound = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));

const App = () => {
  return (
    <div className={s.container}>
      <Navigation />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
