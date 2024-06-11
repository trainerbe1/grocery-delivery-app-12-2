import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { cartItems } = useContext(StoreContext);

  const hasItemsInCart = Object.values(cartItems).some((quantity) => quantity > 0);

  return (
    <div className="navbar">
      <Link to="/" onClick={() => setMenu("Home")}>
        <h2>
          <span className="tomato">HOME</span>
          <span className="green">DOKAN</span>
        </h2>
      </Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>
          Beranda
        </Link>
        <a href="#explore-menu" onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>
          Menu
        </a>
        <a href="#footer" onClick={() => setMenu("Contact Us")} className={menu === "Contact Us" ? "active" : ""}>
          Kontak Kami
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
            {hasItemsInCart && <div className="dot"></div>}
          </Link>
        </div>
        <button onClick={() => setShowLogin(true)}>Daftar</button>
      </div>
    </div>
  );
};

export default Navbar;
