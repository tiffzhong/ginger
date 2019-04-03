import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
var parseString = require("xml2js").parseString;

class Authors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: []
    };
  }
  render() {
    return <div>Authors</div>;
  }
}
export default Authors;
