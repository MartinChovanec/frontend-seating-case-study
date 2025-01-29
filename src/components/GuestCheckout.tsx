import { useCart } from "@/components/context/CartContext";
import { Button } from "@/components/ui/button";

function GuestCheckout() {
    const { cart } = useCart();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        alert("Order submitted!");
    };

    return (
        <div className="max-w-screen-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Order Summary</h1>

            {/* Shrnutí objednávky */}
            <div className="bg-gray-100 p-4 rounded-md mb-6">
                <h2 className="text-lg font-semibold">Your Order</h2>
                <ul className="mt-2 space-y-2">
                    {cart.map((item, index) => (
                        <li key={index} className="flex justify-between">
                            <span>
                                Row {item.row}, Seat {item.place} - {item.ticketType}
                            </span>
                            <span>{item.price} CZK</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 flex justify-between font-bold">
                    <span>Total:</span>
                    <span>
                        {cart.reduce((total, item) => total + (item.price || 0), 0)} CZK
                    </span>
                </div>
            </div>

            {/* Formulář pro hosta */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <Button type="submit" variant="default" className="w-full">
                    Complete Purchase
                </Button>
            </form>
        </div>
    );
}

export default GuestCheckout;
