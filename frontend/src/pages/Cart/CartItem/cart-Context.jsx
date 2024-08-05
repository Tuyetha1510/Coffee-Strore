import React, {createContext, useContext, useReducer} from "react";
import cartReducer from "./cart-Reducer";


export const CartContext = createContext();

const initialState = { cartItems: [], itemCount: 0, total: 0};

const CartContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const addProduct = (products) => dispatch({type: 'ADD_ITEM', payload: products});
    const increase= (products)=> dispatch({type:'INCREASE',payload:products})
    
    const contextValue = {
        ...state,
        addProduct,
        increase,
    }


    

    return(
        <CartContext.Provider value={contextValue}>
            {
                children
            }
        </CartContext.Provider>
    )

}

// export const useCart = () => useContext(CartContext)

export default CartContextProvider;