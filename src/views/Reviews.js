import React, { Component } from 'react';
import moviesApi from '../services/movies-api';
import NoRewievs from '../components/NoReview';
import Review from '../components/Review';
import PropTypes from 'prop-types';
import '../styles/review.scss';

class Rewiews extends Component {
  static defaultProps = {
    reviews: [],
  };

  static propTypes = {
    reviews: PropTypes.array,
  };

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
                <Review {...review} />
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
