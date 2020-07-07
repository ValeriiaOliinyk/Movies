import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Container from './components/Container';
import AppBar from './components/AppBar';
import routes from './routes';
import './styles/base.scss';

// Views
import Homepage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage';

const App = () => (
  <>
    <AppBar />
    <Container>
      <Switch>
        <Route exact path={routes.home} component={Homepage} />
        <Route path={routes.movieId} component={MovieDetailsPage} />
        <Route path={routes.movies} component={MoviesPage} />
        <Redirect to={routes.home} />
      </Switch>
    </Container>
  </>
);

export default App;
