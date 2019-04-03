import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Articles</Link>
      <Link to="/authors">Authors</Link>
      {/* <Link to="summaries">Sum</Link> */}
    </nav>
  );
};
export default NavBar;
