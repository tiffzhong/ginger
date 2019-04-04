import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorNames from "./AuthorNames";
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

  getAuthors = () => {
    let auth = [];
    let another = [];
    axios
      .get(
        "http://export.arxiv.org/api/query?search_query=all:psychiatry+OR+all:therapy+OR+all:data+science+OR+all:machine+learning&sortBy=lastUpdatedDate&sortOrder=descending&max_results=40"
      )
      .then(data => {
        parseString(data.data, function(err, result) {
          auth.push(result.feed.entry);
          console.log(result);
        });
        let mapper = auth[0].map(g => g.author);
        console.log(mapper, "mapper");
        let names = mapper.map(v =>
          v.map(t => {
            // console.log(t, "tea");
            axios
              .get(
                `http://export.arxiv.org/api/query?search_query=au:"${
                  t.name
                }"&sortBy=lastUpdatedDate&sortOrder=descending&max_results=40`
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
        // return;
        // setTimeout(function() {
        // console.log(another, "1");
        // }, 5000);

        // let mappedAnother = another.map(o => {
        //   console.log(o, "oh");
        //   return { results: o.results.length, name: o.name };
        // });
        // return mappedAnother;

        // console.log(names, "woieur");
        // this.setState({
        //   authors: names
        // });
      })
      .catch(err => console.log("author get", err));
  };

  searchAuthor = authorName => {
    let searched = [];
    console.log(authorName, "namehhh");
    axios
      .get(`http://export.arxiv.org/api/query?search_query=au:"${authorName}"`)
      .then(data => {
        parseString(data.data, function(err, result) {
          searched.push(result.feed.entry);
        });
        console.log(searched);

        this.setState(
          {
            clickedAuthor: searched
          },
          this.props.history.push(`/authorsName/${authorName}`)
        );
      })
      .catch(err => console.log("search get", err));
  };

  render() {
    // <AuthorNames searchedData={this.state.clickedAuthor} />;
    // let clickedAuthorLink = this.state.clickedAuthor.map(
    //   info => console.log(info, "info")
    // <div>
    //   <AuthorNames title={info[0].title} />
    // </div>

    let mappedAuthors = this.state.authors.map(author => (
      <button onClick={() => this.searchAuthor(author.name)}>
        {author.name} {author.results !== undefined ? author.results.length : 0}
      </button>
    ));

    return <div>{mappedAuthors}</div>;
  }
}
export default AuthorsList;
