import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieNavigation.scss';

const MovieNavigation = ({ match, location }) => {
  return (
    <ul className="Information">
      Additional information :
      <li>
        <NavLink
          to={{
            pathname: `${match.url}/cast`,
            state: location.state,
          }}
          className="Information__link"
          activeClassName="Information__active"
        >
          Cast
        </NavLink>
      </li>
      <li>
        <NavLink
          to={{
            pathname: `${match.url}/reviews`,
            state: location.state,
          }}
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
