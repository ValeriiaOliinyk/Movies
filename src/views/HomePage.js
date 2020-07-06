import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiKey = '5817c6dd8032bda95a06a4a1b329e19e';
const baseUrl = 'https://api.themoviedb.org/3/';

class HomePage extends Component {
  state = {
    films: [],
  };

  async componentDidMount() {
    const response = await axios.get(
      `${baseUrl}trending/all/day?api_key=${apiKey}`,
    );
    this.setState({ films: response.data.results });
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
