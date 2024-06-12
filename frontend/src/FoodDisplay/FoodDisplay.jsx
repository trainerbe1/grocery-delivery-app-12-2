import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../Context/StoreContext'
import FoodItem from '../components/FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
    const { products } = useContext(StoreContext)

    return (
        <div className='food-display' id='food-display'>
            <h2>Hidangan Terbaik</h2>
            <div className="food-display-list">
                {products.map((product) => {
                    if (category === "All" || category === product.category) {
                        return (
                            <FoodItem
                                key={product.id}  // Gunakan `product.id` sebagai `key`
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                image={product.image}
                            />
                        );
                    } else {
                        return null;  // Return null for items that do not match the category
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay
