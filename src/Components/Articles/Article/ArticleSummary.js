import React from "react";
import { Link } from "react-router-dom";
import "../Articles.scss";

const ArticleSummary = props => {
  console.log(props, "props in articleSummary");
  let authors = props.author.map(x => {
    return (
      <div className="author-names">
        <Link to={`/authorsName/${x.name}`}>{x.name}</Link>
      </div>
    );
  });

  return (
    <div>
      Title:{props.title}
      <br />
      Authors:{authors}
      <br />
      Published: {props.published}
      <br />
      Summary: {props.summary}
    </div>
  );
};

export default ArticleSummary;
