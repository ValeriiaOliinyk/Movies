import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import moviesApi from '../services/movies-api';
import Error from '../components/Error';
import IconButton from '../components/IconButton';
import Cast from './Cast';
import Rewiews from './Reviews';
import MovieInfo from '../components/MovieInfo';
import MovieNavigation from '../components/MovieNavigation';
import MovieImages from '../components/MovieImages';
import Line from '../components/Line';
import { ReactComponent as BackIcon } from '../images/arrow.svg';
import PropTypes from 'prop-types';
import routes from '../routes';
import '../styles/movie.scss';

class MovieDetailsPage extends Component {
  static defaultProps = {
    genres: [],
  };

  static propTypes = {
    genres: PropTypes.array,
  };

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

    const options = {
      overview,
      popularity,
      realeseYear,
      original_title,
      poster_path,
    };

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
                <MovieImages {...options} />
                <div className="Movie__information">
                  <MovieInfo {...options} />
                  <ul className="Movie__genres">
                    Genres :
                    {genres &&
                      genres.map(genre => (
                        <li key={genre.id}> - {genre.name}</li>
                      ))}
                  </ul>
                </div>
              </div>
              <Line />
              <MovieNavigation />
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
