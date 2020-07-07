import React, { Component } from 'react';
import moviesApi from '../services/movies-api';
import NoRewievs from '../components/NoReview';

class Rewiews extends Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;

    moviesApi
      .fetchReviews(movieId)
      .then(results => this.setState({ reviews: results }));
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
          <NoRewievs />
        )}
      </>
    );
  }
}

export default Rewiews;
