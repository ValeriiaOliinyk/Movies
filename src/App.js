import React from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Container from './components/Container';
import './styles/base.scss';

// Views
import Homepage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage';

const App = () => (
  <>
    <ul className="List">
      <li className="Item">
        <NavLink
          exact
          to="/"
          className="NavLink"
          activeClassName="NavLink--active"
        >
          Home
        </NavLink>
      </li>
      <li className="Item">
        <NavLink
          to="/movies"
          className="NavLink"
          activeClassName="NavLink--active"
        >
          Movies
        </NavLink>
      </li>
    </ul>
    <Container>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/movies" component={MoviesPage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Redirect to="/" />
      </Switch>
    </Container>
  </>
);

export default App;
