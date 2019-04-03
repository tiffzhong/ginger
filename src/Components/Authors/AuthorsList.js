import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
  // componentDidUpdate(prevProps) {
  //   if (prevProps.match.path !== this.props.match.path) {
  //     this.filtered();
  //   }
  // }

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
        console.log(auth);
        let mapper = auth[0].map(auth => auth.author[0].name);
        console.log(mapper, "mapper");
        this.setState({
          authors: mapper
        });
      })
      .catch(err => console.log("axios get", err));
  };

  render() {
    return (
      <div>
        Authors
        {this.state.authors}
      </div>
    );
  }
}
export default AuthorsList;
