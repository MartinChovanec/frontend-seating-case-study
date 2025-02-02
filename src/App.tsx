import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import "./App.css";
import { getEvent } from "@/components/hooks/GetEvent";
import { getSeats } from "@/components/hooks/GetSeats";
import { useCart } from "@/components/context/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Routes, Route, useNavigate } from "react-router-dom";
import Checkout from "@/components/Checkout";
import LoginModal from "@/components/LoginModal";
import OrderConfirmation from "@/components/OrderConfirmation";
import { SeatingMap } from "@/components/SeatingMap";
import { EventInfoPanel } from "@/components/EventInfoPanel";
import { Header } from "./components/Header";
import { UserData } from "./types/types";
import { Footer } from "./components/Footer";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [user, setUser] = useState<UserData | null>(null);

    const { event, loading, error } = getEvent();

    const { seats, loading: seatsLoading, error: seatsError } = getSeats(event?.eventId || "");

    const { cart } = useCart();

    const navigate = useNavigate(); // React Router navigace

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const [isLoginOpen, setIsLoginOpen] = useState(false);


    // checket if user is already log in a wants to checkout
    useEffect(() => {
        if (isCheckoutOpen && isLoggedIn) {
          setIsCheckoutOpen(false);
          navigate("/checkout");
        }
      }, [isCheckoutOpen, isLoggedIn, navigate]);

    return (
        <Routes>
            {/* Hlavní stránka aplikace */}
            <Route
                path="/"
                element={
                    <div className="flex flex-col grow">
                        {/* header (wrapper) */}

                        <Header user={user} isLoggedIn={isLoggedIn} />
                        {/* main body (wrapper) */}
                        <main className="grow flex flex-col justify-center">
                            {/* inner content */}
                            <div className="max-w-screen-lg m-auto p-4 flex flex-col-reverse xl:flex-row items-start gap-3 w-full">
                                <SeatingMap seatsLoading={seatsLoading} seatsError={seatsError} seats={seats} />
                                <EventInfoPanel event={event} loading={loading} error={error} />
                            </div>
                        </main>

                        <Footer cart={cart} onCheckout={() => setIsCheckoutOpen(true)} 
                        />

                        {/* Checkout Modal */}
                        <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-gray-600">Are you registered?</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-4">
                                    {!isLoggedIn ? (
                                        <>
                                            <p className="text-sm text-gray-900">
                                                Sign in to your account or continue as a guest.
                                            </p>
                                            <Button
                                                variant="default"
                                                onClick={() => {
                                                    setIsCheckoutOpen(false); // Zavřít checkout modal
                                                    setIsLoginOpen(true); // Otevřít login modal
                                                }}
                                            >
                                                Sign in
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    setIsCheckoutOpen(false); // Zavři modal
                                                    navigate("/checkout"); // Přesměruj na checkout stránku
                                                }}
                                            >
                                                Continue as a guest
                                            </Button>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-600">You're logged in. Proceed to payment.</p>
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>
                        {/* Login Modal */}
                        <LoginModal
                            isOpen={isLoginOpen}
                            onClose={() => setIsLoginOpen(false)}
                            onSuccess={(userData) => {
                                setIsLoggedIn(true);
                                setUser(userData);
                            }}
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
