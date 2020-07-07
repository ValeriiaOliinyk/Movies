import React from 'react';
import { Link } from 'react-router-dom';

const FilmsList = ({ films }) => {
  return (
    <ul>
      {films.map(film => (
        <li key={film.id}>
          <Link to={`/movies/${film.id}`}>{film.name || film.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default FilmsList;
