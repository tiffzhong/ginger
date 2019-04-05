import React, { Component } from "react";
import axios from "axios";
import "./Authors.scss";
var parseString = require("xml2js").parseString;

//originally had this component as a functional component as I was going to prop drill the authorrs name into it from parent components. but querying into the API again with the given author name made more sense later on.
class AuthorNames extends Component {
  constructor() {
    super();
    this.state = {
      clickedAuthor: []
    };
  }
  componentDidMount() {
    this.searchAuthor();
  }

  searchAuthor = authorName => {
    authorName = this.props.match.params.id;
    let searched = [];

    //thirtyDaysAge variable is to find the date that was 30 days ago from today.
    let thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    function formatDate(date) {
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      return year + "-0" + (monthIndex + 1) + "-0" + day;
    }

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://export.arxiv.org/api/query?search_query=au:"${authorName}"&sortBy=submittedDate&sortOrder=descending&max_results=10`
      )
      .then(data => {
        parseString(data.data, function(err, result) {
          searched.push(result.feed.entry);
        });
        let publishedDate = searched[0].filter(autho => {
          let published = autho.published[0]
            .split("")
            .splice(0, 10)
            .join("");
          let thirty = String(formatDate(thirtyDaysAgo));
          return published > thirty;
        });
        this.setState({
          clickedAuthor: publishedDate
        });
      })
      .catch(err => console.log("search get", err));
  };
  render() {
    const { clickedAuthor } = this.state;
    let titles = clickedAuthor.map(x => (
      <ul>
        <li>{x.title}</li>
      </ul>
    ));

    return (
      <div className="author-page">
        <h1> {this.props.match.params.id}</h1>
        Article Titles:
        {titles}
      </div>
    );
  }
}
export default AuthorNames;
