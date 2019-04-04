import React, { Component } from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.scss";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        {routes}
      </div>
    );
  }
}

export default App;
