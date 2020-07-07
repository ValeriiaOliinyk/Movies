import React, { Component } from 'react';
import axios from 'axios';

const apiKey = '5817c6dd8032bda95a06a4a1b329e19e';
const baseUrl = 'https://api.themoviedb.org/3/';

class Rewiews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await axios.get(
      `${baseUrl}movie/${movieId}/reviews?api_key=${apiKey}`,
    );
    this.setState({ reviews: response.data.results });
    console.log(response.data.results);
  }

  render() {
    const { reviews } = this.state;
    return (
      <>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews</p>
        )}
      </>
    );
  }
}

export default Rewiews;
