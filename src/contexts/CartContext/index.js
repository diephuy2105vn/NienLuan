import { createContext, useReducer } from "react";
import CartReducer, { initialCart } from "../../reducer/CartReducer";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, dispatchCart] = useReducer(CartReducer, initialCart);

    return (
        <CartContext.Provider
            value={{ cart: cart, dispatchCart: dispatchCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
