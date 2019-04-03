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
      {/* {props.match.path === "/summaries/:id" &&
      unique === props.match.params.id ? (
        <ArticleSummary
          title={props.title}
          summary={props.summary}
          published={props.published}
          author={props.author}
          match={props.match.params.id}
        />
      ) : ( */}
      <Link to={`/summaries/${unique}`} alt="articlelink">
        {props.title}
      </Link>
    </div>
  );
};
export default ArticleTitle;
