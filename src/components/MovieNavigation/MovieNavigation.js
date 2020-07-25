import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieNavigation.scss';

const MovieNavigation = ({ match }) => {
  return (
    <ul className="Information">
      Additional information :
      <li>
        <NavLink
          to={`${match.url}/cast`}
          className="Information__link"
          activeClassName="Information__active"
        >
          Cast
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${match.url}/reviews`}
          className="Information__link"
          activeClassName="Information__active"
        >
          Reviews
        </NavLink>
      </li>
    </ul>
  );
};

MovieNavigation.protoTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
};

export default withRouter(MovieNavigation);
