import React from "react";
const ArticleSummary = props => {
  console.log(props, "propperpoo");
  let authors = props.author.map(authorname => authorname.name);

  return (
    <div>
      Title:{props.title}
      <br />
      Authors:
      {authors}
      <br />
      Published: {props.published}
      <br />
      Summary: {props.summary}
    </div>
  );
};

export default ArticleSummary;
