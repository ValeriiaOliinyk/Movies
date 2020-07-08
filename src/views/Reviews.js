import React, { Component } from 'react';
import moviesApi from '../services/movies-api';
import NoRewievs from '../components/NoReview';
import '../styles/review.scss';

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
          <ul className="Review">
            {reviews.map(review => (
              <li key={review.id} className="Review__item">
                <h3 className="Review__author">Author: {review.author}</h3>
                <p className="Review__content">{review.content}</p>
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
