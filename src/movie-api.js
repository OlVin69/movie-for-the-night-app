import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjU4NTE2ZTg0NTliYWFmYzMwMWQ4YWNhZTBjMzRiMyIsInN1YiI6IjY1ZWViYjFmMDAxYmJkMDE4NjdmODA4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9BOtt3VC3rtxjC0uDrQ7kfwBB2S0MMSTwNR4KRpoHEk'
    }
  };

export const fetchMovies = async()=>{
    const response = await axios.get("trending/movie/day?language=en-US", options);

    return response.data;
}


export const fetchMovieById = async(movieId)=>{
  const response = await axios.get(`movie/${movieId}`, options);

  return response.data;
}

export const fetchMoviesByQuery = async(query, page=1) => {
  const response = await axios.get(`/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`, options);
  return response.data;
}

export const fetchMovieCast = async (movieId) => {
 const response = await axios.get(`movie/${movieId}/credits`, options);
 return response.data;
}

export const fetchMovieReview = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  return response.data;
 }