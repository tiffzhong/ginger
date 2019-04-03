import React, { Component } from "react";
import { Link } from "react-router-dom";
import ArticlesContainer from "./Components/ArticlesContainer/ArticlesContainer";
class Landing extends Component {
  render() {
    return (
      <div>
        <Link to="/articles"> Articles</Link>
        <ArticlesContainer />
      </div>
    );
  }
}
export default Landing;
