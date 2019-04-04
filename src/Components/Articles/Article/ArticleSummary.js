import React from "react";
import { Link } from "react-router-dom";
import "../Articles.scss";
const ArticleSummary = props => {
  console.log(props, "props in articleSummary");
  let authors = props.author.map(x => {
    console.log(x.name, "x");
    return <div className="author-names">{x.name}</div>;
  });
  return (
    <div>
      Title:{props.title}
      <br />
      Authors:
      <Link to={`/authorsName/${authors[0]}`}>{authors}</Link>
      <br />
      Published: {props.published}
      <br />
      Summary: {props.summary}
    </div>
  );
};

export default ArticleSummary;
