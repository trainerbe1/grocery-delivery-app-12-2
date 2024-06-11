import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => { // Destructure setShowLogin from props

  const [currState, setCurrState] = useState("Masuk");

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Masuk" ? <></> : <input type="text" placeholder='Nama Anda' required />}
          
          <input type="email" placeholder='Email Anda' required />
          <input type="password" placeholder='Kata Sandi' required />
        </div>
        <button type="submit">
          {currState === "Daftar" ? "Buat Akun" : "Masuk"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>Dengan melanjutkan, saya setuju dengan syarat penggunaan & kebijakan privasi.</p>
        </div>
        {currState === "Masuk" ? 
          <p>Buat akun baru? <span onClick={() => setCurrState("Daftar")}>Klik disini</span></p> :
          <p>Sudah punya akun? <span onClick={() => setCurrState("Masuk")}>Masuk disini</span></p>}
      </form>
    </div>
  );
}

export default LoginPopup;
