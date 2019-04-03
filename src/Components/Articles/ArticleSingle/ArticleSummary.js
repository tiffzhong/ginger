import React from "react";
// import "../Articles.scss";
const ArticleSummary = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  console.log(props, "propperpoo");
  return <div>{props.published}</div>;
};

export default ArticleSummary;
