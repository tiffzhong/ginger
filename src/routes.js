import React from "react";
import { Switch, Route } from "react-router-dom";
import ArticlesContainer from "./Components/Articles/ArticlesContainer";
import AuthorsList from "./Components/Authors/AuthorsList";
import ArticleSummary from "./Components/Articles/ArticleSingle/ArticleSummary";
import ArticleTitle from "./Components/Articles/ArticleSingle/ArticleTitle";

export default (
  <Switch>
    <Route path="/articles" component={ArticlesContainer} />
    <Route path="/authors" component={AuthorsList} />
    <Route path="/summaries/:id" component={ArticlesContainer} />
  </Switch>
);
