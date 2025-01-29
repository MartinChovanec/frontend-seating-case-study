import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "@/components/context/CartContext";
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
    <CartProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
        ,
    </CartProvider>
    </BrowserRouter>
);
