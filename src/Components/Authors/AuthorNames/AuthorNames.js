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
    console.log(this.props.match.params.id, "params");
    authorName = this.props.match.params.id;
    let searched = [];
    console.log(authorName, "name");
    axios
      .get(
        `http://export.arxiv.org/api/query?search_query=au:"${authorName}"&sortBy=submittedDate&sortOrder=descending&max_results=5`
      )
      .then(data => {
        parseString(data.data, function(err, result) {
          searched.push(result.feed.entry);
        });
      })
      .catch(err => console.log("search get", err));
    console.log(searched, "searched");
    this.setState({
      clickedAuthor: searched
    });
  };
  render() {
    // console.log(this.props, "props here");
    const { clickedAuthor } = this.state;
    console.log(clickedAuthor, "clocksf");
    return <div>{clickedAuthor}</div>;
  }
}
export default AuthorNames;
