import React from "react";
import { Link } from "react-router-dom";
import "../Articles.scss";

//instead of making this a class component, props are passed down from articles container to show summary
const ArticleSummary = props => {
  let authors = props.author.map(x => {
    return (
      <>
        <Link to={`/authorsName/${x.name}`}>{x.name}</Link>
      </>
    );
  });

  return (
    <div className="article-summary">
      <h1>Article Summary</h1>
      <p>Title: {props.title}</p>
      <br />
      <p>Authors:{authors}</p>
      <br />
      <p>Published: {props.published}</p>
      <br />
      <p> Summary: {props.summary}</p>
    </div>
  );
};

export default ArticleSummary;
