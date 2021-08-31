import React from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import "../css/Home.css";
import { TiShoppingCart } from "react-icons/ti";

const Home = () => {
  return (
    <div className="Home">
      <Link to="/collection">
        <TiShoppingCart />
      </Link>
      <Search />
    </div>
  );
};

export default Home;
