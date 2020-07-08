import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import FilmsPreview from '../FilmsPreview/FilmsPreview';
import './FilmsList.scss';

const FilmsList = ({ films, location }) => {
  return (
    <ul className="FilmsList">
      {films.map(({ id, poster_path, original_title, name }) => (
        <li key={id}>
          <Link
            to={{
              pathname: `/movies/${id}`,
              state: {
                from: location,
              },
            }}
          >
            <FilmsPreview
              poster_path={poster_path}
              original_title={original_title}
              name={name}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(FilmsList);
