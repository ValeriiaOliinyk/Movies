import React, { Component } from 'react';
import axios from 'axios';
import defaultImag from './no-image.jpg';

const apiKey = '5817c6dd8032bda95a06a4a1b329e19e';
const baseUrl = 'https://api.themoviedb.org/3/';

class Cast extends Component {
  state = {
    cast: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await axios.get(
      `${baseUrl}movie/${movieId}/credits?api_key=${apiKey}`,
    );
    this.setState({ cast: response.data.cast });
  }

  render() {
    const { cast } = this.state;
    return (
      <ul>
        {cast &&
          cast.map(actor => (
            <li key={actor.id}>
              <div className="Image">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                    alt={actor.name}
                    width="200"
                  />
                ) : (
                  <img src={defaultImag} alt={actor.name} width="200" />
                )}
              </div>
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
      </ul>
    );
  }
}

export default Cast;
