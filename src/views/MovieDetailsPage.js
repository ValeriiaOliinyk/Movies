import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import moviesApi from '../services/movies-api';
import defaultImag from '../images/no-image.jpg';
import Error from '../components/Error';
import IconButton from '../components/IconButton';
import { ReactComponent as BackIcon } from '../images/arrow.svg';
import Cast from './Cast';
import Rewiews from './Reviews';
import routes from '../routes';
import '../styles/movie.scss';

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
            <div className="Movie">
              <IconButton onClick={this.handelGoBack}>
                <BackIcon width="40" fill="white" />
              </IconButton>
              <div className="Movie__box">
                <div className="Movie__image">
                  {poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${poster_path}`}
                      alt={original_title}
                    />
                  ) : (
                    <img src={defaultImag} alt={original_title} width="200" />
                  )}
                </div>
                <div className="Movie__information">
                  <h2 className="Movie__title">
                    {original_title} ({realeseYear})
                  </h2>
                  <p className="Movie__score">
                    User Score: {Math.round(popularity)}%
                  </p>
                  <h2>Overview</h2>
                  <p className="Movie__overview">{overview}</p>
                  <ul className="Movie__genres">
                    Genres :
                    {genres &&
                      genres.map(genre => (
                        <li key={genre.id}> - {genre.name}</li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="Line"></div>
              <ul className="Information">
                Additional information :
                <li>
                  <NavLink
                    to={`${match.url}/cast`}
                    className="Information__link"
                    activeClassName="Information__active"
                  >
                    Cast
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${match.url}/reviews`}
                    className="Information__link"
                    activeClassName="Information__active"
                  >
                    Rewiews
                  </NavLink>
                </li>
              </ul>
            </div>
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
