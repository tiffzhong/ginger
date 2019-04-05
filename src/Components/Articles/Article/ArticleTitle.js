import React from "react";
import "../Articles.scss";
import { Link } from "react-router-dom";

const ArticleTitle = props => {
  let unique = props.id[0]
    .split("")
    .slice(21)
    .join("");
  //unique slices the weird id 'http' the API provides
  return (
    <>
      <Link to={`/summaries/${unique}`} alt="articlelink">
        {props.title}
      </Link>
    </>
  );
};
export default ArticleTitle;
