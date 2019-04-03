import React, { Component } from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.scss";
import axios from "axios";
import routes from "./routes";
import ArticleContainer from "./Components/Articles/ArticlesContainer";
import ArticleSummary from "./Components/Articles/ArticleSingle/ArticleSummary";
import ArticleTitle from "./Components/Articles/ArticleSingle/ArticleTitle";
var parseString = require("xml2js").parseString;

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     articles: []
  //   };
  // }
  // componentDidMount() {
  //   this.getArticles();
  // }

  // getArticles = () => {
  //   let p = [];
  //   axios
  //     .get(
  //       "http://export.arxiv.org/api/query?search_query=all:psychiatry+OR+all:therapy+OR+all:data+science+OR+all:machine+learning&sortBy=lastUpdatedDate&sortOrder=descending&max_results=30"
  //     )
  //     .then(data => {
  //       parseString(data.data, function(err, result) {
  //         p.push(result.feed.entry);
  //       });
  //       this.setState({
  //         articles: p[0]
  //       });
  //     })
  //     .catch(err => console.log("axios get", err));
  // };
  render() {
    // const { articles } = this.state;
    // let allArticles = articles.map(a => {
    //   let b = a.author.map(author => author.name);
    //   console.log(a, "a");
    //   return (
    //     <div className="article-container">
    //       <ArticleContainer {...a} authors={b} />
    //     </div>
    //   );
    // });

    return (
      <div className="App">
        <NavBar />
        {routes}
        {/* {allArticles} */}
      </div>
    );
  }
}

export default App;
