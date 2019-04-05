import React, { Component } from "react";
import axios from "axios";
import "./Articles.scss";
import ArticleSummary from "./Article/ArticleSummary";
import ArticleTitle from "./Article/ArticleTitle";
var parseString = require("xml2js").parseString;

class ArticlesContainer extends Component {
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

  //run filtered method after user clicks an article title
  componentDidUpdate(prevProps) {
    if (prevProps.match.path !== this.props.match.path) {
      this.filtered();
    }
  }

  //Search querying articles related to psychiatry, therapy, data science, or machine learning.
  //Sorting by submit date
  //Sort order is descending (most recent first)
  //Showing 35 results and pushing in p array (global variable)
  getArticles = () => {
    let p = [];
    axios
      .get(
        "http://export.arxiv.org/api/query?search_query=all:psychiatry+OR+all:therapy+OR+all:data+science+OR+all:machine+learning&sortBy=submittedDate&sortOrder=descending&max_results=35"
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

  //Using this.props.match.path to filter through this.state.articles, reusing the API call from getArticles method. then setting a new state (filtered) to show the selected article's summary.
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
    const { articles } = this.state;
    let allArticles = articles.map(a => {
      return (
        <ArticleTitle
          id={a.id}
          title={a.title}
          summary={a.summary}
          published={a.published}
          author={a.author}
          match={this.props.match}
        />
      );
    });

    return (
      <div className="">
        {this.props.match.path === "/summaries/:id" &&
        this.state.filtered[0] ? (
          <>
            <ArticleSummary
              title={this.state.filtered[0].title}
              summary={this.state.filtered[0].summary}
              published={this.state.filtered[0].published}
              author={this.state.filtered[0].author}
            />
          </>
        ) : (
          <div className="articles-container">
            <h1>New Articles</h1>
            <p>
              Subjects: Psychiatry, Therapy, Data Science, and Machine Learning
            </p>
            {allArticles}
          </div>
        )}
      </div>
    );
  }
}
export default ArticlesContainer;
