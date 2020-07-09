import React from 'react';
import PropTypes from 'prop-types';

const Genres = ({ original_title, realeseYear, overview, popularity }) => (
  <>
    <h2 className="Movie__title">
      {original_title} ({realeseYear})
    </h2>
    <p className="Movie__score">User Score: {Math.round(popularity)}%</p>
    <h2>Overview</h2>
    <p className="Movie__overview">{overview}</p>
  </>
);

Genres.protoTypes = {
  original_title: PropTypes.string.isRequired,
  realeseYear: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
};

export default Genres;
