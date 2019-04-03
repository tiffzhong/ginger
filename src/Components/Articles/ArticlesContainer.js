import React, { Component } from "react";
import axios from "axios";
import "./Articles.scss";
import ArticleSummary from "./ArticleSingle/ArticleSummary";
import ArticleTitle from "./ArticleSingle/ArticleTitle";
var parseString = require("xml2js").parseString;

class ArticlesDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      filtered: []
    };
  }

  componentDidMount() {
    this.getArticles();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.path !== this.props.match.path) {
      this.filtered();
    }
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

  filtered = () => {
    if (this.props.match.path === "/summaries/:id") {
      let filteredArticle = this.state.articles.filter(article => {
        let unique = article.id[0]
          .split("")
          .slice(21)
          .join("");
        return unique === this.props.match.params.id;
      });
      this.setState({
        filtered: filteredArticle
      });
    }
  };

  render() {
    console.log(this.props, "props in container");
    const { articles } = this.state;
    let allArticles = articles.map(a => {
      console.log(a, "a");
      return (
        <div className="article-container">
          <ArticleTitle
            id={a.id}
            title={a.title}
            summary={a.summary}
            published={a.published}
            author={a.author}
            match={this.props.match}
          />
        </div>
      );
    });

    console.log(this.state.filtered[0], "filter");
    return (
      <div>
        {this.props.match.path === "/summaries/:id" &&
        this.state.filtered[0] ? (
          <ArticleSummary
            title={this.state.filtered[0].title}
            summary={this.state.filtered[0].summary}
            published={this.state.filtered[0].published}
            author={this.state.filtered[0].author}
          />
        ) : (
          allArticles
        )}
      </div>
    );
  }
}
export default ArticlesDisplay;
