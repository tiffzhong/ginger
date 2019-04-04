import React from "react";
import { Switch, Route } from "react-router-dom";
import ArticlesContainer from "./Components/Articles/ArticlesContainer";
import AuthorsList from "./Components/Authors/AuthorsList";
import AuthorNames from "./Components/Authors/AuthorNames/AuthorNames";
export default (
  <Switch>
    <Route path="/articles" component={ArticlesContainer} />
    <Route path="/authors" component={AuthorsList} />
    <Route path="/authorsName/:id" component={AuthorNames} />
    <Route path="/summaries/:id" component={ArticlesContainer} />
  </Switch>
);
