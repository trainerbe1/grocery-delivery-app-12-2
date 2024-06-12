import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";
import { API_URL } from "../../utils";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [loadingProducts, setLoadingProducts] = useState({});
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/products`);
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const responseData = await response.json();
                if (responseData.success === "true") {
                    setProducts(responseData.data);
                } else {
                    throw new Error("Failed to fetch products");
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const loadingStatus = products.reduce((acc, product) => {
            acc[product.id] = true;
            return acc;
        }, {});
        setLoadingProducts(loadingStatus);
    }, [products]);

    const setProductLoaded = (productId) => {
        setLoadingProducts((prev) => ({
            ...prev,
            [productId]: false,
        }));
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });
    };

    const getSubtotal = () => {
        return products.reduce((acc, item) => {
          if (cartItems[item.id] > 0) {
            return acc + item.price * cartItems[item.id];
          }
          return acc;
        }, 0);
      };
    
    const subtotal = getSubtotal();
    // const deliveryFee = subtotal > 0 ? 10 : 0; // Contoh biaya pengiriman tetap
    const total = subtotal;

    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems]);

    useEffect(() => {
        if(localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
        }
    }, [])

    const contextValue = {
        food_list,
        products,
        cartItems,
        addToCart,
        removeFromCart,
        subtotal,
        // deliveryFee,
        total,
        loadingProducts,
        setProductLoaded,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
