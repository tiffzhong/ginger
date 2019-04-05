import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Authors.scss";
var parseString = require("xml2js").parseString;

class AuthorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: []
    };
  }

  componentDidMount() {
    this.getAuthors();
  }

  //getAuthors method is querying the articles in specified subject, then querying a search for author names of the articles to get the count/length of how many articles they have published in the past 30 days.
  getAuthors = () => {
    let auth = [];
    axios
      .get(
        "http://export.arxiv.org/api/query?search_query=all:psychiatry+OR+all:therapy+OR+all:data+science+OR+all:machine+learning&sortBy=lastUpdatedDate&sortOrder=descending&max_results=30"
      )
      .then(data => {
        parseString(data.data, function(err, result) {
          auth.push(result.feed.entry);
        });
        let mapper = auth[0].map(g => g.author);

        let names = mapper.map(v =>
          v.map(t => {
            axios
              .get(
                `http://export.arxiv.org/api/query?search_query=au:"${
                  t.name
                }"&sortBy=submittedDate&sortOrder=descending&max_results=10`
              )
              .then(data => {
                parseString(data.data, (err, result) => {
                  let authorsCopy = this.state.authors.concat();
                  authorsCopy.push({
                    results: result.feed.entry,
                    name: t.name
                  });
                  //this method inside map is slowing down author name render time
                  this.setState({
                    authors: authorsCopy
                  });
                });
              });
          })
        );
      })
      .catch(err => console.log("author get", err));
  };

  render() {
    let thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    function formatDate(date) {
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      return year + "-0" + (monthIndex + 1) + "-0" + day;
    }

    let mappedAuthors = this.state.authors.map(author => {
      // looking for author's published dates and filtering the count/length in the past 30 days
      if (author.results) {
        let publishedDate = author.results.filter(count => {
          let published = count.published[0]
            .split("")
            .splice(0, 10)
            .join("");

          let thirty = String(formatDate(thirtyDaysAgo));

          return published > thirty;
        });
        //if and author has not published an article in the past 30 days, it will not render.
        if (publishedDate.length > 0) {
          return (
            <div className="author-link-count">
              <Link to={`/authorsName/${author.name}`}>{author.name}</Link>
              <p>{publishedDate !== undefined ? publishedDate.length : 0}</p>
            </div>
          );
        }
      }
    });

    return (
      <div className="authors-list-container">
        <h1>Authors </h1>
        <p>and the # of Articles written in the last 30 days</p>
        {mappedAuthors}
      </div>
    );
  }
}
export default AuthorsList;
