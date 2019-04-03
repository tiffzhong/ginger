import React, { Component } from "react";
import axios from "axios";
import "./Articles.scss";
import { Link } from "react-router-dom";
var parseString = require("xml2js").parseString;

class ArticlesDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    let p = [];
    axios
      .get(
        "http://export.arxiv.org/api/query?search_query=all:psychiatry+OR+all:therapy+OR+all:data+science+OR+all:machine+learning&sortBy=lastUpdatedDate&sortOrder=descending&max_results=30"
      )
      .then(data => {
        parseString(data.data, function(err, result) {
          p.push(result.feed.entry);
        });
        this.setState({
          articles: p[0]
        });
      })
      .catch(err => console.log("axios get", err));
  };
  render() {
    const { articles } = this.state;
    let allArticles = articles.map(a => {
      let b = a.author.map(author => author.name);
      console.log(a, "a");
      console.log(b, "b");
      return (
        <div className="article-container">
          Title:
          <Link to={`/summaries/${a.id[0]}`}>{a.title}</Link>
          {/* <ArticleSummary
            key={a.id}
            summary={a.summary}
            published={a.published}
            author={b.join(" ")}
          /> */}
        </div>
      );
    });

    return (
      <>
        Articles: {allArticles}
        {/* Author Names: {authorNames} */}
      </>
    );
  }
}
export default ArticlesDisplay;
