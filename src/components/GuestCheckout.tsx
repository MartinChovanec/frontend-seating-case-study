import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GuestCheckout = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white shadow-md rounded-md p-6 max-w-lg w-full">
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">
                    Guest Checkout
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Vyplňte své údaje pro dokončení nákupu.
                </p>

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
