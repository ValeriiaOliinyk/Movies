import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import FilmsPreview from '../FilmsPreview/FilmsPreview';

const FilmsList = ({ films }) => {
  return (
    <ul>
      {films.map(film => (
        <li key={film.id}>
          <Link to={`/movies/${film.id}`}>
            <FilmsPreview {...film} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default withRouter(FilmsList);
