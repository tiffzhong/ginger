import React from "react";
import "../Articles.scss";
import { Link } from "react-router-dom";
import ArticleSummary from "./ArticleSummary";
const ArticleTitle = props => {
  console.log(props, "props in article titles");
  let unique = props.id[0]
    .split("")
    .slice(21)
    .join("");
  return (
    <div>
      <Link to={`/summaries/${unique}`} alt="articlelink">
        {props.title}
      </Link>
    </div>
  );
};
export default ArticleTitle;
