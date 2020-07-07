import axios from 'axios';

const apiKey = '5817c6dd8032bda95a06a4a1b329e19e';
const baseUrl = 'https://api.themoviedb.org/3/';

const fetchMovies = () => {
  return axios
    .get(`${baseUrl}trending/all/day?api_key=${apiKey}`)
    .then(response => response.data.results);
};

const fetchMoviesDetails = movieId => {
  return axios
    .get(`${baseUrl}movie/${movieId}?api_key=${apiKey}`)
    .then(response => response.data);
};

const fetchMoviesPage = ({ searchMovie, currentPage }) => {
  return axios
    .get(
      `${baseUrl}search/movie?api_key=${apiKey}&query=${searchMovie}&page=${currentPage}`,
    )
    .then(response => response.data.results);
};

const fetchReviews = movieId => {
  return axios
    .get(`${baseUrl}movie/${movieId}/reviews?api_key=${apiKey}`)
    .then(response => response.data.results);
};

const fetchCast = movieId => {
  return axios
    .get(`${baseUrl}movie/${movieId}/credits?api_key=${apiKey}`)
    .then(response => response.data.cast);
};

export default {
  fetchMovies,
  fetchMoviesDetails,
  fetchMoviesPage,
  fetchReviews,
  fetchCast,
};
