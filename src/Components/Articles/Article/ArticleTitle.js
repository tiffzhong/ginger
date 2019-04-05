import React from "react";
import "../Articles.scss";
import { Link } from "react-router-dom";

const ArticleTitle = props => {
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
