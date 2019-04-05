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

  getAuthors = () => {
    let auth = [];
    let another = [];
    axios
      .get(
        "http://export.arxiv.org/api/query?search_query=all:psychiatry+OR+all:therapy+OR+all:data+science+OR+all:machine+learning&sortBy=lastUpdatedDate&sortOrder=descending&max_results=15"
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
                }"&sortBy=submittedDate&sortOrder=descending&max_results=5`
              )
              .then(data => {
                parseString(data.data, (err, result) => {
                  let authorsCopy = this.state.authors.concat();
                  authorsCopy.push({
                    results: result.feed.entry,
                    name: t.name
                  });
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
    let mappedAuthors = this.state.authors.map(author => (
      <div>
        <Link
          to={`/authorsName/${author.name}`}
          // onClick={() => this.searchAuthor(author.name)}
        >
          {author.name}
        </Link>
        {author.results !== undefined ? author.results.length : 0}
      </div>
    ));

    return (
      <div>
        <h1>Authors and # of Articles written over the last 30 days:</h1>
        {mappedAuthors}
      </div>
    );
  }
}
export default AuthorsList;
