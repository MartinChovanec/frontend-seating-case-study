import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "@/context/CartContext.tsx";
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
