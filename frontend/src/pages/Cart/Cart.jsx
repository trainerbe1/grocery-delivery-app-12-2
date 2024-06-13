import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../../utils";

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, products, subtotal, total } = useContext(StoreContext);
  const navigate = useNavigate();

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Pesanan</p>
          <p>Nama Pesanan</p>
          <p>Harga</p>
          <p>Jumlah</p>
          <p>Total</p>
          <p>Hapus</p>
          <p>Tambah</p>
        </div>
        <br />
        <hr />
        {products.map((item) => {
          if (cartItems[item.id] > 0) {
            const imageUrl = `${IMAGE_URL}/${item.image}`;
            return (
              <div key={item.id} className="cart-items-item">
                <img src={imageUrl} alt={item.name} />
                <p>{item.name}</p>
                <p>Rp{formatNumberWithCommas(item.price)}</p>
                <p>{cartItems[item.id]}</p>
                <p>Rp{formatNumberWithCommas(item.price * cartItems[item.id])}</p>
                <button onClick={() => removeFromCart(item.id)}>x</button>
                <button className="btnplus" onClick={() => addToCart(item.id)}>+</button>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-promocode">
        <div>
          <p>Jika Anda memiliki kode promo, masukkan di sini</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="kode promo" />
            <button>Pakai</button>
          </div>
        </div>
      </div>
      <div className="cart-bottom">
        <div className="card-total">
          <h2>Total Keranjang</h2>
        </div>
        <div className="cart-totals-details">
          <p>Subtotal</p>
          <p>Rp{formatNumberWithCommas(subtotal)}</p>
        </div>
        <div className="cart-totals-details">
          <p>Total</p>
          <p>Rp{formatNumberWithCommas(total)}</p>
        </div>
        <button onClick={() => navigate('/order')} className="btncheckout">Lanjut Pembayaran</button>
      </div>
    </div>
  );
};

export default Cart;
