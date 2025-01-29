import React, { createContext, useContext, useState } from "react";

interface CartItem {
    seatId: string;
    row: number;
    place: number;
    ticketType?: string;
    price?: number;
}

interface CartContextProps {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (seatId: string) => void;
    isInCart: (seatId: string) => boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
