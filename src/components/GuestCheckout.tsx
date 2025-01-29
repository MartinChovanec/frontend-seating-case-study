import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/components/context/CartContext";
import { getEvent } from "@/components/hooks/GetEvent";

const GuestCheckout = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const { event } = getEvent();
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Kontrola, jestli jsou vyplněná všechna pole
        if (!form.firstName || !form.lastName || !form.email) {
            setError("Vyplňte všechna povinná pole.");
            setLoading(false);
            return;
        }

        console.log("Cart obsah před odesláním:", cart);

        const orderData = {
            eventId: event?.eventId || "", // Event ID z API
            tickets: cart.map((ticket) => ({
                ticketTypeId: ticket.ticketTypeId,
                seatId: ticket.seatId,
            })),
            user: {
                email: form.email,
                firstName: form.firstName,
                lastName: form.lastName,
            },
        };
        console.log(orderData, "orderData to fetch");
        try {
            const response = await fetch("https://nfctron-frontend-seating-case-study-2024.vercel.app/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error("Chyba při odesílání objednávky.");
            }

            const responseData = await response.json();
            console.log("Objednávka úspěšně odeslána:", responseData);

            // Vymazat košík a přesměrovat na potvrzení objednávky
            clearCart();
            navigate("/order-confirmation");
        } catch (err: any) {
            setError(err.message || "Nepodařilo se dokončit nákup.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white shadow-md rounded-md p-6 max-w-lg w-full">
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">Guest Checkout</h1>
                <p className="text-sm text-gray-500 text-center mb-6">Vyplňte své údaje pro dokončení nákupu.</p>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Jméno</label>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Příjmení</label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-between mt-4">
                        <Button variant="secondary" onClick={() => navigate("/")}>
                            Zpět
                        </Button>
                        <Button type="submit" variant="default">
                            Dokončit nákup
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GuestCheckout;
