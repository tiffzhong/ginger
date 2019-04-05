import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav>
      <Link to="/articles">Articles</Link>
      <Link to="/authors">Authors</Link>
    </nav>
  );
};
export default NavBar;
