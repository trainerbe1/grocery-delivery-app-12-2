import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Dapatkan Makanan Favoritmu Disini</h2>
        <p>Nikmati berbagai hidangan lezat yang kami tawarkan, mulai dari salad segar hingga pasta yang menggugah selera. Setiap menu disiapkan dengan bahan-bahan berkualitas tinggi dan cinta, menjamin pengalaman makan yang tak terlupakan. Cek menu terbaru kami dan rasakan kelezatannya sendiri!</p>
        <button><a href="#explore-menu">Lihat Menu</a></button>
      </div>
    </div>
  );
};

export default Header;
