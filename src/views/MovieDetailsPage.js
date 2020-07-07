import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import Cast from './Cast';
import Rewiews from './Reviews';

const apiKey = '5817c6dd8032bda95a06a4a1b329e19e';
const baseUrl = 'https://api.themoviedb.org/3/';

class MovieDetailsPage extends Component {
  state = {
    poster_path: null,
    original_title: null,
    overview: null,
    genres: null,
    popularity: null,
    release_date: null,
    id: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await axios.get(
      `${baseUrl}movie/${movieId}?api_key=${apiKey}`,
    );
    this.setState({ ...response.data });
  }
  render() {
    const {
      poster_path,
      original_title,
      overview,
      genres,
      release_date,
      popularity,
    } = this.state;

    let realeseYear = null;

    if (release_date) {
      realeseYear = release_date.slice(0, 4);
    }

    const { match } = this.props;

    return (
      <>
        <h2>
          {original_title} ({realeseYear})
        </h2>
        <p>User Score: {Math.round(popularity)}%</p>
        {poster_path && (
          <div className="Image">
            <img
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt={original_title}
            />
          </div>
        )}

        <h2>Overview</h2>
        <p>{overview}</p>
        <ul>Genres</ul>
        {genres && genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
        <ul>
          Additional information
          <li>
            <Link to={`${match.url}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`${match.url}/reviews`}>Rewiews</Link>
          </li>
        </ul>
        <Route
          path={`${match.path}/cast`}
          render={props => {
            return <Cast {...props} />;
          }}
        />
        <Route
          path={`${match.path}/reviews`}
          render={props => {
            return <Rewiews {...props} />;
          }}
        />
      </>
    );
  }
}

export default MovieDetailsPage;
