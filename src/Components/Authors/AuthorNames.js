import React, { Component } from "react";
import axios from "axios";
var parseString = require("xml2js").parseString;

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
        `http://export.arxiv.org/api/query?search_query=au:"${authorName}"&sortBy=submittedDate&sortOrder=descending&max_results=5`
      )
      .then(data => {
        parseString(data.data, function(err, result) {
          searched.push(result.feed.entry);
          console.log(searched[0], "pwerj");
        });
        let publishedDate = searched[0].filter(autho => {
          let published = autho.published[0]
            .split("")
            .splice(0, 10)
            .join("");
          console.log(published, "published");
          let thirty = String(formatDate(thirtyDaysAgo));
          console.log(thirty, "thirty");
          return published > thirty;
        });
        this.setState({
          clickedAuthor: publishedDate
        });
      })
      .catch(err => console.log("search get", err));
  };
  render() {
    // console.log(this.props, "props here");
    const { clickedAuthor } = this.state;
    // console.log(clickedAuthor, "clickedAuthor");
    let titles = clickedAuthor.map(x => (
      <div>
        <ul>
          <li>{x.title}</li>
        </ul>
      </div>
    ));

    return (
      <div>
        <h1> {this.props.match.params.id}</h1>
        {titles}
      </div>
    );
  }
}
export default AuthorNames;
