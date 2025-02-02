import { useEffect, useState } from "react";
import { useCart } from "@/components/context/CartContext";
import { getEvent } from "@/components/hooks/GetEvent";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const { event } = getEvent();

    const [user, setUser] = useState<{ email: string; firstName: string; lastName: string } | null>(null);
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Zjistit, zda je uživatel přihlášen
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            setForm({
                firstName: parsedUser.firstName || "",
                lastName: parsedUser.lastName || "",
                email: parsedUser.email || "",
            });
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

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
            // Uložení objednávky do localStorage
            localStorage.setItem("order", JSON.stringify(responseData));

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
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">Summary</h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    {user ? "Zkontrolujte své údaje a dokončete nákup." : "Vyplňte své údaje pro dokončení nákupu."}
                </p>

                {error && (
                    <p className="text-red-500 text-sm text-center">
                        Failed to complete the purchase. Please try again
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mt-4">List of tickets</h3>
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center">There are no tickets in the cart.</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="border-b py-2 text-zinc-500">
                                <p>
                                    <strong>Row:</strong> {item.row}, <strong>Sedadlo:</strong> {item.place}
                                </p>
                                <p>
                                    <strong>Price:</strong> {item.price} CZK
                                </p>
                            </div>
                        ))
                    )}
                    {/* Formulář pro hosta nebo možnost upravit informace pro přihlášeného uživatele */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Name</label>
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
                        <label className="text-sm font-medium text-gray-700">Surname</label>
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
                        <Button type="button" variant="secondary" onClick={() => navigate("/")}>
                            Go back
                        </Button>
                        <Button type="submit" variant="default" disabled={loading}>
                            {loading ? "Sending..." : "Complete order"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
