import React, { Component } from 'react';
import Error from '../components/Error';
import moviesApi from '../services/movies-api';
import Loader from 'react-loader-spinner';
import Button from '../components/Button';
import FilmsList from '../components/FilmsList';

class MoviesPage extends Component {
  state = {
    inputValue: '',
    films: [],
    currentPage: 1,
    searchMovie: '',
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchMovie !== this.state.searchMovie) {
      this.fetchMovies();
    }
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
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search movies"
            value={inputValue}
            onChange={this.handelInputChange}
          />
          <button type="submit">
            <span>Search</span>
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
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        )}
      </>
    );
  }
}

export default MoviesPage;
