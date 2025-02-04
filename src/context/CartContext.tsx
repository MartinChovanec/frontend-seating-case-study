import React, { createContext, useContext, useState } from "react";
import { CartItem } from "@/types/types";

interface CartContextProps {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (seatId: string) => void;
    isInCart: (seatId: string) => boolean;
    clearCart: () => void;
}

// CartContext provides cart state and functions globally.

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const removeFromCart = (seatId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.seatId !== seatId));
    };

    const isInCart = (seatId: string) => {
        return cart.some((item) => item.seatId === seatId);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

//Custom hook to access the cart context.Ensures the hook is only used within `CartProvider`.

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
