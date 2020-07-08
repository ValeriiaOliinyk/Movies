import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Container from './components/Container';
import AppBar from './components/AppBar';
import routes from './routes';
import MainLoader from './components/MainLoader';
import './styles/base.scss';

// Views
const Homepage = lazy(() =>
  import('./views/HomePage.js' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage.js' /* webpackChunkName: "movie-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage.js' /* webpackChunkName: "movie-details-page" */
  ),
);

const App = () => (
  <>
    <AppBar />
    <Container>
      <Suspense fallback={<MainLoader />}>
        <Switch>
          <Route exact path={routes.home} component={Homepage} />
          <Route path={routes.movieId} component={MovieDetailsPage} />
          <Route path={routes.movies} component={MoviesPage} />
          <Redirect to={routes.home} />
        </Switch>
      </Suspense>
    </Container>
  </>
);

export default App;
