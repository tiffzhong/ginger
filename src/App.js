import React, { Component } from "react";
import Articles from "./Components/Articles/Articles";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Articles />
      </div>
    );
  }
}

export default App;
