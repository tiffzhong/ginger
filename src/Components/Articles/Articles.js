import React, { Component } from "react";
import axios from "axios";
var parseString = require("xml2js").parseString;

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
    //  this.parseString = this.parseString.bind(this);
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
          console.log(p, "p");
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
          article title: {a.title}
          <br />
          published: {a.published}
          <br />
          summary: {a.summary}
          <br />
          author: {b.join(" ")}
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
export default Articles;
