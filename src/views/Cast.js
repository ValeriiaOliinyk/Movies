import React, { Component } from 'react';
import moviesApi from '../services/movies-api';
import defaultImag from '../images/no-image.jpg';
import '../styles/cast.scss';

class Cast extends Component {
  state = {
    cast: [],
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    moviesApi.fetchCast(movieId).then(cast => this.setState({ cast: cast }));
  }

  render() {
    const { cast } = this.state;
    return (
      <ul className="Cast__list">
        {cast &&
          cast.map(actor => (
            <li key={actor.id}>
              <div className="Image">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                    alt={actor.name}
                    width="200"
                    className="Cast__images"
                  />
                ) : (
                  <img
                    src={defaultImag}
                    alt={actor.name}
                    width="200"
                    className="Cast__images"
                  />
                )}
              </div>
              <p className="Cast__name">{actor.name}</p>
              <p className="Cast__character">Character: {actor.character}</p>
            </li>
          ))}
      </ul>
    );
  }
}

export default Cast;
