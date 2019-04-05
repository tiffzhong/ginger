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
        this.setState({
          clickedAuthor: searched[0]
        });
      })
      .catch(err => console.log("search get", err));
  };
  render() {
    // console.log(this.props, "props here");
    const { clickedAuthor } = this.state;
    console.log(clickedAuthor, "clickedAuthor");
    let titles = clickedAuthor.map(x => (
      <div>
        <ul>
          <li>{x.title}</li>
        </ul>
      </div>
    ));

    console.log(titles);
    return (
      <div>
        <h1> {this.props.match.params.id}</h1>
        {titles}
      </div>
    );
  }
}
export default AuthorNames;
