import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moviesApi from '../services/movies-api';

class HomePage extends Component {
  state = {
    films: [],
  };

  componentDidMount() {
    moviesApi.fetchMovies().then(results => this.setState({ films: results }));
  }

  render() {
    return (
      <>
        <h1>Trending today</h1>
        <ul>
          {this.state.films.map(film => (
            <li key={film.id}>
              <Link to={`/movies/${film.id}`}>{film.name || film.title}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default HomePage;
