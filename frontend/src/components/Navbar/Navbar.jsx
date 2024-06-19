import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { cartItems, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    localStorage.removeItem("user_id");
    localStorage.removeItem("cartItems");
    navigate("/")
  }

  const handleAddToCart = () => {
    if (!token) {
      setShowLogin(true)
    } 
};

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
        {/* <img src={assets.search_icon} alt="Search" /> */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img onClick={handleAddToCart} src={assets.basket_icon} alt="Cart" />
            {hasItemsInCart && <div className="dot"></div>}
          </Link>
        </div>
        {!token?<button onClick={() => setShowLogin(true)}>Masuk</button>
        :<div className="navbar-profile">
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
