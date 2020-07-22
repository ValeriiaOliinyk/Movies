import React, { Component } from 'react';
import Error from '../components/Error';
import FilmsList from '../components/FilmsList';
import moviesApi from '../services/movies-api';
import PropTypes from 'prop-types';

class HomePage extends Component {
  static defaultProps = {
    films: [],
  };

  static propTypes = {
    films: PropTypes.array,
  };

  state = {
    films: [],
    error: null,
  };

  componentDidMount() {
    localStorage.removeItem('film');
    moviesApi
      .fetchMovies()
      .then(results => this.setState({ films: results }))
      .catch(error => this.setState({ error: error.message }));
  }

  render() {
    const { error, films } = this.state;
    return (
      <>
        <h1 className="Title">Trending today</h1>
        {error && <Error text={error} />}
        <FilmsList films={films} />
      </>
    );
  }
}

export default HomePage;
