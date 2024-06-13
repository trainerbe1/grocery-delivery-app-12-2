import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import { API_URL } from '../../../utils';


const PlaceOrder = () => {

  const { cartItems, products, subtotal, total } = useContext(StoreContext);
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!userInfo.firstName) newErrors.firstName = "Nama Depan harus diisi";
    if (!userInfo.lastName) newErrors.lastName = "Nama Belakang harus diisi";
    if (!userInfo.email) newErrors.email = "Email harus diisi";
    if (!userInfo.phone) newErrors.phone = "Nomor HP harus diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateFields()) return;

    const orderItems = products
      .filter(item => cartItems[item.id] > 0)
      .map(item => ({
        id: item.id,
        name: item.name,
        quantity: cartItems[item.id],
        price: item.price
      }));

    const orderData = {
      user_id: localStorage.getItem("user_id"),
      order_id: `order-id-${Date.now()}`,
      items: orderItems,
      total_amount: total,
      first_name: userInfo.firstName,
      last_name: userInfo.lastName,
      email: userInfo.email,
      phone: userInfo.phone
    };

    try {
      const response = await fetch(`${API_URL}/transactions/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      if (data.transaction_details.redirect_url) {
        window.location.href = data.transaction_details.redirect_url;
      } else {
        console.error("Redirect URL not found in the response");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Informasi Pengiriman</p>
        <div className="multi-fields">
          <div className="form-group w-50">
            <input
              type="text"
              name="firstName"
              placeholder='Nama Depan'
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              onChange={handleInputChange}
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>
          <div className="form-group w-50">
            <input
              type="text"
              name="lastName"
              placeholder='Nama Belakang'
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              onChange={handleInputChange}
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>
        </div>
        <div className="form-group">
          <input
            type='text'
            name='email'
            placeholder='Email'
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            onChange={handleInputChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group">
          <input
            type='text'
            name='phone'
            placeholder='Nomor Hp'
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            onChange={handleInputChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
      </div>
      <div className="place-order-right">
        <div className="card-total">
          <h2>Total Keranjang</h2>
        </div>
          {products.map(item => (
            cartItems[item.id] > 0 && (
              <div key={item.id} className="cart-totals-details">
                <p>{item.name} (x{cartItems[item.id]})</p> 
                <p>Rp{(item.price * cartItems[item.id]).toLocaleString()}</p>
              </div>
            )
          ))}
        <div className="cart-totals-details">
          <p><strong>Subtotal</strong></p>
          <p><strong>Rp{subtotal.toLocaleString()}</strong></p>
        </div>
        <div className="cart-totals-details">
          <p><strong>Total</strong></p>
          <p><strong>Rp{total.toLocaleString()}</strong></p>
        </div>
        <button type="button" className="btn btn-primary btncheckout" onClick={handleCheckout}>Proses Pembayaran</button>
      </div>
    </form>
  );
}

export default PlaceOrder;
