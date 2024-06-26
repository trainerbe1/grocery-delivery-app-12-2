import React, { useContext, useEffect, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import { IMAGE_URL } from '../../../utils';
import loading from '../../assets/gif/loading.gif';

const FoodItem = ({ id, name, description, price, image, setShowLogin }) => {
    const { cartItems, addToCart, removeFromCart, loadingProducts, setProductLoaded, token } = useContext(StoreContext);
    const [imageLoaded, setImageLoaded] = useState(false);

    const imageUrl = `${IMAGE_URL}/${image}`;
    const formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            setImageLoaded(true);
            setProductLoaded(id);
        };
    }, [imageUrl, id, setProductLoaded]);

    if (loadingProducts[id]) {
        return <div><img src={loading} alt="Loading..." /></div>;
    }

    const handleAddToCart = () => {
        if (token) {
            addToCart(id);
        } else {
            setShowLogin(true)
        }
    };

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className="food-item-image" src={imageUrl} alt='' />
                {(!cartItems || !cartItems[id]) ? (
                    <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="Add" />
                ) : (
                    <div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='Remove' />
                        <p>{cartItems[id]}</p>
                        <img onClick={handleAddToCart} src={assets.add_icon_green} alt='Add' />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    {/* Assuming `assets.rating_starts` is your rating icon */}
                    {/* <img src={assets.rating_starts} alt='' /> */}
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">Rp{formatNumberWithCommas(price)}</p>
            </div>
        </div>
    );
};

export default FoodItem;
