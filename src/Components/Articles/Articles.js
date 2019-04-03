import React, { Component } from "react";
import axios from "axios";
var parseString = require("xml2js").parseString;

class Articles extends Component {
  constructor() {
    super();
    this.state = { articles: [] };
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    axios
      .get(
        "http://export.arxiv.org/api/query?search_query=all:therapy&start=0&max_results=10"
      )
      .then(data => {
        parseString(data.data, function(err, result) {
          console.dir(result);
        });
      })
      .catch(err => console.log("get req error", err));
  };
  render() {
    return <div>Articles</div>;
  }
}
export default Articles;
