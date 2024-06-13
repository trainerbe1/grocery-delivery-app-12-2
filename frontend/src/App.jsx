import React, { useState, useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { StoreContext } from "./Context/StoreContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { token } = useContext(StoreContext);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin}/>} {/* Conditionally render LoginPopup */}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/order" element={<ProtectedRoute element={<PlaceOrder />} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
