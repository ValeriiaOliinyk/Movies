import React from 'react';
import './CastList.scss';
import PropTypes from 'prop-types';
import defaultImag from '../../images/no-image.jpg';

const CastList = actor => (
  <>
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
  </>
);

CastList.defaultProps = {
  poster_path: '',
  character: '',
  name: '',
  string: '',
};

CastList.propTypes = {
  poster_path: PropTypes.string,
  character: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.number,
};

export default CastList;
