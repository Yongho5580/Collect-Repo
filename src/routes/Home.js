import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import "../css/Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { TiShoppingCart } from "react-icons/ti";

const Home = () => {
  useEffect(() => {
    AOS.init();
  });

  return (
    <div className="Home">
      <div data-aos="fade-right" data-aos-duration={700} className="Home_Link">
        <Link to="/collection">
          <TiShoppingCart className="Home_Icon" />
        </Link>
      </div>
      <div className="Home_Introduce">
        <h2
          data-aos="fade-down"
          data-aos-duration={1000}
          className="Home_Hello"
        >
          Welcome to Pick! Repositories
        </h2>
      </div>
      <Search />
    </div>
  );
};

export default Home;
