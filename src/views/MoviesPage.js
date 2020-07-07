import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moviesApi from '../services/movies-api';

class MoviesPage extends Component {
  state = {
    inputValue: '',
    films: [],
    currentPage: 1,
    searchMovie: '',
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
    moviesApi.fetchMoviesPage(options).then(results =>
      this.setState(prevState => ({
        films: [...prevState.films, ...results],
        currentPage: prevState.currentPage + 1,
      })),
    );
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
    const { inputValue } = this.state;
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
        <ul>
          {this.state.films.map(film => (
            <li key={film.id}>
              <Link to={`/movies/${film.id}`}>{film.name || film.title}</Link>
            </li>
          ))}
        </ul>
        <button type="submit" onClick={this.fetchMovies}>
          <span>Load more</span>
        </button>
      </>
    );
  }
}

export default MoviesPage;
