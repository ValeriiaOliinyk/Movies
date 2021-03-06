import React, { Component } from 'react';
import Error from '../components/Error';
import moviesApi from '../services/movies-api';
import MainLoader from '../components/MainLoader';
import Button from '../components/Button';
import FilmsList from '../components/FilmsList';
import '../styles/search.scss';

class MoviesPage extends Component {
  state = {
    inputValue: '',
    films: [],
    currentPage: 1,
    searchMovie: '',
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    const getFilm = localStorage.getItem('film');
    if (getFilm) {
      this.setState({ searchMovie: getFilm });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchMovie } = this.state;
    if (prevState.searchMovie !== searchMovie) {
      this.fetchMovies();
    }
    localStorage.setItem('film', searchMovie);
  }

  onChangeValue = value => {
    this.setState({ searchMovie: value });
  };

  fetchMovies = () => {
    const { currentPage, searchMovie } = this.state;
    const options = {
      currentPage,
      searchMovie,
    };

    this.setState({ isLoading: true });

    moviesApi
      .fetchMoviesPage(options)
      .then(results =>
        this.setState(prevState => ({
          films: [...prevState.films, ...results],
          currentPage: prevState.currentPage + 1,
        })),
      )
      .catch(error => this.setState({ error: error.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handelInputChange = e => {
    const { value } = e.currentTarget;
    this.setState({
      inputValue: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.onChangeValue(this.state.inputValue);
    this.reset();
  };

  reset = () => {
    this.setState({ inputValue: '', currentPage: 1, films: [] });
  };

  render() {
    const { inputValue, isLoading, error, films } = this.state;
    const shouldRenderLoadMoreBtn = films.length > 0 && !isLoading;
    return (
      <>
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            value={inputValue}
            onChange={this.handelInputChange}
            className="SearchForm-input"
          />
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
        </form>

        {error ? (
          <Error text={error} />
        ) : (
          <>
            <FilmsList films={films} />
            {shouldRenderLoadMoreBtn && <Button onClick={this.fetchMovies} />}
          </>
        )}
        {isLoading && <MainLoader />}
      </>
    );
  }
}

export default MoviesPage;
