import React from 'react';
import './FilmsPreview.scss';

const FilmsPreview = ({ poster_path, original_title }) => {
  console.log(original_title);
  return (
    <div className="card">
      <div className="FilmsPreview-thumb">
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={original_title}
        />
      </div>
      <div className="card-body">
        <h3 className="card-title">{original_title}</h3>
      </div>
    </div>
  );
};

export default FilmsPreview;
