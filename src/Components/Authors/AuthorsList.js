import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
var parseString = require("xml2js").parseString;

class AuthorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      clickedAuthor: []
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
        "http://export.arxiv.org/api/query?search_query=all:psychiatry+OR+all:therapy+OR+all:data+science+OR+all:machine+learning&sortBy=lastUpdatedDate&sortOrder=descending&max_results=40"
      )
      .then(data => {
        parseString(data.data, function(err, result) {
          auth.push(result.feed.entry);
        });
        let mapper = auth[0].map(g => g.author);
        let names = mapper.map(v => v.map(t => t.name));
        console.log(names, "nems");
        this.setState({
          authors: names
        });
      })
      .catch(err => console.log("author get", err));
  };

  searchAuthor = authorName => {
    let searched = [];
    axios
      .get(
        `http://export.arxiv.org/api/query?search_query=au:${authorName.replace(
          /\s/g,
          "+"
        )}`
      )
      .then(data => {
        parseString(data.data, function(err, result) {
          searched.push(result.feed.entry);
        });
        console.log(searched);
        this.setState({
          clickedAuthor: searched
        });
      })
      .catch(err => console.log("search get", err));
  };

  render() {
    console.log(this.state.clickedAuthor);
    return (
      <div>
        <Link
          to={`/authorsName/${this.state.clickedAuthor}`}
          onClick={() => this.searchAuthor(this.state.clickedAuthor)}
        >
          {this.state.authors}
        </Link>
      </div>
    );
  }
}
export default AuthorsList;
