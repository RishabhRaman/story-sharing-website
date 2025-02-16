import React from "react";
import { Link } from "react-router-dom";
import "./home.css";


const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="navbar-title">HOME TO INTROVERTS</span>
        </div>
        <div className="navbar-links">
          <Link to="/stories" className="stories-btn">Stories</Link>
          <Link to="/login" className="login-btn">Login/Signup</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Feel Free to Share Yourself Here!</h1>
        <p>Let your thoughts flow and be heard. A space for introverts to connect and inspire!</p>
        <Link to="/submitstory" className="submit-story">Submit Story</Link>
      </section>
    </div>
  );
};

export default Home;

 