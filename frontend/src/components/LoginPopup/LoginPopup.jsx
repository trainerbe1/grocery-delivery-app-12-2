import React, { useContext, useEffect, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { API_URL } from '../../../utils';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';

const LoginPopup = ({ setShowLogin }) => { // Destructure setShowLogin from props

  const {token, setToken} = useContext(StoreContext);

  const [currState, setCurrState] = useState("Masuk");
  const [data, setData] = useState({
    username:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = API_URL;
    if(currState==="Masuk") {
      newUrl += "/users/login"
    } else {
      newUrl += "/users/register"
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false)
    } else {
      alert(resonse.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Masuk" ? <></> : <input name='username' onChange={onChangeHandler} value={data.username} type="text" placeholder='Nama Anda' required />}
          
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Anda' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Kata Sandi' required />
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
