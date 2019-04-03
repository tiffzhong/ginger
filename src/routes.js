import React from "react";
import { Switch, Route } from "react-router-dom";
import ArticlesContainer from "./Components/Articles/ArticlesContainer";
import Authors from "./Components/Authors/Authors";
import ArticleSummary from "./Components/Articles/ArticleSummary";

export default (
  <Switch>
    <Route path="/" component={ArticlesContainer} />
    <Route path="/authors" component={Authors} />
    <Route path="/summaries/:id" component={ArticleSummary} />
  </Switch>
);
