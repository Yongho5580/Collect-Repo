import React from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import "../css/Home.css";
import { TiShoppingCart } from "react-icons/ti";

const Home = () => {
  return (
    <div className="Home">
      <div className="Home_Link">
        <Link to="/collection">
          <TiShoppingCart className="Home_Icon" />
        </Link>
      </div>
      <div className="Home_Introduce">
        <h2 className="Home_Hello">Welcome to Pick! Repositories</h2>
      </div>
      <Search />
    </div>
  );
};

export default Home;
