import React from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="Home">
      <Link to="/collection">Collection</Link>
      <Search />
    </div>
  );
};

export default Home;
