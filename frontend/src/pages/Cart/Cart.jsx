import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart } = useContext(StoreContext);

  const navigate = useNavigate();

  const getSubtotal = () => {
    return food_list.reduce((acc, item) => {
      if (cartItems[item._id] > 0) {
        return acc + item.price * cartItems[item._id];
      }
      return acc;
    }, 0);
  };

  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 0 ? 10 : 0; // Contoh biaya pengiriman tetap
  const total = subtotal + deliveryFee;

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
          <p>Tambah</p> {/* Tambah kolom tambah */}
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className="cart-items-item">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>Rp{item.price.toFixed(3)}</p>
                <p>{cartItems[item._id]}</p>
                <p>Rp{(item.price * cartItems[item._id]).toFixed(3)}</p>
                <button onClick={() => removeFromCart(item._id)}>x</button>
                <button className="btnplus" onClick={() => addToCart(item._id)}>+</button> {/* Tambah kelas btnplus */}
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
          <p>Rp{subtotal.toFixed(3)}</p>
        </div>
        <div className="cart-totals-details">
          <p>Biaya Pengiriman</p>
          <p>Rp{deliveryFee.toFixed(3)}</p>
        </div>
        <div className="cart-totals-details">
          <p>Total</p>
          <p>Rp{total.toFixed(3)}</p>
        </div>
        <button onClick={()=>navigate('/order')} className="btncheckout">Lanjut Pembayaran</button>
      </div>
    </div>
  );
};

export default Cart;
