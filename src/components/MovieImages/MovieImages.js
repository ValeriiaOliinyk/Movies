import React from 'react';
import defaultImag from '../../images/no-image.jpg';
import PropTypes from 'prop-types';
import './MovieImages.scss';

const MovieImages = ({ poster_path, original_title }) => (
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
);

MovieImages.defaultProps = {
  poster_path: '',
  original_title: '',
};

MovieImages.protoTypes = {
  poster_path: PropTypes.string,
  original_title: PropTypes.string,
};

export default MovieImages;
