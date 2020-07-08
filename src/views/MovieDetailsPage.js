import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import moviesApi from '../services/movies-api';
import defaultImag from '../images/no-image.jpg';
import Error from '../components/Error';
import Cast from './Cast';
import Rewiews from './Reviews';
import routes from '../routes';

class MovieDetailsPage extends Component {
  state = {
    poster_path: null,
    original_title: null,
    overview: null,
    genres: null,
    popularity: null,
    release_date: null,
    id: null,
    error: null,
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    moviesApi
      .fetchMoviesDetails(movieId)
      .then(data => this.setState({ ...data }))
      .catch(error => this.setState({ error: error.message }));
  }

  handelGoBack = () => {
    const { location, history } = this.props;
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push(routes.home);
  };

  render() {
    const {
      poster_path,
      original_title,
      overview,
      genres,
      release_date,
      popularity,
      error,
    } = this.state;

    let realeseYear = null;

    if (release_date) {
      realeseYear = release_date.slice(0, 4);
    }

    const { match } = this.props;

    return (
      <>
        {error ? (
          <Error text={error} />
        ) : (
          <>
            <button type="button" onClick={this.handelGoBack}>
              Back
            </button>
            <h2>
              {original_title} ({realeseYear})
            </h2>
            <p>User Score: {Math.round(popularity)}%</p>
            <div className="Image">
              {poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${poster_path}`}
                  alt={original_title}
                />
              ) : (
                <img src={defaultImag} alt={original_title} width="200" />
              )}
            </div>
            <h2>Overview</h2>
            <p>{overview}</p>
            <ul>Genres</ul>
            {genres &&
              genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
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
        )}
      </>
    );
  }
}

export default MovieDetailsPage;
