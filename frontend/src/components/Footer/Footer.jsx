import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
        <h1><span className="home">HOME</span><span className="dokan">DOKAN</span></h1>
          <p>Kunjungi dan ikuti media sosial kami untuk selalu mendapatkan update terbaru tentang menu, promo spesial, dan hidangan baru yang kami tawarkan. Jangan lewatkan informasi menarik mengenai makanan favorit Anda!</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>PERUSAHAAN</h2>
          <ul>
            <li>Beranda</li>
            <li>Tentang Kami</li>
            <li>Pengiriman</li>
            <li>Kebijakan Privasi</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>HUBUNGI KAMI</h2>
          <ul>
            <li>+62-823-8770-8326</li>
            <li>HomeDokan@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © HomeDokan.com - All Right Reserved.</p>
    </div>
  );
};

export default Footer;
