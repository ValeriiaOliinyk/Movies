import React from 'react';
import defaultImag from '../../images/no-image.jpg';
import './FilmsPreview.scss';

const FilmsPreview = ({ poster_path, original_title, name }) => {
  return (
    <div className="Films">
      <div className="FilmsPreview-thumb">
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt={original_title}
            className="card-img-top"
          />
        ) : (
          <img
            src={defaultImag}
            alt={original_title}
            className="card-img-top"
          />
        )}
      </div>
      <div className="Films__box">
        <h3 className="Films__title">{original_title || name}</h3>
      </div>
    </div>
  );
};

export default FilmsPreview;
