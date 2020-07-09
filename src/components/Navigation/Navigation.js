import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import routes from '../../routes';

const Navigation = () => {
  return (
    <nav>
      <NavLink
        exact
        to={routes.home}
        className="NavLink Item"
        activeClassName="NavLink--active"
      >
        Home
      </NavLink>

      <NavLink
        to={routes.movies}
        className="NavLink Item"
        activeClassName="NavLink--active"
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
