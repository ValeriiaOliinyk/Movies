import React, { Component } from 'react';
import moviesApi from '../services/movies-api';
import CastList from '../components/CastList';
import PropTypes from 'prop-types';
import '../styles/cast.scss';

class Cast extends Component {
  static defaultProps = {
    cast: [],
  };

  static propTypes = {
    cast: PropTypes.array,
  };
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
              <CastList {...actor} />
            </li>
          ))}
      </ul>
    );
  }
}

export default Cast;
