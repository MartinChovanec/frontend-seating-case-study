import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { getEvent } from "@/services/getEvent";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

/**
 * Checkout Component
 *
 * Handles the order process, including:
 * - Fetching event details
 * - Retrieving cart items
 * - Managing form inputs for user details
 * - Sending an order to the API
 * - Handling errors and loading states
 *
 * API Used:
 * - `POST https://nfctron-frontend-seating-case-study-2024.vercel.app/order` (Sends order)
 *
 */

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const { event } = getEvent();

    const [user, setUser] = useState<{ email: string; firstName: string; lastName: string } | null>(null);
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    /**
     * Loads user data from localStorage (if available).
     * Pre-fills the form with stored user details.
     */
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

    /**
     * Scrolls the page to the "checkout-title" element when the component mounts.
     * Necessary for mobile devices.
     * This ensures that the user always sees the title at the top of the screen,
     * even if the page loads with a different scroll position.
     */
    useEffect(() => {
        const titleElement = document.getElementById("checkout-title");
        if (titleElement) {
            titleElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    // Handles form field changes.

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handles form submission, sends order to API.

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!form.firstName || !form.lastName || !form.email) {
            setError(t("Fill in all required fields."));
            setLoading(false);
            return;
        }

        const orderData = {
            eventId: event?.eventId || "",
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

        try {
            const response = await fetch("https://nfctron-frontend-seating-case-study-2024.vercel.app/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error(t("Error when submitting your order"));
            }

            const responseData = await response.json();

            clearCart();

            localStorage.setItem("order", JSON.stringify(responseData));

            navigate("/order-confirmation");
        } catch (err: any) {
            setError(err.message || t("Failed to complete the purchase. Please try again"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white shadow-md rounded-md p-6 max-w-lg w-full">
                <h1 id="checkout-title" className="text-2xl font-semibold text-center text-gray-900 mb-4">
                    {t("Summary")}
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    {user
                        ? t("Check your details and complete the purchase")
                        : t("Fill in your details to complete your purchase")}
                </p>

                {error && (
                    <p className="text-red-500 text-sm text-center">
                        {t("Failed to complete the purchase. Please try again")}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mt-4">{t("List of tickets")}</h3>
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center">{t("There are no tickets in the cart")}</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="border-b py-2 text-zinc-500">
                                <p>
                                    <strong>{t("Row")}:</strong> {item.row}, <strong>{t("Seat")}:</strong> {item.place}
                                </p>
                                <p>
                                    <strong>{t("Price")}:</strong> {item.price} {t("CZK")}
                                </p>
                            </div>
                        ))
                    )}
                    {/* Formulář pro hosta nebo možnost upravit informace pro přihlášeného uživatele */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">{t("Name")}</label>
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
                        <label className="text-sm font-medium text-gray-700">{t("Surname")}</label>
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
                        <label className="text-sm font-medium text-gray-700">{t("E-mail")}</label>
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
                            {t("Go back")}
                        </Button>
                        <Button type="submit" variant="default" disabled={loading}>
                            {loading ? t("Sending...") : t("Complete order")}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
