import React, { useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';

const PlaceOrder = () => {
  const { subtotal, deliveryFee, total } = useContext(StoreContext);

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Informasi Pengiriman</p>
        <div className="multi-fields">
          <input type="text" placeholder='Nama Depan' />
          <input type="text" placeholder='Nama Belakang' />
        </div>
        <input type="email" placeholder='Alamat Email' />
        <input type="text" placeholder='Jalan' />
        <div className="multi-fields">
          <input type="text" placeholder='Kota' />
          <input type="text" placeholder='Wilayah' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Kode Pos' />
          <input type="text" placeholder='Negara' />
        </div>
        <input type='text' placeholder='Nomor Hp' />
      </div>
      <div className="place-order-right">
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
        <button  className="btncheckout">Proses Pembayaran</button>
      </div>
    </form>
  );
}

export default PlaceOrder;
