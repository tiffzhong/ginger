// import React, { Component } from "react";
// import axios from "axios";
// import ArticleTitle from "../Components/Articles/ArticleTitle";
// import ArticleSummary from "../Components/Articles/ArticleSummary";
// var parseString = require("xml2js").parseString;

// class Main extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//       filtered: [],
//       authors: [],
//       clickedAuthor: []
//     };
//   }
//   componentDidMount() {
//     this.getArticles();
//     this.getAuthors();
//   }

//   getArticles = () => {
//     let p = [];
//     axios
//       .get(
//         "http://export.arxiv.org/api/query?search_query=all:psychiatry+OR+all:therapy+OR+all:data+science+OR+all:machine+learning&sortBy=submittedDate&sortOrder=descending&max_results=10"
//       )
//       .then(data => {
//         parseString(data.data, function(err, result) {
//           p.push(result.feed.entry);
//         });
//         this.setState({
//           articles: p[0]
//         });
//       })
//       .catch(err => console.log("axios get", err));
//   };

//   getAuthors = () => {
//     let auth = [];
//     let another = [];
//     axios
//       .get(
//         "http://export.arxiv.org/api/query?search_query=all:psychiatry+OR+all:therapy+OR+all:data+science+OR+all:machine+learning&sortBy=lastUpdatedDate&sortOrder=descending&max_results=10"
//       )
//       .then(data => {
//         parseString(data.data, function(err, result) {
//           auth.push(result.feed.entry);
//           console.log(result);
//         });
//         let mapper = auth[0].map(g => g.author);
//         console.log(mapper, "mapper");
//         let names = mapper.map(v =>
//           v.map(t => {
//             // console.log(t, "tea");
//             axios
//               .get(
//                 `http://export.arxiv.org/api/query?search_query=au:"${
//                   t.name
//                 }"&sortBy=submittedDate&sortOrder=descending&max_results=30`
//               )
//               .then(data => {
//                 parseString(data.data, (err, result) => {
//                   let authorsCopy = this.state.authors.concat();
//                   authorsCopy.push({
//                     results: result.feed.entry,
//                     name: t.name
//                   });
//                   this.setState({
//                     authors: authorsCopy
//                   });
//                 });
//               });
//           })
//         );
//       })
//       .catch(err => console.log("author get", err));
//   };
//   searchAuthor = authorName => {
//     let searched = [];
//     console.log(authorName, "namehhh");
//     axios
//       .get(`http://export.arxiv.org/api/query?search_query=au:"${authorName}"`)
//       .then(data => {
//         parseString(data.data, function(err, result) {
//           searched.push(result.feed.entry);
//         });
//         console.log(searched);

//         this.setState(
//           {
//             clickedAuthor: searched
//           },
//           this.props.history.push(`/authorsName/${authorName}`)
//         );
//       })
//       .catch(err => console.log("search get", err));
//   };

//   render() {
//     const { articles, filtered, authors, clickedAuthor } = this.state;

//     let mappedAuthors = this.state.authors.map(author => (
//       <div>
//         <button onClick={() => this.searchAuthor(author.name)}>
//           {author.name}
//           {author.results !== undefined ? author.results.length : 0}
//         </button>
//       </div>
//     ));

//     let allArticles = articles.map(a => {
//       return (
//         <div className="article-container">
//           <ArticleTitle
//             id={a.id}
//             title={a.title}
//             summary={a.summary}
//             published={a.published}
//             author={a.author}
//             match={this.props.match}
//           />
//         </div>
//       );
//     });

//     return (
//       <div>
//         {this.props.match.path === "/summaries/:id" &&
//         this.state.filtered[0] ? (
//           <ArticleSummary
//             title={this.state.filtered[0].title}
//             summary={this.state.filtered[0].summary}
//             published={this.state.filtered[0].published}
//             author={this.state.filtered[0].author}
//           />
//         ) : (
//           allArticles
//         )}
//       </div>
//     );
//   }
// }

// export default Main;
