import React from 'react';
import './ExploreMenu.css';  // Pastikan path sudah benar
import { menu_list } from '../../assets/assets';  // Pastikan path sudah benar

const ExploreMenu = ({ category, setCategory }) => {  // Destructuring props

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Jelajahi Menu Kesukaan</h1>
      <p className='explore-menu-text'>
       Pesan dan Dapatkan Makananmu Disini. 
      </p>
      <div className='explore-menu-list'>
        {menu_list.map((item, index) => (
          <div 
            key={index} 
            className='explore-menu-list-item'
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
          >
            <img 
              className={category === item.menu_name ? "active" : ""} 
              src={item.menu_image} 
              alt={item.menu_name} 
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
