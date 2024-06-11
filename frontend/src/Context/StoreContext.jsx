import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0
        }));
    };

    const getSubtotal = () => {
        return food_list.reduce((acc, item) => {
            if (cartItems[item._id]) {
                return acc + item.price * cartItems[item._id];
            }
            return acc;
        }, 0);
    };

    const subtotal = getSubtotal();
    const deliveryFee = subtotal > 0 ? 10 : 0; // Contoh biaya pengiriman tetap
    const total = subtotal + deliveryFee;

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        subtotal,
        deliveryFee,
        total
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
