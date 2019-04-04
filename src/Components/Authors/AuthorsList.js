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
        "http://export.arxiv.org/api/query?search_query=all:psychiatry+OR+all:therapy+OR+all:data+science+OR+all:machine+learning&sortBy=lastUpdatedDate&sortOrder=descending&max_results=5"
      )
      .then(data => {
        parseString(data.data, function(err, result) {
          auth.push(result.feed.entry);
          // console.log(result);
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

  // searchAuthor = authorName => {
  //   let searched = [];
  //   console.log(authorName, "namehhh");
  //   axios
  //     .get(
  //       `http://export.arxiv.org/api/query?search_query=au:"${authorName}"&sortBy=submittedDate&sortOrder=descending&max_results=5`
  //     )
  //     .then(data => {
  //       parseString(data.data, function(err, result) {
  //         searched.push(result.feed.entry);
  //       });
  //       // console.log(searched, "searched");
  //       // let newVar = searched[0].map(r => r.title);
  //       // this.setState({
  //       //   clickedAuthor: searched
  //       // });
  //     })
  //     .catch(err => console.log("search get", err));
  //   console.log(searched, "searched");
  //   this.setState({
  //     clickedAuthor: searched
  //   });
  // };

  render() {
    let mappedAuthors = this.state.authors.map(author => (
      <div>
        <Link
          to={`/authorsName/${author.name}`}
          // onClick={() => this.searchAuthor(author.name)}
        >
          {author.name}
          {author.results !== undefined ? author.results.length : 0}
        </Link>
      </div>
    ));

    return <div>{mappedAuthors}</div>;
  }
}
export default AuthorsList;
