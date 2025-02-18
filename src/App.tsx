import { useEffect, useState } from "react";
import "./App.css";
import { getEvent } from "@/services/getEvent";
import { getSeats } from "@/services/getSeats";
import { useCart } from "@/context/CartContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import Checkout from "@/components/Checkout";
import LoginModal from "@/components/LoginModal";
import OrderConfirmation from "@/components/OrderConfirmation";
import { SeatingMap } from "@/components/SeatingMap";
import { EventInfoPanel } from "@/components/EventInfoPanel";
import { Header } from "./components/Header";
import { UserData } from "./types/types";
import { Footer } from "./components/Footer";
import { CheckoutDialog } from "./components/CheckoutDialog";
import "./il8n.ts";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [user, setUser] = useState<UserData | null>(null);

    const { event, loading, error } = getEvent();

    const { seats, loading: seatsLoading, error: seatsError } = getSeats(event?.eventId || "");

    const { cart } = useCart();

    const navigate = useNavigate();

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);

    const openLoginModal = () => {
        setIsLoginOpen(true);
        setIsCheckoutClicked(false);
    };

    // checke if user is already log in and wants to checkout
    useEffect(() => {
        if (isCheckoutOpen && isLoggedIn) {
            setIsCheckoutOpen(false);
            navigate("/checkout");
        }
    }, [isCheckoutOpen, isLoggedIn, navigate]);


    return (
        <Routes>
            {/* Main Page */}
            <Route
                path="/"
                element={
                    <div className="flex flex-col grow bg-zinc-100">
                        {/* header (wrapper) */}
                        <Header
                            user={user}
                            setIsLoginOpen={setIsLoginOpen}
                            setIsLoggedIn={setIsLoggedIn}
                            isLoggedIn={isLoggedIn}
                            event={event}
                            setUser={setUser}
                            openLogin={openLoginModal}
                        />
                        {/* main body (wrapper) */}
                        <main className="grow flex flex-col justify-center">
                            {/* inner content */}
                            <div className="max-w-screen-lg m-auto p-4 flex flex-col-reverse xl:flex-row items-start gap-3 w-full">
                                <SeatingMap seatsLoading={seatsLoading} seatsError={seatsError} seats={seats} />
                                <EventInfoPanel event={event} loading={loading} error={error} />
                            </div>
                        </main>

                        <Footer
                            cart={cart}
                            onCheckout={() => {
                                setIsCheckoutOpen(true);
                                setIsCheckoutClicked(true);
                            }}
                        />

                        {/* Checkout Modal */}
                        <CheckoutDialog
                            open={isCheckoutOpen}
                            setIsCheckoutOpen={setIsCheckoutOpen}
                            isLoggedIn={isLoggedIn}
                            setIsLoginOpen={setIsLoginOpen}
                            navigate={navigate}
                            setIsCheckoutClicked={setIsCheckoutClicked}
                        />

                        {/* Login Modal */}
                        <LoginModal
                            isOpen={isLoginOpen}
                            onClose={() => setIsLoginOpen(false)}
                            onSuccess={(userData) => {
                                setIsLoggedIn(true);
                                setUser(userData);
                                if (isCheckoutClicked) {
                                    navigate("/checkout");
                                    setIsCheckoutClicked(false); 
                                }
                            }}
                            isCheckoutClicked={isCheckoutClicked}
                        />
                    </div>
                }
            ></Route>
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    );
}

export default App;
