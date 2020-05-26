import React from 'react';
import styles from "./App.module.scss";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Search from '../search/search';
import MovieList from '../movie-list/movie-list';
import MovieDetail from '../movie-detail/movie-detail';
import AppError from '../error';
const App = () => {
  return (
    <HashRouter hashType={"slash"}>
      <div className={styles.container}>
        <Switch>
          <Route path="/movie/:id">
            <MovieDetail />
          </Route>
          <Route path="/search/:searchParam?">
            <Search />
            <MovieList />
          </Route>
          <Redirect exact from="/" to="/search/"></Redirect>
          <Route path="/error">
            <AppError />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
