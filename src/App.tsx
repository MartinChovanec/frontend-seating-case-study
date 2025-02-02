import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
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

function App() {
    const isLoggedIn = false;

    const { event, loading, error } = getEvent();

    // Fetch seat data
    const { seats, loading: seatsLoading, error: seatsError } = getSeats(event?.eventId || "");

    const { cart } = useCart();

    const navigate = useNavigate(); // React Router navigace

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <Routes>
            {/* Hlavní stránka aplikace */}
            <Route
                path="/"
                element={
                    <div className="flex flex-col grow">
                        {/* header (wrapper) */}
                        <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
                            {/* inner content */}
                            <div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
                                {/* application/author image/logo placeholder */}
                                <div className="max-w-[250px] w-full flex">
                                    <div className="bg-zinc-100 rounded-md size-12" />
                                </div>
                                {/* app/author title/name placeholder */}
                                <div className="bg-zinc-100 rounded-md h-8 w-[200px]" />
                                {/* user menu */}
                                <div className="max-w-[250px] w-full flex justify-end">
                                    {isLoggedIn ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={`https://source.boringavatars.com/marble/120/<user-email>?colors=25106C,7F46DB`}
                                                            />
                                                            <AvatarFallback>CN</AvatarFallback>
                                                        </Avatar>

                                                        <div className="flex flex-col text-left">
                                                            <span className="text-sm font-medium">John Doe</span>
                                                            <span className="text-xs text-zinc-500">
                                                                john.doe@nfctron.com
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-[250px]">
                                                <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem disabled>Logout</DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <Button disabled variant="secondary">
                                            Login or register
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </nav>

                        {/* main body (wrapper) */}
                        <main className="grow flex flex-col justify-center">
                            {/* inner content */}
                            <div className="max-w-screen-lg m-auto p-4 flex flex-col-reverse xl:flex-row items-start gap-3 w-full">
                                <SeatingMap seatsLoading={seatsLoading} seatsError={seatsError} seats={seats} />
                                <EventInfoPanel event={event} loading={loading} error={error} />
                            </div>
                        </main>

                        {/* bottom cart affix (wrapper) */}
                        <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
                            {/* inner content */}
                            <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
                                {/* total in cart state */}
                                <div className="flex flex-col text-zinc-400">
                                    <span>Total for {cart.length} tickets</span>
                                    <span className="text-2xl font-semibold">
                                        {cart.reduce((total, item) => total + (item.price || 0), 0)} CZK
                                    </span>
                                </div>

                                {/* checkout button */}
                                <Button
                                    disabled={cart.length === 0}
                                    variant="default"
                                    onClick={() => setIsCheckoutOpen(true)} // Otevře modal
                                >
                                    Checkout now
                                </Button>
                            </div>
                        </nav>

                        {/* Checkout Modal */}
                        <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-gray-600">Máte u nás účet?</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-4">
                                    {!isLoggedIn ? (
                                        <>
                                            <p className="text-sm text-gray-900">
                                                Přihlašte se do svého účtu, nebo pokračujte jako host.
                                            </p>
                                            <Button
                                                variant="default"
                                                onClick={() => {
                                                    setIsCheckoutOpen(false); // Zavřít checkout modal
                                                    setIsLoginOpen(true); // Otevřít login modal
                                                }}
                                            >
                                                Přihlásit se
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    setIsCheckoutOpen(false); // Zavři modal
                                                    navigate("/checkout"); // Přesměruj na checkout stránku
                                                }}
                                            >
                                                Pokračovat jako host
                                            </Button>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-600">You're logged in. Proceed to payment.</p>
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>
                        {/* Login Modal */}
                        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
                    </div>
                }
            ></Route>
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    );
}

export default App;
